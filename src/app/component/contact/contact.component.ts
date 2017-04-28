import {Component, OnInit, Inject} from '@angular/core';
import {ContactConverter} from "../../adapter/interfaces/ContactConverter";
import {FormBuilder} from "@angular/forms";
import {ContactConverterImpl} from "../../adapter/ContactConverterImpl";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  providers: [{ provide: 'ContactConverter', useClass: ContactConverterImpl }],

  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  fb:FormBuilder;
  constructor(@Inject('ContactConverter') private contactConverter:ContactConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }
}
