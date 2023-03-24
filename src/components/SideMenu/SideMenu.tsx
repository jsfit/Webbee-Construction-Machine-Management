import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { Text, View } from 'react-native';
import {
  CategoryListModelInstance,
  CategoryListModel,
} from 'WebbeeReactNative/src/models/CategoryModel';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const SideMenu = observer(props => {
  const [list] = useState(() => CategoryListModelInstance);
  return (
    <DrawerContentScrollView {...props}>
      {list.categories.map((category, key) => {
        return (
          <DrawerItem label={category.name} onPress={() => {}} key={key} />
        );
      })}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
});

export default SideMenu;
