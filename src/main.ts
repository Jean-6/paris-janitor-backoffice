

import {provideRouter} from "@angular/router";
import {routes} from "./app/app-routing.module";
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {MessageService} from "primeng/api";
import {provideHttpClient} from "@angular/common/http";




bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService,
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient()
  ]
}).catch(err => console.error(err));

