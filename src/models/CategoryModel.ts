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
  _id: string;
  name: string;
  fields: IField[];
}

export class CategoryModel implements ICategory {
  _id: string = '';
  name: string = '';
  fields: IField[] = [];
  items: IField[][] = [];

  constructor() {
    this._id = uuidv4();

    this.init();
    makeAutoObservable(this);
  }

  init = () => {};

  setName = (name: string) => {
    this.name = name;
  };

  addItem = () => {
    this.items.push(this.fields);
  };
}

export class CategoryListModel {
  _id: string = '';
  categories: ICategory[] = [];

  constructor() {
    this._id = uuidv4();
    makeAutoObservable(this);
  }

  addCategory = () => {
    this.categories.push(new CategoryModel());
  };

  removeCategory = (category: ICategory) => {
    this.categories = this.categories.filter(
      (_category: ICategory) => _category._id != category._id,
    );
  };
}
