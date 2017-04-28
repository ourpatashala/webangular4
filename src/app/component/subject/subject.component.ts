import {Component, OnInit, Inject} from '@angular/core';
import {SubjectConverterImpl} from "../../adapter/SubjectConverterImpl";
import {SubjectConverter} from "../../adapter/interfaces/SubjectConverter";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  providers: [{ provide: 'SubjectConverter', useClass: SubjectConverterImpl }],
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  fb:FormBuilder;
  constructor(@Inject('SubjectConverter') private subjectConverter:SubjectConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }
}
