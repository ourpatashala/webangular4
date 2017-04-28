import {Component, OnInit, Inject} from '@angular/core';
import {ResultConverterImpl} from "../../adapter/ResultConverterImpl";
import {ResultConverter} from "../../adapter/interfaces/ResultConverter";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  providers: [{ provide: 'ResultConverter', useClass: ResultConverterImpl }],
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  fb:FormBuilder;


  constructor(@Inject('ResultConverter') private resultConverter:ResultConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
