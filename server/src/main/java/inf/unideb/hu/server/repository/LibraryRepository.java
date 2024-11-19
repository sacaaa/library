package inf.unideb.hu.server.repository;

import inf.unideb.hu.server.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Long>{
}
