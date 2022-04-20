package frank.springboot.forexcharts.data.api;
import frank.springboot.forexcharts.data.model.RateRecord;
import java.util.List;
import lombok.Data;

@Data 
public class RatesResponse 
{ 
    public List<RateRecord> Data;
    public int Error;
    public String  message;
    public RatesResponse()
    {
        Error = 0;
    }
};
