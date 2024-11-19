package inf.unideb.hu.server.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LibraryDTO {

    private Long id;

    private String name;

    private AddressDTO address;

    private String phoneNumber;

    private String email;

    private List<LibrarianDTO> librarians;

    private List<BookDTO> books;

}
