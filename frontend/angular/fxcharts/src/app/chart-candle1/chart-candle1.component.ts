import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RestService, Product } from '../rest.service';
//import { Router } from '@angular/router';

const dataSource = [{
  date: new Date(1994, 2, 1),
  l: 24.00,
  h: 25.00,
  o: 25.00,
  c: 24.875,
}, {
  date: new Date(1994, 2, 2),
  l: 23.625,
  h: 25.125,
  o: 24.00,
  c: 24.875,
}, {
  date: new Date(1994, 2, 3),
  l: 26.25,
  h: 28.25,
  o: 26.75,
  c: 27.00,
}, {
  date: new Date(1994, 2, 4),
  l: 26.50,
  h: 27.875,
  o: 26.875,
  c: 27.25,
}, {
  date: new Date(1994, 2, 7),
  l: 26.375,
  h: 27.50,
  o: 27.375,
  c: 26.75,
}, {
  date: new Date(1994, 2, 8),
  l: 25.75,
  h: 26.875,
  o: 26.75,
  c: 26.00,
}, {
  date: new Date(1994, 2, 9),
  l: 25.75,
  h: 26.75,
  o: 26.125,
  c: 26.25,
}, {
  date: new Date(1994, 2, 10),
  l: 25.75,
  h: 26.375,
  o: 26.375,
  c: 25.875,
}, {
  date: new Date(1994, 2, 11),
  l: 24.875,
  h: 26.125,
  o: 26.00,
  c: 25.375,
}, {
  date: new Date(1994, 2, 14),
  l: 25.125,
  h: 26.00,
  o: 25.625,
  c: 25.75,
}, {
  date: new Date(1994, 2, 15),
  l: 25.875,
  h: 26.625,
  o: 26.125,
  c: 26.375,
}, {
  date: new Date(1994, 2, 16),
  l: 26.25,
  h: 27.375,
  o: 26.25,
  c: 27.25,
}, {
  date: new Date(1994, 2, 17),
  l: 26.875,
  h: 27.25,
  o: 27.125,
  c: 26.875,
}, {
  date: new Date(1994, 2, 18),
  l: 26.375,
  h: 27.125,
  o: 27.00,
  c: 27.125,
}, {
  date: new Date(1994, 2, 21),
  l: 26.75,
  h: 27.875,
  o: 26.875,
  c: 27.75,
}, {
  date: new Date(1994, 2, 22),
  l: 26.75,
  h: 28.375,
  o: 27.50,
  c: 27.00,
}, {
  date: new Date(1994, 2, 23),
  l: 26.875,
  h: 28.125,
  o: 27.00,
  c: 28.00,
}, {
  date: new Date(1994, 2, 24),
  l: 26.25,
  h: 27.875,
  o: 27.75,
  c: 27.625,
}, {
  date: new Date(1994, 2, 25),
  l: 27.50,
  h: 28.75,
  o: 27.75,
  c: 28.00,
}, {
  date: new Date(1994, 2, 28),
  l: 25.75,
  h: 28.25,
  o: 28.00,
  c: 27.25,
}, {
  date: new Date(1994, 2, 29),
  l: 26.375,
  h: 27.50,
  o: 27.50,
  c: 26.875,
}, {
  date: new Date(1994, 2, 30),
  l: 25.75,
  h: 27.50,
  o: 26.375,
  c: 26.25,
}, {
  date: new Date(1994, 2, 31),
  l: 24.75,
  h: 27.00,
  o: 26.50,
  c: 25.25,
}];


@Component({
  selector: 'app-chart-candle1',
  templateUrl: './chart-candle1.component.html',
  styleUrls: ['./chart-candle1.component.sass']
})
export class ChartCandle1Component implements OnInit {

  products: Product[] = [];

  svg:SafeHtml;
  image:string;
  constructor(
    public rest: RestService,
    //private router: Router,
    private sanitizer: DomSanitizer) { 
      this.image = "";
      this.svg = this.svg = this.sanitizer.bypassSecurityTrustHtml(this.drawSvg());
    }

    private getImageScale(width, height, r, n, bars, shift, k_x)
    {
      var ky=-1, by=-1;
      var kx=-1, bx=-1;
      const extend_image = r.length;
      // const n = r.length - 1;

      var ymax = r[n].h;
      var ymin = r[n].l;

      var h = height - 300;

      // console.log(" -- getImageScale -- ", n, ymin, ymax)
      
      for(var j=0; j<bars; j++)
      {
        var i = n-shift+j;
        if(i >= extend_image) break; 
        if(i < 0) continue;
        if(ymax < r[i].h) ymax = r[i].h;
        if(ymin > r[i].l)  ymin = r[i].l;

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
      let y1 = ky * r.l + by;
      let y2 = ky * r.o + by;
      let y3 = ky * r.c + by;
      let y4 = ky * r.h + by;
      if(r.o>r.c) { let yy = y2; y2 = y3; y3 = yy; }

      //console.log("draw_candle", r.o, r.h, r.l, r.c, x, y1, y2, y3, y4, ky, by)
  
      let color = 'blue';
      if(r.o > r.c)
        color = 'red';

      this.line(x, y1, x, y2, color, 1);
      this.line(x, y3, x, y4, color, 1);

      this.rect(x-2, y2, x+2, y3, color, color);
    }
  
   public drawSvg(): string {
     /*
      return '<svg width="300" height="200">' + 
        '<polygon points="100,10 40,198 190,78 10,78 160,198"' +
        'style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />' +
        '</svg>' ;
      */

        console.log("drawSvg")

        var nj = 20;
        var shift = 15;

        var i = 16;
        var nex = 20;
      
        if(i >= nex || i < shift)
        {
          console.log("Error in draw_image: n = %d      shift = %d ", nex, shift);
          return "";
        }
      
        var r = dataSource;
        let scale = this.getImageScale(1100, 700, r, i, nj, shift, 6)

        if(scale.kx<0)
        {
          console.log("getImageScale error");
          return "";
        }

        this.image_begin();

        var close = r[i].c;
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
      console.log(this.products);
    });
  }  
  ngOnInit(): void {this.getProducts();}
}
