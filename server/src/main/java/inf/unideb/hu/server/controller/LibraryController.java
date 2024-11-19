package inf.unideb.hu.server.controller;

import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.dto.LibraryDTO;
import inf.unideb.hu.server.service.impl.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/libraries")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @GetMapping
    public ResponseEntity<List<LibraryDTO>> getLibraries() {
        return ResponseEntity.ok(libraryService.getLibraries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Library> getLibraryById(Long id) {
        return libraryService.getLibraryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
