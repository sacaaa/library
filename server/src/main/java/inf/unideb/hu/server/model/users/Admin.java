package inf.unideb.hu.server.model.users;

import inf.unideb.hu.server.model.base.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "admins")
@Data
public class Admin extends User {
}
