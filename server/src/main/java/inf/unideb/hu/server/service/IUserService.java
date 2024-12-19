package inf.unideb.hu.server.service;

import inf.unideb.hu.server.model.base.User;
import inf.unideb.hu.server.model.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface IUserService extends IDTOService<UserDTO> {

    List<UserDTO> getUsers();

    Optional<User> getUserById(Long id);

    User loadUserByUsername(String username);

    boolean authenticate(String username, String password);

    void register(User user);

    Optional<UserDTO> updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);

}
