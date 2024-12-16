package inf.unideb.hu.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import inf.unideb.hu.server.model.users.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TestMapper {
    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDeserialization() throws Exception {
        String json = """
        {
            "type": "member",
            "id": 3,
            "name": "Student User",
            "email": "student.user@example.com",
            "dateOfBirth": "2000-01-01"
        }
        """;

        Member member = objectMapper.convertValue(json, Member.class);
        System.out.println(member);
    }



}
