import {
  makeAutoObservable,
  autorun,
  toJS,
  makeObservable,
  observable,
} from 'mobx';

export enum InputTypes {
  Date = 'Date',
  Text = 'Text',
  Number = 'Number',
  Checknox = 'Checknox',
}

export interface IField {
  name?: string;
  fieldType?: string;
}

export class FieldModel implements IField {
  name: string | undefined = '';
  fieldType: string | undefined = '';

  constructor(field: IField) {
    this.name = field.name;
    this.fieldType = field.fieldType;
    this.init();

    makeAutoObservable(this);
  }

  setName = (name: string) => {
    this.name = name;
  };

  init = () => {};
}
