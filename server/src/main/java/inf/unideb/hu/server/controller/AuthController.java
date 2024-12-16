package inf.unideb.hu.server.controller;


import inf.unideb.hu.server.model.base.User;
import inf.unideb.hu.server.repository.UserRepository;
import inf.unideb.hu.server.service.impl.JwtService;
import inf.unideb.hu.server.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        try {
            UserDetails userDetails = userService.loadUserByUsername(username);
            User user = userRepository.findByEmail(username).orElseThrow(
                    () -> new UsernameNotFoundException("User not found")
            );

            if (!userService.authenticate(username, password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }

            Map<String, Object> extraClaims = Map.of(
                    "role", user.getRole(),
                    "id", user.getId()
            );

            return ResponseEntity.ok(Map.of(
                    "accessToken", jwtService.generateToken(extraClaims, userDetails),
                    "refreshToken", jwtService.generateRefreshToken(userDetails)
            ));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid request"));
        }

        try {
            userService.register(user);
            return ResponseEntity.ok(Map.of("success", "User registered successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        try {
            String username = jwtService.extractUsername(refreshToken);
            UserDetails userDetails = userService.loadUserByUsername(username);
            User user = userRepository.findByEmail(username).orElseThrow(
                    () -> new UsernameNotFoundException("User not found")
            );

            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                Map<String, Object> extraClaims = Map.of(
                        "role", user.getRole(),
                        "id", user.getId()
                );

                return ResponseEntity.ok(Map.of(
                        "accessToken", jwtService.generateToken(extraClaims, userDetails)
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Refresh token has expired"));
        } catch (io.jsonwebtoken.security.SignatureException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid refresh token"));
        } catch (Exception e) {
            System.out.println(e.getClass());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid request"));
        }

    }

}