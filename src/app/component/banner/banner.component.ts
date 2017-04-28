import {Component, OnInit, Inject} from '@angular/core';
import {BannerConverter} from "../../adapter/interfaces/BannerConverter";
import {BannerConverterImpl} from "../../adapter/BannerConverterImpl";

import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  providers: [{ provide: 'BannerConverter', useClass: BannerConverterImpl }],

  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  fb:FormBuilder;
  constructor(@Inject('BannerConverter') private bannerConverter:BannerConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
