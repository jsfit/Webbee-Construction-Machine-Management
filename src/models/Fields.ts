import {
  makeAutoObservable,
  autorun,
  toJS,
  makeObservable,
  observable,
} from 'mobx';

export interface IField {
  name: string;
  fieldType: string;
  fieldTitle: string;
  value: Date | string | number | Boolean;
}

export class FieldModel implements IField {
  name: string = '';
  fieldType: string = '';
  fieldTitle: string = '';
  value: Date | string | number | Boolean = '';

  constructor(field: IField) {
    this.init();
    makeAutoObservable(this);
  }

  init = () => {};
}
