import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
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
  @Input() search = false;
  leftData: TransferItem[] = [];
  rightData: TransferItem[] = [];

  leftShowList: TransferItem[] = [];
  rightShowList: TransferItem[] = [];

  @Input() customTpl!: TemplateRef<any>;

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
          this.leftShowList.push(<TransferItem>item);
        } else {
          item.direction = 'right';
          this.rightData.push(<TransferItem>item);
          this.rightShowList.push(<TransferItem>item);
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
    this[direction + 'ShowList'][index].checked = !this[direction + 'ShowList'][index].checked;
    // @ts-ignore
    this[direction + 'ShowList'] = this[direction + 'ShowList'].slice();
  }

  dropTo(direction: Direction) {
    if (direction === 'left') {
      this.fromTo('right', 'left');
    } else {
      this.fromTo('left', 'right')
    }
  }

  private fromTo(from: Direction, to: Direction) {
    // @ts-ignore
    const moveList: TransferItem[] = cloneDeep(this[from + 'ShowList'])
      .filter((item: any) => item.checked)
      .map((item: any) => {
        item.checked = false;
        return item;
    });
    console.log(moveList);
    // @ts-ignore
    this[to + 'ShowList'] = this[to + 'ShowList'].concat(moveList);
    // @ts-ignore
    this[from + 'ShowList']  = this[from + 'ShowList'].filter(item => !item.checked)

    // change orignal data
    // @ts-ignore
    this[to + 'Data'] = this[to + 'Data'].concat(moveList);
    // @ts-ignore
    this[from + 'Data']  = this[from + 'Data'].filter(item => {
      return moveList.findIndex(mItem  => mItem.key === item.key) === -1;
    })
  }

  onFiltered(value: string, direction: Direction)  {
    // @ts-ignore
    this[direction + 'ShowList'] = this[direction + 'Data'].filter(item => item.value.includes(value))
  }
}
