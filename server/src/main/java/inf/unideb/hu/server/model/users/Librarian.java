package inf.unideb.hu.server.model.users;

import com.fasterxml.jackson.annotation.JsonBackReference;
import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.base.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "librarians")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Librarian extends User {

    @ManyToOne
    @JoinColumn(name = "library")
    @JsonBackReference(value = "library-librarians")
    private Library library;

}
