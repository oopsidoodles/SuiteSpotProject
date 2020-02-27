import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Property} from '../api/client/properties/property.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Output() clickEmitter: EventEmitter<Property> = new EventEmitter<Property>();

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
    this.clickEmitter.emit(this.property);
  }
}
