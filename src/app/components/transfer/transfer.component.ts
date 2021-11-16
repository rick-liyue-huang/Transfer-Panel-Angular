import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Direction, TransferItem} from '../transfer-panel/types';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, OnChanges {

  @Input() sourceData: TransferItem[] = [];
  leftData: TransferItem[] = [];
  rightData: TransferItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { sourceData /*, leftData, rightData*/ } = changes;
    if (sourceData && sourceData.currentValue) {
    //   divide the sourceData to two parts
      sourceData.currentValue.forEach((item: Record<any, any>) => {
        if (!item.direction || item.direction === 'left') {
          item.direction  = 'left';
          this.leftData.push(<TransferItem>item);
        } else {
          item.direction = 'right';
          this.rightData.push(<TransferItem>item);
        }
      })
    }
  }

  disableBtn(direction: Direction): boolean {
    const targetData = direction === 'left' ? this.rightData : this.leftData;
    return targetData.findIndex(item  => item.checked) === -1
  }

  onSelect(index: number, direction: Direction) {
    // @ts-ignore
    this[direction + 'Data'][index].checked = !this[direction + 'Data'][index].checked;
    // @ts-ignore
    this[direction + 'Data'] = this[direction + 'Data'].slice();
  }

  dropTo(direction: Direction) {
    if (direction === 'left') {
      this.fromTo('rightData', 'leftData');
    } else {
      this.fromTo('leftData', 'rightData')
    }
  }

  private fromTo(from: 'rightData' | 'leftData', to: 'leftData' | 'rightData') {
    const moveList: TransferItem[] = cloneDeep(this[from])
      .filter(item => item.checked)
      .map(item => {
        item.checked = false;
        return item;
    });
    console.log(moveList);
    this[to] = this[to].concat(moveList);
    this[from]  = this[from].filter(item => !item.checked)
  }
}
