import {Component, OnInit, Inject} from '@angular/core';
import {EventConverter} from "../../adapter/interfaces/EventConverter";
import {FormBuilder} from "@angular/forms";
import {EventConverterImpl} from "../../adapter/EventConverterImpl";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  providers: [{ provide: 'EventConverter', useClass: EventConverterImpl }],

  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  fb:FormBuilder;
  constructor(@Inject('EventConverter') private eventConverter:EventConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }
}
