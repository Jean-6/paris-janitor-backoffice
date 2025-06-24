import {Component, Output, EventEmitter} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AlertService} from "../../../_services/alert.service";

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.css']
})
export class UploadReceiptComponent {

  activeIndex: number = 0;
  items: MenuItem[] = [];
  @Output() formDataUpdated = new EventEmitter<any>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  identityDocs: File[] = [];
  technicalDiagnostic: File[] = [];
  propertyTitle: File[] = [];
  otherDocument: File[] = [];

  selectedDocs: File[] = [];

  constructor(private alert: AlertService) {
  }

  onFileSelected(event: any, category: 'identityDoc' | 'technicalDiagnostic' | 'propertyTitle' | 'otherDocument'): void {

    const input = event.currentTarget as HTMLInputElement;
    if (!input.files || !input.files?.length) {
      this.alert.warn("Aun fichier selectionné ");
      return;
    }
    const filesArray = Array.from(input.files);
    switch (category) {
      case 'identityDoc':
        this.identityDocs = filesArray;
        break;

      case 'technicalDiagnostic':
        this.technicalDiagnostic = filesArray;
        break;

      case "propertyTitle":
        this.propertyTitle = filesArray;
        break;

      case 'otherDocument':
        this.otherDocument = filesArray;
        break;
    }
    /*const files = event.target.files;

    for(let i = 0; i< files.length; i++){
      const file = files[i];
      if(file.type === 'application/pdf'){
        this.selectedDocs.push(file);
      }else{
        this.alert.warn(`Fichier ignoré : ${file.name} n'est pas un PDF`)
        console.log(`Fichier ignoré : ${file.name} n'est pas un PDF`)
      }
    }
    event.target.value = '';*/
  }

  removeFile(index: number, category: 'identityDoc' | 'technicalDiagnostic' | 'propertyTitle' | 'otherDocument'): void {

    switch (category) {
      case 'identityDoc':
        this.identityDocs.splice(index,1);
        break;
      case 'technicalDiagnostic':
        this.technicalDiagnostic.splice(index,1);
        break;
      case "propertyTitle":
        this.propertyTitle.splice(index,1);
        break;
      case 'otherDocument':
        this.otherDocument.splice(index,1);
        break;
    }
  }



  onNext(): void {
    this.formDataUpdated.emit({documents: this.selectedDocs});
    this.next.emit();
  }

  onBack(): void {
    this.formDataUpdated.emit({documents: this.selectedDocs});
    this.back.emit();
  }
}

