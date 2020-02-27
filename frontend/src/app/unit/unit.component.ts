import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Unit} from '../api/client/units/unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @Input() unit: Unit = null;
  @Output() clickEmitter: EventEmitter<Unit> = new EventEmitter<Unit>();

  constructor() { }

  ngOnInit() {
  }

  isVacant() {
    if (typeof this.unit.vacant === 'undefined' || this.unit.vacant) {
      return true;
    }
    return false;
  }

  clickHandler() {
    this.clickEmitter.emit(this.unit);
  }
}
