package inf.unideb.hu.server.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import inf.unideb.hu.server.model.Book;
import inf.unideb.hu.server.model.Library;
import inf.unideb.hu.server.model.base.User;
import inf.unideb.hu.server.model.logger.MyLogger;
import inf.unideb.hu.server.repository.BookRepository;
import inf.unideb.hu.server.repository.LibraryRepository;
import inf.unideb.hu.server.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;

@Component
public class DataLoader {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void load() {
        loadData("classpath:data/libraries.json", Library[].class, libraryRepository);
        loadData("classpath:data/users.json", User[].class, userRepository);
        loadData("classpath:data/books.json", Book[].class, bookRepository);
    }

    private <T> void loadData(String resourcePath, Class<T[]> clazz, JpaRepository<T, Long> repository) {
        Resource resource = resourceLoader.getResource(resourcePath);
        try {
            T[] objects = objectMapper.readValue(resource.getInputStream(), clazz);
            if (objects == null || objects.length == 0) {
                MyLogger.log.warn(String.format("Nem található objektum a(z) %s fájlban.", resourcePath));
                return;
            }
            if (User.class.isAssignableFrom(clazz.getComponentType())) {
                Arrays.stream(objects)
                        .forEach(user -> ((User) user)
                                .setPassword(passwordEncoder.encode(((User) user).getPassword())));

            }
            repository.saveAll(Arrays.asList(objects));
            MyLogger.log.info(String.format("%d objektum betöltve a(z) %s fájlból.", objects.length, resourcePath));
        } catch (IOException e) {
            MyLogger.log.error(String.format("Hiba történt a(z) %s fájl beolvasása közben.", resourcePath), e);
        }
    }

}
