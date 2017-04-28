import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FeesConverter} from "../../adapter/interfaces/FeesConverter";
import {FeesConverterImpl} from "../../adapter/FeesConverterImpl";


@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  providers: [{ provide: 'FeesConverter', useClass: FeesConverterImpl }],

  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  fb:FormBuilder;
  constructor(@Inject('FeesConverter') private feesConverter:FeesConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
