import {Component,  OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPropertyComponent implements OnInit,OnDestroy{



  constructor(private router: Router) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.router.navigate(['/characteristics']);
  }

}
