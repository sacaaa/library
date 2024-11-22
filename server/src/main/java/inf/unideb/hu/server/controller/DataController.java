package inf.unideb.hu.server.controller;

import inf.unideb.hu.server.model.base.User;
import inf.unideb.hu.server.model.dto.MemberDTO;
import inf.unideb.hu.server.service.impl.BookService;
import inf.unideb.hu.server.service.impl.LibraryService;
import inf.unideb.hu.server.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private BookService bookService;

    @GetMapping
    public ResponseEntity<Map<String, Integer>> getData() {
        var userCount = (int) userService.getUsers().stream()
                .filter(user -> user instanceof MemberDTO)
                .count();
        var libraryCount = libraryService.getLibraries().size();
        var bookCount = bookService.getBooks().size();
        return ResponseEntity.ok(Map.of(
                "userCount", userCount,
                "libraryCount", libraryCount,
                "bookCount", bookCount
        ));
    }

}
