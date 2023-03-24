import {
  makeAutoObservable,
  autorun,
  toJS,
  makeObservable,
  observable,
} from 'mobx';
import { FieldModel, IField } from './Fields';
import { v4 as uuidv4 } from 'uuid';

export interface ICategory {
  _id: string;
  name: string;
  fields: IField[];
}
export interface ICategoryList {
  _id: string;
  categories: ICategory[];
}

export class CategoryModel implements ICategory {
  _id: string = '';
  name: string = 'New Category';
  fields: FieldModel[] = [];
  items: FieldModel[][] = [];

  constructor() {
    this._id = uuidv4();
    this.addField();
    makeAutoObservable(this);
  }

  init = () => {};

  setName = (name: string) => {
    this.name = name;
  };

  addField = () => {
    this.fields.push(
      new FieldModel({
        fieldType: 'Text',
      }),
    );
  };
}

export class CategoryListModel implements ICategoryList {
  _id: string = '';
  categories: CategoryModel[] = [];

  constructor() {
    this._id = uuidv4();
    makeAutoObservable(this);
  }

  addCategory = () => {
    this.categories.unshift(new CategoryModel());
  };

  removeCategory = (category: ICategory) => {
    this.categories = this.categories.filter(
      (_category: ICategory) => _category._id != category._id,
    );
  };
}
