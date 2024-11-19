package inf.unideb.hu.server.service;

public interface IDTOService<T> {

    T convertToDTO(Object object);

}
