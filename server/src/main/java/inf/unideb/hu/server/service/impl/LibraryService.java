package inf.unideb.hu.server.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import inf.unideb.hu.server.model.Book;
import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.dto.BookDTO;
import inf.unideb.hu.server.model.dto.BorrowerDTO;
import inf.unideb.hu.server.model.dto.LibraryDTO;
import inf.unideb.hu.server.model.dto.UserDTO;
import inf.unideb.hu.server.repository.LibraryRepository;
import inf.unideb.hu.server.service.ILibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LibraryService implements ILibraryService {

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<LibraryDTO> getLibraries() {
        return libraryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Library> getLibraryById(Long id) {
        return libraryRepository.findById(id);
    }

    @Override
    public LibraryDTO convertToDTO(Object object) {
        if (object instanceof Library library) {
            LibraryDTO libraryDTO = objectMapper.convertValue(library, LibraryDTO.class);
            libraryDTO.setBooks(library.getBooks().stream()
                    .map(book -> {
                        BookDTO bookDTO = objectMapper.convertValue(book, BookDTO.class);
                        if (book.isBorrowed() && book.getBorrowedBy() != null) {
                            // Convert the borrowedBy user to a UserDTO or specific DTO type
                            BorrowerDTO borrowedByDTO = objectMapper.convertValue(book.getBorrowedBy(), BorrowerDTO.class);
                            bookDTO.setBorrowedBy(borrowedByDTO);
                        }
                        return bookDTO;
                    })
                    .collect(Collectors.toList()));
            return libraryDTO;
        }
        throw new IllegalArgumentException("Nem megfelelő típus: " + object.getClass().getSimpleName());
    }
}
