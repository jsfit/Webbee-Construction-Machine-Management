import {
  makeAutoObservable,
  autorun,
  toJS,
  makeObservable,
  observable,
} from 'mobx';
import { FieldModel, IField } from './Fields';
import { v4 as uuidv4 } from 'uuid';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  constructor(category?: CategoryModel) {
    this._id = category?._id ?? uuidv4();
    this.name = category?.name ?? 'New Category';
    this.fields = category?.fields ?? [];

    if (category?.fields?.length) {
      this.fields = category.fields.map(
        (field: FieldModel) => new FieldModel(field),
      );
    }

    this.addField();
    makeAutoObservable(this);
  }

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

  removeField = (field: FieldModel) => {
    this.fields = this.fields.filter(({ _id }: FieldModel) => field._id != _id);
  };
}

export class CategoryListModel implements ICategoryList {
  _id: string = '';
  categories: CategoryModel[] = [];

  constructor() {
    this._id = uuidv4();

    makePersistable(
      this,
      {
        name: 'CategoryListModel',

        properties: [
          {
            key: 'categories',
            serialize: value => {
              return value;
            },
            deserialize: value => {
              return value.map(
                (category: CategoryModel) => new CategoryModel(category),
              );
            },
          },
        ],
        storage: AsyncStorage,
      },

      { delay: 100, fireImmediately: false },
    );
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

const CategoryListModelInstance = new CategoryListModel();
export { CategoryListModelInstance };
