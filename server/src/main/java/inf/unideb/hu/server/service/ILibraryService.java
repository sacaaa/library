package inf.unideb.hu.server.service;

import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.dto.LibraryDTO;

import java.util.List;
import java.util.Optional;

public interface ILibraryService extends IDTOService<LibraryDTO> {

    List<LibraryDTO> getLibraries();

    Optional<Library> getLibraryById(Long id);

    LibraryDTO createLibrary(LibraryDTO libraryDTO);

    Optional<Library> updateLibrary(Long id, LibraryDTO libraryDTO);

    boolean deleteLibrary(Long id);

}
