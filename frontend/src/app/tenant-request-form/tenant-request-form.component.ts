import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Unit}        from '../api/client/units/unit.model';
import {UnitService} from '../api/client/units/unit.service';

@Component({
  selector: 'app-tenant-request-form',
  templateUrl: './tenant-request-form.component.html',
  styleUrls: ['./tenant-request-form.component.css']
})
export class TenantRequestFormComponent implements OnInit {
  @Input() selectedUnit: Unit = null;
  @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();
  opening = false;
  closing = false;
  visible = false;

  constructor(
    private unitService: UnitService
  ) { }

  ngOnInit() {
    this.slidein();
  }

  submitFormHandler(text) {
    // TODO submit the tenant request form here
    this.unitService.postForm(this.selectedUnit, text)
      .subscribe((res) => {
        console.log(res);
        this.closeHandler();
      });
  }

  closeHandler() {
    this.slideout(() => {
      this.closeEmitter.emit();
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
      this.closing = false;
      this.visible = false;
      cb();
    }, 1000);
  }
}
