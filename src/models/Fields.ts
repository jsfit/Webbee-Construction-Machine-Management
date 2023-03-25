import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { IField } from './types';

export enum InputTypes {
  Date = 'Date',
  Text = 'Text',
  Number = 'Number',
  Checkbox = 'Checkbox',
}

export class FieldModel implements IField {
  _id: string | undefined = '';
  name: string | undefined = '';
  fieldType: string | undefined = '';

  constructor(field: IField) {
    this._id = field?._id || uuidv4();

    this.name = field.name ?? '';
    this.fieldType = field?.fieldType ?? '';

    makeAutoObservable(this);
  }

  setName = (name: string) => {
    this.name = name;
  };

  setFieldType = (name: string) => {
    this.fieldType = name;
  };
}
