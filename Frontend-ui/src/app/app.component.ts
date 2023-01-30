import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
// import { ApiService } from './api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  openNav = false;
  overlayContent = false;
  displayedColumns = ['devicename', 'online', 'os', 'version'];
  // exampleDatabase = new ExampleDatabase ();
  // devices: ExampleDataSource | null;

  constructor (
    private authService: AuthService, /* private apiService: ApiService, */
  ) { }

  ngOnInit() {
    // this.devices = new ExampleDataSource(this.exampleDatabase);
    this.authService.isLoggedIn$.subscribe( resp => {
      this.openNav = resp;
    });

    // this.apiService.matDrawerZIndex.subscribe( change => {
    //   this.overlayContent = change;
    // });
  }
}

