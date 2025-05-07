import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadResponse} from "../_dto/UploadResponse";
import {Image} from "../_models/Image";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private apiUrlAttachment ='http://localhost:8082/api/img/upload';
  private apiUrlReceipt = 'http://localhost:8082/api/receipt/1'; // URL de ton endpoint backend
  private apiUrlImages = 'localhost:8082/api/attachment/images/';
  //private apiUrlDocuments = 'localhost:8082/api/attachment/images/';


  constructor(private httpClient: HttpClient) { }

  sendPictures(files: File[]): Observable<UploadResponse>{
    const formData = new FormData();
    files.forEach(file => formData.append('files',file));
    return this.httpClient.post<UploadResponse>(`${this.apiUrlAttachment}/1`,
      {formData},
      { withCredentials: true }
    );
  }

  sendReceipts(formData: FormData[]):Observable<UploadResponse>{
    return  this.httpClient.post<UploadResponse>(`${this.apiUrlReceipt}`,
      {formData},
      { headers:{ 'content-Type' : 'multipart/form-data'} ,
        withCredentials: true
      });
  }

  retrieveImages():Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${this.apiUrlImages}`)
  }

}
