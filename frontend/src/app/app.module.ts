import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiClientModule } from './api/client/api-client.module';
import { AppComponent } from './app.component';
import { PropertyComponent } from './property/property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitComponent } from './unit/unit.component';
import { TenantRequestFormComponent } from './tenant-request-form/tenant-request-form.component';
import { LoginComponent } from './login/login.component';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    PropertyListComponent,
    PropertyDetailsComponent,
    UnitListComponent,
    UnitComponent,
    TenantRequestFormComponent,
    LoginComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    ApiClientModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
