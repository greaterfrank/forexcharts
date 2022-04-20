package frank.springboot.forexcharts.services.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import frank.springboot.forexcharts.services.RateApiService;
import frank.springboot.forexcharts.data.model.*;
import frank.springboot.forexcharts.data.db.RatesDb;
import java.util.List;
import frank.springboot.forexcharts.data.api.ApiResponse;
import com.google.gson.Gson;

@Service
public class RateApiServiceImpl implements RateApiService {

    @Autowired private RatesDb ratesDb;

    @Override 
	public String getItem()
    {
        return (new Gson()).toJson(new ApiResponse< List<RateRecord> >(ratesDb.list().Data));
    }
}
