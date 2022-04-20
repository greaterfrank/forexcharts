package frank.springboot.forexcharts.data.api;
import lombok.Data;

@Data
public class ApiResponse<T> {

    Integer Error = 0;
    String Message = "";
    T Data;

    public ApiResponse() {
        this.Error = 0;
        this.Message = "";
        this.Data = null;
    }

    public ApiResponse(T t) {
        this.Error = 0;
        this.Message = "";
        this.Data = t;
    }

    public ApiResponse(int error, String message) {
        this.Error = error;
        this.Message = message;
        this.Data = null;
    }
}
