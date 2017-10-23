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
    this.uploadService.pushFileToStorage(schoolId, studentId, this.currentFileUpload, this.progress)
  }


}
