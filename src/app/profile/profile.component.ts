import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.me()
      .subscribe( user => {
        console.log(user);
        this.user = user;
        if (user.created) {
          const date = new Date(user.created);
          this.user.date = `${MONTHS[date.getMonth()]}, ${date.getDate()}, ${date.getFullYear()}`;
        }
      })
  }

}
