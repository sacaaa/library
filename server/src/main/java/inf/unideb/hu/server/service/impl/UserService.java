package inf.unideb.hu.server.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import inf.unideb.hu.server.model.base.User;
import inf.unideb.hu.server.model.dto.*;
import inf.unideb.hu.server.model.users.Librarian;
import inf.unideb.hu.server.repository.UserRepository;
import inf.unideb.hu.server.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> {
                    if (user instanceof Librarian) {
                        return mapLibrarianToDTO((Librarian) user);
                    }
                    return convertToDTO(user, determineDTOType(user));
                })
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO convertToDTO(Object object) {
        User user = (User) object;
        return convertToDTO(user, determineDTOType(user));
    }

    private <T extends UserDTO> T convertToDTO(User user, Class<T> dtoType) {
        return objectMapper.convertValue(user, dtoType);
    }

    private Class<? extends UserDTO> determineDTOType(User user) {
        return switch (user.getRole()) {
            case ADMIN -> AdminDTO.class;
            case LIBRARIAN -> LibrarianDTO.class;
            case MEMBER -> MemberDTO.class;
            default -> throw new IllegalArgumentException("Ismeretlen szerepkör: " + user.getRole());
        };
    }

    private LibrarianDTO mapLibrarianToDTO(Librarian librarian) {
        LibrarianDTO librarianDTO = objectMapper.convertValue(librarian, LibrarianDTO.class);
        if (librarian.getLibrary() != null) {
            LibraryDTO libraryDTO = new LibraryDTO();
            libraryDTO.setId(librarian.getLibrary().getId());
            libraryDTO.setName(librarian.getLibrary().getName());
            librarianDTO.setLibrary(libraryDTO);
        }
        return librarianDTO;
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    @Override
    public boolean authenticate(String username, String password) {
        User user = loadUserByUsername(username);
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public void register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

}
