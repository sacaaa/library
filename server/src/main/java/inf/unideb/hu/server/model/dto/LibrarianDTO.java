package inf.unideb.hu.server.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LibrarianDTO extends UserDTO {

    private Long id;

    private String password;

    private String email;

    private String Role;

    private LibraryDTO library;

    private String name;

}
