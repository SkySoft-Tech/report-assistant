import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SideMenuItem } from '../side-menu';

@Component({
  selector: 'rp-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss']
})
export class SideMenuItemComponent implements OnInit {

  @Input() menuItem: SideMenuItem;
  @Output() onSelect = new EventEmitter<SideMenuItem>();

  constructor() { }

  ngOnInit() {
  }

  selectMenuItem(): void {
    this.onSelect.emit(this.menuItem);
  }

}
