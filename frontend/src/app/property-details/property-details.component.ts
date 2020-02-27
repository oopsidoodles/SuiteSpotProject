import {Component, Input, OnInit} from '@angular/core';

import {Property} from '../api/client/properties/property.model';
import {Unit} from '../api/client/units/unit.model';
import {UnitService} from '../api/client/units/unit.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  _selectedProperty: Property = null;
  @Input()
  set selectedProperty(val: Property) {
    if (!val) {
      return;
    }
    if (!this._selectedProperty) {
      this.setCurrentProperty(val);
    } else {
      if (val !== this._selectedProperty) {
        this.slideout(() => {
          this.setCurrentProperty(val);
          this.selectedUnit = null;
        });
      }
    }
  }
  get selectedProperty(): Property {
    return this._selectedProperty;
  }
  selectedUnit: Unit = null;
  loadedUnits: Unit[] = [];
  opening = false;
  closing = false;
  visible = false;

  constructor(
    private unitService: UnitService
  ) { }

  ngOnInit() {
  }

  setCurrentProperty(property: Property) {
    this._selectedProperty = property;
    this.loadUnits();
    this.slidein();
  }

  loadUnits() {
    this.unitService.queryUnits(this._selectedProperty)
      .subscribe((units) => {
        this.loadedUnits = units;
      });
  }

  slidein() {
    this.opening = true;
    setTimeout(() => {
      this.opening = false;
      this.visible = true;
    }, 1000);
  }

  slideout(cb) {
    this.closing = true;
    setTimeout(() => {
      this.visible = false;
      this.closing = false;
      cb();
    }, 1000);
  }

  onUnitClick(unit: Unit) {
    this.selectedUnit = unit;
  }

  onTenantRequestFormClose() {
    this.selectedUnit = null;
  }
}
