package inf.unideb.hu.server.repository;

import inf.unideb.hu.server.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    boolean existsByBorrowedById(Long borrowedById);

}
