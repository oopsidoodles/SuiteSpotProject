import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PropertyService } from './properties/property.service';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class ApiClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiClientModule,
      providers: [
        PropertyService
      ]
    };
  }
}
