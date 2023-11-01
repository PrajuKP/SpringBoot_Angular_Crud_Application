package crud.Project.SpringAngular.Response;

public class LoginResponse {

    String message;


    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }



    public LoginResponse(String message) {
        this.message = message;

    }

}
