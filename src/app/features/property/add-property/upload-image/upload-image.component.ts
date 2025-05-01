import {Component, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AttachmentService} from "../../../../_services/attachment.service";
import {AlertService} from "../../../../_services/alert.service";
import {PropertyService} from "../../../../_services/property.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {


  @Output() formDataUpdated = new EventEmitter<any>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

    //@ViewChild('fileUploader') fileUploader!: FileUpload;
    //maxFiles: number = 5;
    //files: File[] = [];
    //renamedFiles: File[] = [];
    selectedPictures:File[] =[];
    imagePreviews: string[] = [];

    constructor(private formBuilder: FormBuilder,
      private router: Router,
      private attachService: AttachmentService,
      private alert: AlertService,
      public messageService: MessageService,
      public propertyService: PropertyService) {

      }

    onFileSelected(event: any): void {

    const files = event.target.files;
    this.selectedPictures = Array.from(files); // Conserver les fichiers sélectionnés
    for(let i = 0 ; i < this.selectedPictures.length; i++){
      console.log("images :"+this.selectedPictures[i]);
      const file = files[i];
      if(file && file.type.startsWith('image/')){
        const reader = new FileReader();

        reader.onload = (e:any) => {
          this.imagePreviews.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
    this.formDataUpdated.emit();

  }

  removeImage(i: number): void {
    this.imagePreviews.splice(i, 1);
  }

  uploadImages(){

    if(this.selectedPictures.length === 0){
      this.alert.warn('Aucune image sélectionnée');
      return;
    }

    this.attachService.sendPictures(this.selectedPictures).subscribe({
      next: (res) => this.alert.success(""),
      error: (err) => this.alert.error("")

    });
  }


  onNext(){
    this.formDataUpdated.emit({pictures: this.selectedPictures});
    this.next.emit();
  }

  onBack(){
    this.formDataUpdated.emit({pictures: this.selectedPictures});
    this.back.emit();
  }

  /*
 onSelect(event: any) {
   if(this.fileUploader.files.length>this.maxFiles){
     this.fileUploader.files.splice(this.maxFiles);
     this.alert.warn('Limite d\'images atteinte','Max 5 images');
   }else{
     let date:Date = new Date();
     this.files= event.files;
     const newName = `${date.getHours().toString().padStart(2, '0')}` +
       `${date.getMinutes().toString().padStart(2, '0')}` +
       `${date.getSeconds().toString().padStart(2, '0')}_` +
       `${date.getFullYear()}` +
       `${(date.getMonth() + 1).toString().padStart(2, '0')}` +
       `${date.getDate().toString().padStart(2, '0')}`;

     for(let  i = 0;i<this.files.length;i++){
       console.log(this.files[i])
       const renamedFile = new File([this.files[i]], `${newName}${this.getFileExtension(this.files[i].name)}`, { type: this.files[i].type })
       this.renamedFiles.push(renamedFile);
     }
     this.fileUploader.files = this.renamedFiles;
   }
 }*/

  /*
    uploadFiles() {
      this.fileUploader.upload(); // Lance le upload personnalisé
    }*/

  /*onFileSelected(event: any) {
    const files: File[] = event.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreviews.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }*/
  /*
    onUploadPictures() {
      const formData = new FormData();
      if(this.imagePreviews.length>0) {
        console.log(this.imagePreviews)
        const formDataArray = this.imagePreviews.map(file=>{
          formData.append('files', file);
          return formData;
        })
        this.attachService.sendPictures(formDataArray).subscribe({
          next:(response: UploadResponse | ApiError) => {
            if('status' in response){
              //ApiError
              this.attachService.isUploading=true;
            }else {

            }
          },
          error:(err)=>{
            this.attachService.isUploading=false;
            this.alert.error('Uploading error')
          },
          complete:()=>{
            this.attachService.isUploading=false;
            this.alert.success('Upload réussi')
          }
        });
      }
    }



  private getFileExtension(filename: string):string {
    return filename.slice(filename.lastIndexOf('.'))
  }
    */

}
