import { CategoryModel } from './CategoryModel';

export interface IField {
  _id?: string;
  name?: string;
  fieldType?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  titleFieldId: string;
  fields: IField[];
}

export interface ICategoryList {
  _id: string;
  categories: CategoryModel[];
}
