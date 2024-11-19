package inf.unideb.hu.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import inf.unideb.hu.server.model.base.BaseEntity;
import inf.unideb.hu.server.model.users.Librarian;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "libraries")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Library extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private Address address;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "library", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "library-librarians")
    private List<Librarian> librarians;

    @OneToMany(mappedBy = "library", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "library-books")
    private List<Book> books;

}
