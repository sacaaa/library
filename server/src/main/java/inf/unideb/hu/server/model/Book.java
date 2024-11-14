package inf.unideb.hu.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import inf.unideb.hu.server.model.base.BaseEntity;
import inf.unideb.hu.server.model.users.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Book extends BaseEntity {

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "publication_year", nullable = false)
    private int publicationYear;

    @Column(name = "is_borrowed", nullable = false)
    private boolean isBorrowed;

    @ManyToOne
    @JoinColumn(name = "library")
    @JsonBackReference(value = "library-books")
    private Library library;

    @ManyToOne
    @JoinColumn(name = "borrowed_by_member_id")
    private Member borrowedBy;

}
