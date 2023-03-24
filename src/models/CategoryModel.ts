import {
  makeAutoObservable,
  autorun,
  toJS,
  makeObservable,
  observable,
} from 'mobx';
import { IField } from './Fields';
import { v4 as uuidv4 } from 'uuid';

export interface ICategory {
  name: string;
  fields: IField[];
}

export class CategoryModel implements ICategory {
  _id: string = '';
  name: string = '';
  fields: IField[] = [];

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init = () => {
    this._id = uuidv4();
  };
}

export class CategoryListModel {
  categories: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCategory = (category: ICategory) => {
    this.categories.push(new CategoryModel());
  };
}
