import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root' // Rendre le se service disponible dans toute l'application
})
export class AlertService {

  constructor(private messageService: MessageService) { }

  success(message: string, summary:string = 'Succès') {
    this.messageService.add({severity: 'success', summary: summary, detail: message});
  }

  error(message: string, summary: string = 'Erreur'){
    this.messageService.add({severity: 'error', summary: summary, detail: message});
  }

  info(message: string, summary: string = 'Information'){
    this.messageService.add({severity: 'info', summary: summary, detail: message});

  }

  warn(message: string , summary: string = 'Avertissement'){
    this.messageService.add({severity: 'warn', summary: summary, detail: message});
  }

  clear(){
    this.messageService.clear()

  }
}
