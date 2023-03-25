import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICategory, ICategoryList } from './types';
import { CategoryModel } from './CategoryModel';

export class CategoryListModel implements ICategoryList {
  _id: string = '';
  categories: CategoryModel[] = [];

  constructor() {
    this._id = uuidv4();

    makePersistable(
      this,
      {
        name: 'CategoryListModel',
        stringify: true,
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

  getCategoryById = (_id: string) => {
    return this.categories.find(category => category._id == _id);
  };

  get emptyCategories() {
    return !this.categories.length;
  }
}

const CategoryListModelInstance = new CategoryListModel();
export { CategoryListModelInstance };
