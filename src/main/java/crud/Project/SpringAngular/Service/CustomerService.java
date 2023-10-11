package crud.Project.SpringAngular.Service;

import crud.Project.SpringAngular.DTO.CustomerDTO;
import crud.Project.SpringAngular.DTO.CustomerSaveDTO;
import crud.Project.SpringAngular.DTO.CustomerUpdateDTO;

import java.util.List;

public interface CustomerService {
    String addCustomer(CustomerSaveDTO customerSaveDTO);

    List<CustomerDTO> getAllCustomer();

    String updateCustomer(CustomerUpdateDTO customerUpdateDTO);

    boolean deleteCustomer(int id);
}
