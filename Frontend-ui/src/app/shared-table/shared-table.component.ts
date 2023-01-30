import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styles: [`
  :host{
    display: flex;
    flex: 1 1 100%;
  }
  table{
    width: 100%;
  }
  `]
})
export class SharedTableComponent implements OnInit {

  tabularData: any[];
  dataKeys: any[];
  displayedColumns: string[];

  btnActions: ITableActionButton[];
  topActions: ITableActionButton[];
  fltActions: ITableActionButton[];

  @Input()
  set actions (actions: any[]) {
    const btnActions = JSON.parse(JSON.stringify(actions));
    this.topActions = btnActions.filter(n => n.position === 'top');
    this.btnActions = btnActions.filter(n => !n.position || n.position === 'per');
  }
  get actions (): any[] {
    return this.btnActions;
  }

  @Input()
  set source (source: any[]) {
    this.tabularData = JSON.parse(JSON.stringify(source));
  }
  get source (): any[] {
    return this.tabularData;
  }
  @Input()
  set sourcekeys (sourcekeys: any[]) {
    this.dataKeys = JSON.parse(JSON.stringify(sourcekeys));
    this.displayedColumns = this.dataKeys.map(n => n.key);
  }
  get sourcekeys (): any[] {
    return this.dataKeys;
  }
  @Output() selected = new EventEmitter<number>();
  @Output() onaction = new EventEmitter<ITableActionEvent>();

  constructor() { }

  ngOnInit() {
  }

  returnVal(ele, key) {
    if (/\./i.test(key)) {
      const keySplit = key.split('.');
      if (keySplit.length === 2) {
        return ele[keySplit[0]][keySplit[1]];
      } else {
        return ele[keySplit[0]];
      }
    } else {
      return ele[key];
    }
  }

  clickItem(idx: number) {
    console.log(idx);
    this.selected.emit(idx);
  }

  sendAction(idx: number) {
    // console.log(idx, 'del');
    this.onaction.emit({
      event: 'del',
      selected: idx
    });
  }

}

export interface ITableActionButton {
  name: string;
  eventName: string;
  position?: string; /* top, float, per */
  color?: string;
  btnType?: string; /* falt, raised, fab, icon */
  icon?: string; /* Icon */
}

export interface ITableActionEvent {
  event: string;
  selected?: number;
}
