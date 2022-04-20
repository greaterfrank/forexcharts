import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RestService, Product } from '../rest.service';
//import { Router } from '@angular/router';

const dataSource = [{
  Time: new Date(1994, 2, 1),
  Low: 24.00,
  High: 25.00,
  Open: 25.00,
  Close: 24.875,
}, {
  Time: new Date(1994, 2, 2),
  Low: 23.625,
  High: 25.125,
  Open: 24.00,
  Close: 24.875,
}, {
  Time: new Date(1994, 2, 3),
  Low: 26.25,
  High: 28.25,
  Open: 26.75,
  Close: 27.00,
}, {
  Time: new Date(1994, 2, 4),
  Low: 26.50,
  High: 27.875,
  Open: 26.875,
  Close: 27.25,
}, {
  Time: new Date(1994, 2, 7),
  Low: 26.375,
  High: 27.50,
  Open: 27.375,
  Close: 26.75,
}, {
  Time: new Date(1994, 2, 8),
  Low: 25.75,
  High: 26.875,
  Open: 26.75,
  Close: 26.00,
}, {
  Time: new Date(1994, 2, 9),
  Low: 25.75,
  High: 26.75,
  Open: 26.125,
  Close: 26.25,
}, {
  Time: new Date(1994, 2, 10),
  Low: 25.75,
  High: 26.375,
  Open: 26.375,
  Close: 25.875,
}, {
  Time: new Date(1994, 2, 11),
  Low: 24.875,
  High: 26.125,
  Open: 26.00,
  Close: 25.375,
}, {
  Time: new Date(1994, 2, 14),
  Low: 25.125,
  High: 26.00,
  Open: 25.625,
  Close: 25.75,
}, {
  Time: new Date(1994, 2, 15),
  Low: 25.875,
  High: 26.625,
  Open: 26.125,
  Close: 26.375,
}, {
  Time: new Date(1994, 2, 16),
  Low: 26.25,
  High: 27.375,
  Open: 26.25,
  Close: 27.25,
}, {
  Time: new Date(1994, 2, 17),
  Low: 26.875,
  High: 27.25,
  Open: 27.125,
  Close: 26.875,
}, {
  Time: new Date(1994, 2, 18),
  Low: 26.375,
  High: 27.125,
  Open: 27.00,
  Close: 27.125,
}, {
  Time: new Date(1994, 2, 21),
  Low: 26.75,
  High: 27.875,
  Open: 26.875,
  Close: 27.75,
}, {
  Time: new Date(1994, 2, 22),
  Low: 26.75,
  High: 28.375,
  Open: 27.50,
  Close: 27.00,
}, {
  Time: new Date(1994, 2, 23),
  Low: 26.875,
  High: 28.125,
  Open: 27.00,
  Close: 28.00,
}, {
  Time: new Date(1994, 2, 24),
  Low: 26.25,
  High: 27.875,
  Open: 27.75,
  Close: 27.625,
}, {
  Time: new Date(1994, 2, 25),
  Low: 27.50,
  High: 28.75,
  Open: 27.75,
  Close: 28.00,
}, {
  Time: new Date(1994, 2, 28),
  Low: 25.75,
  High: 28.25,
  Open: 28.00,
  Close: 27.25,
}, {
  Time: new Date(1994, 2, 29),
  Low: 26.375,
  High: 27.50,
  Open: 27.50,
  Close: 26.875,
}, {
  Time: new Date(1994, 2, 30),
  Low: 25.75,
  High: 27.50,
  Open: 26.375,
  Close: 26.25,
}, {
  Time: new Date(1994, 2, 31),
  Low: 24.75,
  High: 27.00,
  Open: 26.50,
  Close: 25.25,
}];

interface Rate {
  Time: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
};

@Component({
  selector: 'app-chart-candle1',
  templateUrl: './chart-candle1.component.html',
  styleUrls: ['./chart-candle1.component.sass']
})

export class ChartCandle1Component implements OnInit {

  products: Product[] = [];
  rates: Rate[] = [];

  svg:SafeHtml;
  image:string;
  constructor(
    public rest: RestService,
    //private router: Router,
    private sanitizer: DomSanitizer) { 
      this.image = "";
      this.svg = this.sanitizer.bypassSecurityTrustHtml(this.drawSvg(dataSource));
    }

    private getImageScale(width, height, r, n, bars, shift, k_x)
    {
      var ky=-1, by=-1;
      var kx=-1, bx=-1;
      const extend_image = r.length;
      // const n = r.length - 1;

      var ymax = r[n].High;
      var ymin = r[n].Low;

      var h = height - 300;

      // console.log(" -- getImageScale -- ", n, ymin, ymax)
      
      for(var j=0; j<bars; j++)
      {
        var i = n-shift+j;
        if(i >= extend_image) break; 
        if(i < 0) continue;
        if(ymax < r[i].High) ymax = r[i].High;
        if(ymin > r[i].Low)  ymin = r[i].Low;

        // console.log(" -- getImageScale -- ", i, r[i].h, r[i].l, ymin, ymax)
      }
    
      if(ymax - ymin > 0.0000001) {
        // find k, b for y = kx + b;
        // 1020 = k * ymax + b ==> 700 = k ( ymax - ymin)
        //  320 = k * ymin + b ==> k = 700 / (ymax - ymin)

        ky = ymin; ymin = ymax; ymax = ky;
              
        ky = h / (ymax - ymin);
        by = h - ky * ymax;
        kx = k_x;
        if(k_x == 0)
          kx = 6;
        bx = 18 - kx * (n - shift);
      }
      // console.log("getImageScale", n, ymin, ymax, kx, bx, ky, by)
      return {
        'kx': kx,
        'bx': bx,
        'ky': ky,
        'by': by,
        'width': width,
        'height': height,
      };      
    }

    private image_begin() { this.image = '<svg width="1020" height="720">' }
    private image_end() { this.image += '</svg>' }

    private line(x1, y1, x2, y2, color, width) {
      this.image += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:' + color + ';stroke-width:'+ width + '" />';
    }

    private rect(x1, y1, x2, y2, color, fill) {
      if(x1>x2){let xx=x1;x1=x2;x2=xx;}
      if(y1>y2){let yy=y1;y1=y2;y2=yy;}
      let dx = x2 - x1;
      let dy = y2 - y1;
      this.image += '<rect x="'+x1+'" y="'+y1+'" width="'+dx+'" height="'+dy+'" style="fill:'+fill+';stroke:'+color+';stroke-width:1;fill-opacity:0.99;stroke-opacity:0.99" />';
    }
    private text(x, y, txt) {
      this.image += '<text x="'+x+'" y="'+y+'" class="small">'+txt+'</text>';
    }
    
    private draw_vertical_lines(scale, pos, close_m1, r, n)
    {
      let ky = scale.ky;
      let kx = scale.kx;
      let by = scale.by;
      let bx = scale.bx;

    // draw vertical lines:

      var x, y;
      var xe = scale.width-10;
      for(x=18; x<xe; x+=60)
      {
        this.line(x, 10, x, scale.width-10, '#e0e0e0',1);
        // var i = (x - bx) / kx; if(i>0 && i<n) { this.text(x, 305, r.date); }
      }
    
      let u1   =  (10 - by)/ky;
      let u2   = (400 - by)/ky;
      if(u1 > u2) {let uu=u1;u1=u2;u2=uu;}
      let dy = 40 / ky;
      let v1 = Math.floor(u1 * dy + 1) / dy;
      let v2 = Math.floor(u2 * dy) / dy;
      let dv = (v2-v1-0.001) / 10;
      // console.log("horizontal lines:", v1, v2, dv)
      for(let v = v1; v < v2; v += dv)
      {
        y = ky * v + by;
        // console.log("===== horizontal lines:", v, y)
        this.line(10, y, xe, y, '#808080', 1);
        this.text(xe - 170, y+1, v);
      }
    
      // draw horizontal lines for rsi:

      y = scale.height - 100; this.line(10, y, xe, y, '#808080',1);
      y = scale.height - 160; this.line(10, y, xe, y, '#808080',1);
      y = scale.height - 220; this.line(10, y, xe, y, '#808080',1);
    
      // draw current bar position
      {
        x = kx * pos + bx;
        this.line(x, 10, x, scale.width-10, ';#eff0000', 1);
    
        y = ky * close_m1 + by;
        this.line(x - kx * 5, y, x + kx * 5, y, '#eff0000', 1);
      }
      // console.log("draw_vertical_lines")
    }
    
    private draw_candle(scale, xx, r)
    {
      let ky = scale.ky;
      let kx = scale.kx;
      let by = scale.by;
      let bx = scale.bx;

      //	  |  y4
      //    H  y3
      //	  H  y2
      //	  |  y1
      let x  = kx * xx  + bx + 1;
      let y1 = ky * r.Low + by;
      let y2 = ky * r.Open + by;
      let y3 = ky * r.Close + by;
      let y4 = ky * r.High + by;
      if(r.Open > r.Close) { let yy = y2; y2 = y3; y3 = yy; }

      //console.log("draw_candle", r.o, r.h, r.l, r.c, x, y1, y2, y3, y4, ky, by)
  
      let color = 'blue';
      if(r.Open > r.Close) color = 'red';

      this.line(x, y1, x, y2, color, 1);
      this.line(x, y3, x, y4, color, 1);

      this.rect(x-2, y2, x+2, y3, color, color);
    }
  
   public drawSvg(r): string {
     /*
      return '<svg width="300" height="200">' + 
        '<polygon points="100,10 40,198 190,78 10,78 160,198"' +
        'style="fill:lime;stroke:purple;stroke-widtHigh:5;fill-rule:evenodd;" />' +
        '</svg>' ;
      */
       var nex = r.length;

        console.log("drawSvg")

        var nj = nex - 20;
        var shift = nex - 20;
        var i = nex - 18;

        if(nj >= nex - 5) { 
          nj = 20;
          shift = 15;
          i = 16;
        }
        
        if(i >= nex || i < shift)
        {
          console.log("Error in draw_image: n = %d      shift = %d ", nex, shift);
          return "";
        }
      
        let scale = this.getImageScale(1100, 700, r, i, nj, shift, 6)

        if(scale.kx<0)
        {
          console.log("getImageScale error");
          return "";
        }

        this.image_begin();

        var close = r[i].Close;
        this.draw_vertical_lines(scale, i, close, r, nex);
      
        //let colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ffcc00', '#00ffff', '#000000'];
        for(let j=0;j<nj;j++)
        {
          let ii = i-shift+j;
      
          if(ii >= i) if(ii >= nex) break; 
          if(ii < 0) continue;
      
          // console.log("draw_candle: ", ii)
          this.draw_candle(scale, ii, r[ii]);
        }
      
        this.image_end();
        // console.log("drawSvg image=", this.image)
        return this.image;

  }  

  getProducts(): void {
    this.rest.getProducts().subscribe((resp: any) => {
      console.log("resp=",resp);
      this.products = resp.Data;
      this.rates = resp.Data;
      console.log(this.products);
      this.svg = this.sanitizer.bypassSecurityTrustHtml(this.drawSvg(this.rates));
    });
  }  
  ngOnInit(): void {this.getProducts();}
}
