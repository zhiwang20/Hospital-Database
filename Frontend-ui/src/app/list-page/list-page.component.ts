import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { CreateComponent } from '../dialog/create/create.component';
import { UpdateComponent } from '../dialog/update/update.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit, OnDestroy {

  status = {
    s: 'init',
    m: 'Just Init'
  };

  takeUntilSub: Subject<any> = new Subject();
  pageName: string;
  list: any[] = [];
  listKeys: any;

  constructor(private apiService: ApiService, private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.pipe(takeUntil(this.takeUntilSub))
      .subscribe( resp => {
        const { path } = resp[0];
        if (path) {
          console.log(path);
          this.pageName = path;
          this.fetchList(path);
        }
        console.log(resp);
      });
  }

  fetchList(path) {
    this.apiService.list(path)
      .subscribe(resp => {
        if (resp && Array.isArray(resp)) {
          this.listKeys = Object.keys(resp[0]).reduce((acc, curr) => {
            acc.push({title: curr, key: curr});
            return acc;
          }, []);
          this.list = [...resp];
        }
        console.log(resp);
      });
  }

  createNew() {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {title: this.pageName },
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.ok) {
        this.fetchList(this.pageName);
      }
    });
  }

  editSelected(evt): void {
    if (/user/i.test(this.pageName)) {
      return;
    }
    console.log(evt);
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {title: this.pageName, item: this.list[evt]},
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe( resp => {
      if (resp && resp.ok) {
        this.fetchList(this.pageName);
      }
    })
  }

  ngOnDestroy() {
    this.takeUntilSub.next();
    this.takeUntilSub.complete();
  }

}
