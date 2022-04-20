package frank.springboot.forexcharts.data.db.impl;
import frank.springboot.forexcharts.data.model.RateRecord;
import frank.springboot.forexcharts.data.db.RatesDb;
import frank.springboot.forexcharts.data.api.RatesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
public class RatesDbImpl implements RatesDb {

    @Autowired private EntityManager entityManager;

    @Override
    public RatesResponse list() {

        RatesResponse response = new RatesResponse();

        response.Data = new ArrayList<RateRecord>();
        Query query = entityManager.createNativeQuery("select Time,Open,High,Low,Close from fxusdcad limit 1000");

        List<Object[]> reList = query.getResultList();

        for(Object[] re : reList) {
            response.Data.add(dbObject2GoodsSpuRecord(re));
        }
        return response;
    }

    private RateRecord dbObject2GoodsSpuRecord(Object[] re) {
        int i = 0;
        RateRecord record = new RateRecord();
        Object column;
        record.setTime(re[i++].toString());
        column = re[i++]; record.setOpen(Float.valueOf(column == null ? "0" : column.toString()));
        column = re[i++]; record.setHigh(Float.valueOf(column == null ? "0" : column.toString()));
        column = re[i++]; record.setLow(Float.valueOf(column == null ? "0" : column.toString()));
        column = re[i]; record.setClose(Float.valueOf(column == null ? "0" : column.toString()));
        return record;
    }
}
