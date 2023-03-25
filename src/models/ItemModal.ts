import { makeAutoObservable, observable, autorun, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from './CategoryModel';

export class Item {
  _id: string = '';
  model = observable.object({});
  titleFieldId: string | undefined;

  constructor(item?: Item, parent?: CategoryModel) {
    this._id = item?._id ?? uuidv4();
    if (item?.model) {
      this.model = observable.object(item?.model);
    }

    autorun(() => {
      runInAction(() => {
        this.titleFieldId = parent?.titleFieldId;
      });
    });

    makeAutoObservable(this);
  }

  setAttribute(attribute: string, value?: any) {
    if (attribute) {
      this.model[attribute] = value;
    }
  }

  isDate = date => {
    return (
      (new Date(date) as unknown as string) != 'Invalid Date' &&
      !isNaN(new Date(date) as unknown as number)
    );
  };

  get titleFieldValue() {
    return this.model[this.titleFieldId as string] ?? 'UNNAMED FIELD';
  }
}
