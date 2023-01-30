import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-drawer',
  templateUrl: './side-nav-drawer.component.html',
  styleUrls: ['./side-nav-drawer.component.css']
})
export class SideNavDrawerComponent implements OnInit {
  isCreator = false;
  navList = [
    { g: 'profile', label: 'Profile', link: 'profile', access: 'any'},
    { g: 'doctors', label: 'Doctors', link: 'doctors', access: 'any'},
    { g: 'nurses', label: 'Nurses', link: 'nurses', access: 'any'},
    { g: 'departments', label: 'Departments', link: 'departments', access: 'any'},
    { g: 'wards', label: 'Wards', link: 'wards', access: 'any'},
    { g: 'beds', label: 'Beds', link: 'beds', access: 'any'},
    { g: 'patients', label: 'Patients', link: 'patients', access: 'any'},
    { g: 'operations', label: 'Operations', link: 'operations', access: 'any'},
    { g: 'users', label: 'Users', link: 'users', access: 'any'},
    // { g: 'roles', label: 'Roles', link: 'roles', access: 'creator'},
  ];

  navMediaList = [];

  navDeviceList = [];
  private observeLogin: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.observeLogin = this.authService.isLoggedIn$
      .subscribe(loggedIn => {
        if (loggedIn) {
          const authRole = this.authService.role();
          this.navDeviceList = [...this.navList];
          // this.navDeviceList = this.navList.slice().filter( item => {
          //   return /^any$/.test(item.access) || item.access === authRole;
          // });

          // this.navMediaList = this.mediaList.slice().filter( item => {
          //   return /^any$/.test(item.access) || item.access === authRole;
          // });
          /*comment out below to always hide media section*/
          this.isCreator = authRole === 'creator';
        }
      });
    // console.log(authRole);
  }

  takeHere(routeName: string) {
    this.router.navigate([routeName]);
  }

}
