package crud.Project.SpringAngular.Service;

import crud.Project.SpringAngular.DTO.EmployeeDTO;
import crud.Project.SpringAngular.DTO.LoginDTO;
import crud.Project.SpringAngular.Response.LoginResponse;

public interface EmployeeService {
    String addEmployee(EmployeeDTO employeeDTO);
    LoginResponse loginEmployee(LoginDTO loginDTO);
}
