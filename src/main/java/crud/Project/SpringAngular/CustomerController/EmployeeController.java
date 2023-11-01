package crud.Project.SpringAngular.CustomerController;


import crud.Project.SpringAngular.DTO.EmployeeDTO;
import crud.Project.SpringAngular.DTO.LoginDTO;
import crud.Project.SpringAngular.DTO.ResetPasswordRequest;
import crud.Project.SpringAngular.Response.LoginResponse;
import crud.Project.SpringAngular.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @PostMapping(path = "/save")
    public String saveEmployee(@RequestBody EmployeeDTO employeeDTO)
    {
        String id = employeeService.addEmployee(employeeDTO);
        return id;
    }


    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }



    @PostMapping(path = "/reset_password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        String email = resetPasswordRequest.getEmail();
        String newPassword = resetPasswordRequest.getNewPassword();
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>" + email);
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>" + newPassword);

        EmployeeDTO employee = employeeService.findEmployeeByEmail(email);


        employee.setPassword(newPassword);
        employee.setNewPassword(newPassword);


        if (employee != null) {
            if (isPasswordValid(newPassword)) {
                employeeService.updateEmployee(employee);
                return ResponseEntity.ok("Password reset successful.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password reset failed. Invalid password format.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Password reset failed. User not found.");
        }
    }


    private boolean isPasswordValid(String newPassword) {
        return newPassword.length() >= 8;
    }




}



