package frank.springboot.forexcharts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import frank.springboot.forexcharts.services.RateApiService;

@Controller
@RequestMapping(path="/api/data") 
public class DataController {

    @Autowired private RateApiService rateApiService;

	private ResponseEntity<String> response(String json)
	{
        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(json, httpHeaders, HttpStatus.OK);
	}

	@GetMapping(path="/getItem")
	public @ResponseBody ResponseEntity<String> getItem() {
		System.out.println("-------- getItem called. --------");
        return response(rateApiService.getItem());
	}
}
