import {Component, OnInit} from '@angular/core';
import {TransferItem} from './components/transfer-panel/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  list: TransferItem[] = [];

  ngOnInit() {
    this.setList();
  }

  setList(): void {
    this.list = [];
    const prefix = 'item' + Date.now().toString().slice(-3);
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: prefix + ' ' + i,
        value: `${prefix}${i+1}`,
        checked: i % 6 === 0
      });
    }
  }

  onChanged(selectedItems: TransferItem[]) {
    console.log('selectedItems: ', selectedItems);
  }
}
