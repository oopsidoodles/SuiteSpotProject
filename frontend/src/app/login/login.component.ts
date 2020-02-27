import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {AuthService} from '../api/client/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() attemptedLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  showAlert = false;
  opening = false;
  closing = false;
  visible = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.slidein();
  }

  submitClickHandler(creds) {
    this.authService.veryifyUser(creds.user, creds.pass)
      .subscribe((res) => {
        if (res.result) {
          this.slideout(() => {
            this.attemptedLogin.emit(res.result);
          });
        } else {
          this.showAlert = true;
          this.attemptedLogin.emit(res.result);
        }
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
