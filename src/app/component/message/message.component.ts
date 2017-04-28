import {Component, OnInit, Inject} from '@angular/core';
import {MessageConverterImpl} from "../../adapter/MessageConverterImpl";

import {MessageConverter} from "../../adapter/interfaces/MessageConverter";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [{ provide: 'MessageConverter', useClass: MessageConverterImpl }],
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  fb:FormBuilder;
  constructor(@Inject('MessageConverter') private messageConverter:MessageConverter,fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
  }

}
