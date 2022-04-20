package frank.springboot.forexcharts.data.model;

import lombok.Data;

@Data
public class RateRecord {
    String Time;
    float Close=0;
    float High=0;
    float Low=0;
    float Open=0;

    public RateRecord() { }

    public RateRecord(String time, float open, float high, float low, float close)
    {
        this.Time = time;
        this.Open = open;
        this.High = high;
        this.Low = low;
        this.Close = close;
    }

    public void setTime(String t) { Time = t;}
    public void setOpen(float v) { Open = v;}
    public void setHigh(float v) { High = v;}
    public void setLow(float v) { Low = v;}
    public void setClose(float v) { Close = v;}

}
