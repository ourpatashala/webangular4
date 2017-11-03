import { Component, OnInit } from '@angular/core';
import { AppConstants } from "../../constants/AppConstants";
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})


export class HeaderComponent implements OnInit {

schoolName :string;


  constructor() {
    console.log("Header "+ localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLNAME));
    this.schoolName = localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLNAME);    
   }

  ngOnInit() {

$(document).ready(function(){
//alert("working");
});


var mouse_is_inside = false;
$(document).ready(function()
{
    $('.header_profile_session div').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });
    $("body").mouseup(function(){ 
        if(! mouse_is_inside)  $('.submenu').removeClass('submenu_active');
        else $('.submenu').toggleClass('submenu_active');
    });
});


$('.header_list_item li').on('click',function(){
$(this).addClass('list_active').parent().siblings().children().removeClass('list_active');
});

  }

}
