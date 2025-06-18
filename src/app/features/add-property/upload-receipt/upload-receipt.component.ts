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

  selectedDocs: File[] = [];

  constructor(
    private alert: AlertService
  ) {
  }

  onFileSelected(event: any): void {

    const files = event.target.files;

    for(let i = 0; i< files.length; i++){
      const file = files[i];
      if(file.type === 'application/pdf'){
        this.selectedDocs.push(file);
      }else{
        this.alert.warn(`Fichier ignoré : ${file.name} n'est pas un PDF`)
        console.log(`Fichier ignoré : ${file.name} n'est pas un PDF`)
      }
    }
    event.target.value = '';
  }

  onNext(): void {
    this.formDataUpdated.emit({ documents: this.selectedDocs });
    this.next.emit();
  }

  onBack(): void {
    this.formDataUpdated.emit({ documents: this.selectedDocs });
    this.back.emit();
  }
}

