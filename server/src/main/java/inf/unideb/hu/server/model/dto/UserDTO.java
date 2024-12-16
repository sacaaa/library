package inf.unideb.hu.server.model.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = MemberDTO.class, name = "member"),
        @JsonSubTypes.Type(value = AdminDTO.class, name = "admin"),
        @JsonSubTypes.Type(value = LibrarianDTO.class, name = "librarian")
})
public abstract class UserDTO {
}
