package inf.unideb.hu.server.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import inf.unideb.hu.server.model.Book;
import inf.unideb.hu.server.model.dto.BookDTO;
import inf.unideb.hu.server.model.dto.BorrowerDTO;
import inf.unideb.hu.server.repository.BookRepository;
import inf.unideb.hu.server.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService implements IBookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<BookDTO> getBooks() {
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public BookDTO convertToDTO(Object object) {
        if (object instanceof Book book) {
            BookDTO bookDTO = objectMapper.convertValue(book, BookDTO.class);

            if (book.getBorrowedBy() != null) {
                BorrowerDTO borrowerDTO = objectMapper.convertValue(book.getBorrowedBy(), BorrowerDTO.class);
                bookDTO.setBorrowedBy(borrowerDTO);
            }

            return bookDTO;
        }
        throw new IllegalArgumentException("Nem megfelelő típus: " + object.getClass().getSimpleName());
    }
}
