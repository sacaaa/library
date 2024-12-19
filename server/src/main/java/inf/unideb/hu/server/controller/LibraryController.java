package inf.unideb.hu.server.controller;

import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.dto.LibraryDTO;
import inf.unideb.hu.server.service.impl.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Library> getLibraryById(@PathVariable Long id) {
        return libraryService.getLibraryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Library> updateLibrary(@PathVariable Long id, @RequestBody LibraryDTO libraryDTO) {
        System.out.println(libraryDTO);
        return libraryService.updateLibrary(id, libraryDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibrary(@PathVariable Long id) {
        if (libraryService.deleteLibrary(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<LibraryDTO> createLibrary(@RequestBody LibraryDTO libraryDTO) {
        return ResponseEntity.ok(libraryService.createLibrary(libraryDTO));
    }

}
