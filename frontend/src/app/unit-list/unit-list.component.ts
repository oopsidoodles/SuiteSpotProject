import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Unit} from '../api/client/units/unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  _units: Unit[] = [];
  @Input()
  set units(val: Unit[]) {
    this._units = val;
    this.findFloorNumbers();
    this.selectedFloor = -1;
  }
  get units(): Unit[] {
    return this._units;
  }
  floorNumbers: number[] = [];
  selectedFloor = -1;
  @Output() unitClickEmitter: EventEmitter<Unit> = new EventEmitter<Unit>();

  constructor() { }

  ngOnInit() {
  }

  findFloorNumbers() {
    const temp = {};
    this.units.forEach((unit) => {
      temp[unit.floor] = true;
    });
    this.floorNumbers = Object.keys(temp).map(k => parseInt(k, 10));
  }

  getVisibleUnits() {
    return this.units.filter((unit) => {
      return unit.floor === this.selectedFloor || this.selectedFloor === -1;
    });
  }

  floorDropdownClickHandler(floor) {
    this.selectedFloor = floor;
  }

  unitClickHandler(unit) {
    this.unitClickEmitter.emit(unit);
  }
}
