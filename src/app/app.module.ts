import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Http from '@angular/http';

import { AppComponent } from './app.component';
import { RootFormComponent } from './root-form/root-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { RestapiService } from './restapi.service';

@NgModule({
  declarations: [
    AppComponent,
    RootFormComponent,
    ChildFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Http.HttpModule
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
