import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {TransferItem} from './types';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPanelComponent implements OnInit, OnChanges {

  // keep the list as pure meta data, so I will copy the original to new one: 'showList'
  @Input() list: TransferItem[] = [];
  @Input() showSearch = false;
  selecteds: TransferItem[] = [];
  showList: TransferItem[] = [];
  @Output() changed = new EventEmitter<TransferItem[]>();
  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onInput(event: Event): void {
    const {value} = event.target as HTMLInputElement;
    console.log(value);
    this.showList = this.list.filter(item => item.value.includes(value));
  }

  // only listen the changed 'input' property, here 'list' is input property, so it will load from parent component, so this lifecycle is working
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const {list} = changes;
    if (list) {
      console.log(list.currentValue);

      // shallow copy to the new list
      this.showList = list.currentValue.slice();
      this.selecteds = this.list.filter(item => item.checked);
    }
  }

  /*itemClick(target: TransferItem) {
    console.log(target);

    const index = this.targetIndex(target.key);
    if (index > -1) {
      this.selecteds.splice(index, 1);
    } else {
      this.selecteds.push(target);
    }
    console.log(this.selecteds);
    // emit the list to outside
    this.changed.emit(this.selecteds);
  }*/

  itemClick(index: number) {
    this.select.emit(index);
  }

  targetIndex(key: string): number {
    return this.selecteds.findIndex(item => item.key === key);
  }

}
