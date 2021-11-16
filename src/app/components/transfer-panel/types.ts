
export type Direction = 'left' | 'right';

export interface TransferItem {
  key: string;
  value: string;
  checked: boolean;
  direction?: Direction;
}
