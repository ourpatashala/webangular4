import {Component, OnInit, Inject} from '@angular/core';
import {DocumentConverter} from "../../adapter/interfaces/DocumentConverter";
import {FormBuilder} from "@angular/forms";
import {DocumentConverterImpl} from "../../adapter/DocumentConverterImpl";


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  providers: [{ provide: 'DocumentConverter', useClass: DocumentConverterImpl }],

  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {


  fb:FormBuilder;
  constructor(@Inject('DocumentConverter') private documentConverter:DocumentConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
