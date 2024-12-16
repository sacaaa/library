package inf.unideb.hu.server.model.dto;

import inf.unideb.hu.server.model.base.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO extends UserDTO {

    private Long id;

    private String password;

    private String email;

    private String Role;

    private String name;

}
