import { Component, OnInit } from '@angular/core';
import { WebCamComponent } from 'ack-angular-webcam';

@Component({
  selector: 'app-webcampopup',
  templateUrl: './webcampopup.component.html',
  styleUrls: ['./webcampopup.component.css']
})
export class WebcampopupComponent implements OnInit {
  webcam:WebCamComponent//will be populated by <ack-webcam [(ref)]="webcam">
  base64;
  config;

  constructor() { }

  ngOnInit() {
  }

  genBase64(){
    this.webcam.getBase64()
    .then( base=>{
      this.base64=base;
      alert(base);
    })
    .catch( e=>console.error(e) )
  }

  //get HTML5 FormData object and pretend to post to server
  genPostData(){
    this.webcam.captureAsFormData({fileName:'file.jpg'})
    .then( formData=>this.postFormData(formData) )
    .catch( e=>console.error(e) )
  }

  //a pretend process that would post the webcam photo taken
  postFormData(formData){
    this.config = {
      method:"post",
      url:"http://www.aviorsciences.com/",
      body: formData
    }

    let request = new Request(this.config);

}

  onCamError(err){}

  onCamSuccess(){}
}