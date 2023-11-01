package crud.Project.SpringAngular.Service;


import crud.Project.SpringAngular.CustomerRepo.EmployeeRepo;
import crud.Project.SpringAngular.DTO.EmployeeDTO;
import crud.Project.SpringAngular.DTO.LoginDTO;
import crud.Project.SpringAngular.Entity.Employee;
import crud.Project.SpringAngular.Response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class EmployeeIMPL implements EmployeeService{
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private CharSequence newPassword;

    @Override
    public String addEmployee(EmployeeDTO employeeDTO) {
        String encodedPassword = passwordEncoder.encode(employeeDTO.getPassword());

        Employee employee = new Employee(
                employeeDTO.getEmployeeid(),
                employeeDTO.getEmployeename(),
                employeeDTO.getEmail(),
                encodedPassword
        );
        employeeRepo.save(employee);
        return employee.getEmployeename();
    }
    EmployeeDTO employeeDTO;
    @Override
    public LoginResponse loginEmployee(LoginDTO loginDTO) {
        EmployeeDTO existEmployee = findEmployeeByEmail(loginDTO.getEmail());

        if (existEmployee == null) {
            return new LoginResponse("Email not exists");
        } else {
            boolean isPasswordMatch = passwordEncoder.matches(loginDTO.getPassword(), existEmployee.getPassword());


            if (isPasswordMatch) {
                return new LoginResponse("Login Success");
            } else {
                return new LoginResponse("Password Not Match");
            }
        }
    }

    @Override
    public String updateEmployee(EmployeeDTO employee) {
        String encodedPassword = passwordEncoder.encode(employee.getPassword());

        Employee existingEmployee = new Employee(employee.getEmployeeid(),employee.getEmployeename(),employee.getEmail(),encodedPassword);
        employeeRepo.save(existingEmployee);
        return "Password updated successfully";
    }



    @Override
    public EmployeeDTO findEmployeeById() {
        return null;
    }

    @Override
    public EmployeeDTO findEmployeeByEmail(String email) {
        Employee employee = employeeRepo.findByEmail(email);
        return employee != null ?
                new EmployeeDTO(employee.getEmployeeid(), employee.getEmployeename(), employee.getEmail(), employee.getPassword()) :
                null;
    }
}
