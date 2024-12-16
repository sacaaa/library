package inf.unideb.hu.server.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowedBookDTO {

    private Long id;

    private String title;

    private String author;

    private String isbn;

    private int publicationYear;

}
