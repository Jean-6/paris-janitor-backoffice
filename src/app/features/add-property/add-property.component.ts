import {Component,  EventEmitter,  OnInit, Output,Input, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPropertyComponent implements OnInit{

  @Input() items: MenuItem[] = [];
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  multiFormData: any = { //Stock datas for each step
    information: {},
    images: {},
    documents:{},
    confirmation:{}
  }

  constructor(public messageService: MessageService,
              private router: Router,
              private formBuilder  : FormBuilder) {}

  ngOnInit(): void{
    /**/
    this.items = [
      {
        label: 'Informations sur le bien',/*icon:'pi pi-home',*/
        command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
        label: 'Uploader les images',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
        label: 'Uploader les documents',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
      },
      {
        label: 'Etape de validation',
        command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
      }
    ];
  }

  nextStep(){
    if(this.activeIndex < this.items.length -1 ){
      this.activeIndex++;

    }
  }

  prevStep(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }

  updateFormData(step: string, data: any){
    this.multiFormData[step] = data;
  }

  onActiveIndexChange(index: number) {
  }

}
