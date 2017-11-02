import {Component, OnInit} from '@angular/core';

import {UploadFileService} from '../../service/upload-file.service';
import {FileUpload} from '../../service/fileupload';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0}

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(schoolId:string, studentId:string) {
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    console.log(localStorage.getItem('schoolid')+"    "+localStorage.getItem('studentId'));
    this.uploadService.pushFileToStorage(localStorage.getItem('schoolid'),  localStorage.getItem('studentId'), this.currentFileUpload, this.progress)
  }

  uploadSchoolPic(schoolId:string) {
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    console.log(localStorage.getItem('schoolid'));
    this.uploadService.pushSchoolPicToStorage(localStorage.getItem('schoolid'), this.currentFileUpload, this.progress)
  }

}
