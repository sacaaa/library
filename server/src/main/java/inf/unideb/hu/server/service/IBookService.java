package inf.unideb.hu.server.service;

import inf.unideb.hu.server.model.Book;
import inf.unideb.hu.server.model.dto.BookDTO;

import java.util.List;
import java.util.Optional;

public interface IBookService extends IDTOService<BookDTO> {

    List<BookDTO> getBooks();

    Optional<Book> getBookById(Long id);

    boolean deleteBook(Long id);

    Optional<Book> updateBook(Long id, BookDTO bookDTO);

    BookDTO createBook(BookDTO bookDTO);

}
