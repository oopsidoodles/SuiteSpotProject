import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Property} from '../api/client/properties/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  @Output() propertyClickEmitter: EventEmitter<Property> = new EventEmitter<Property>();
  @Input() properties: Property[];
  searchText = '';

  constructor() { }

  ngOnInit() {
  }

  propertyClickHandler(property: Property) {
    this.propertyClickEmitter.emit(property);
  }

  getVisibleProperties() {
    return this.properties.filter((property) => {
      return property.name.toLowerCase().includes(this.searchText) || property.address.toLowerCase().includes(this.searchText);
    });
  }

  onSearchBoxChange(text: string) {
    this.searchText = text.toLowerCase();
  }
}
