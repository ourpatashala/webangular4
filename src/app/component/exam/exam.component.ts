import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ExamConverter} from "../../adapter/interfaces/ExamConverter";
import {ExamConverterImpl} from "../../adapter/ExamConverterImpl";


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  providers: [{ provide: 'ExamConverter', useClass: ExamConverterImpl }],

  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  fb:FormBuilder;
  constructor(@Inject('ExamConverter') private examConverter:ExamConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
