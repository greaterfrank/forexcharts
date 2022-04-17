import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-candle1',
  templateUrl: './chart-candle1.component.html',
  styleUrls: ['./chart-candle1.component.sass']
})
export class ChartCandle1Component implements OnInit {

  svg:SafeHtml;
  constructor(private sanitizer: DomSanitizer) { 
      this.svg = this.svg = this.sanitizer.bypassSecurityTrustHtml(this.drawSvg());
    }

   public drawSvg(): string {
    return '<svg width="300" height="200">' + 
      '<polygon points="100,10 40,198 190,78 10,78 160,198"' +
      'style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />' +
      '</svg>' ;
  }  

  ngOnInit(): void {}
}
