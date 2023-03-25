import { makeAutoObservable } from 'mobx';
import { FieldModel } from './Fields';
import { v4 as uuidv4 } from 'uuid';
import { Item } from './ItemModal';
import { ICategory } from './types';

export class CategoryModel implements ICategory {
  _id: string = '';
  name: string = 'New Category';
  titleFieldId: string = '';
  fields: FieldModel[] = [];
  items: Item[] = [];

  constructor(category?: CategoryModel) {
    this._id = category?._id ?? uuidv4();
    this.name = category?.name ?? this.name;
    this.titleFieldId = category?.titleFieldId ?? this.titleFieldId;
    this.fields = category?.fields ?? [];

    if (category?.fields?.length) {
      this.fields = category.fields.map(
        (field: FieldModel) => new FieldModel(field),
      );
    } else {
      this.addField();
    }

    if (category?.items.length) {
      this.items = category?.items.map((item: Item) => new Item(item, this));
    }
    makeAutoObservable(this);
  }

  setName = (name: string) => {
    this.name = name;
  };

  setTitleFieldId = (titleFieldId: string) => {
    this.titleFieldId = titleFieldId;
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

  addItem = () => {
    this.items.unshift(new Item());
  };

  removeItem = (item: Item) => {
    this.items = this.items.filter(_item => _item._id !== item._id);
  };

  get titleFieldName() {
    let field = this.fields.find(field => field._id === this.titleFieldId);
    if (field) {
      return field.name;
    }

    return 'UNNAMED FIELD';
  }
}
