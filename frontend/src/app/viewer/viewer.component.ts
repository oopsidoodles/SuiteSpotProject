import {Component, Input, OnInit} from '@angular/core';

import {PropertyService} from '../api/client/properties/property.service';
import {Property} from '../api/client/properties/property.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  title = 'Easy Property Management';
  loadedProperties: Property[] = [];
  selectedProperty: Property = null;
  opening = false;
  visible = false;

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.loadProperties();
    this.slidein();
  }

  loadProperties() {
    this.propertyService.queryProperties()
      .subscribe(properties => {
        this.loadedProperties = properties;
      });
  }

  propertyClickHandler(property: Property) {
    this.selectedProperty = property;
  }

  slidein() {
    this.opening = true;
    setTimeout(() => {
      this.opening = false;
      this.visible = true;
    }, 1000);
  }
}
