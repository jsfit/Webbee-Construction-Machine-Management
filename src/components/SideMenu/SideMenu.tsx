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
import { useNavigation } from '@react-navigation/core';

const SideMenu = observer(props => {
  const [list] = useState(() => CategoryListModelInstance);
  const [activeLink, setActiveLink] = useState('Dashboard');
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Dashboard'}
        onPress={() => {
          setActiveLink('Dashboard');
          navigation.navigate('Dashboard');
        }}
        style={{
          backgroundColor: activeLink === 'Dashboard' ? '#b1e0f5' : '',
        }}
        {...props}
      />
      {list.categories.map((category, key) => {
        return (
          <DrawerItem
            label={category.name}
            onPress={() => {
              setActiveLink(category._id);

              navigation.navigate('Category', {
                _id: category._id,
                title: category.name,
              });
            }}
            style={{
              backgroundColor: activeLink === category._id ? '#b1e0f5' : '',
            }}
            key={key}
            {...props}
          />
        );
      })}

      <DrawerItem
        label={'Manage Categories'}
        onPress={() => {
          setActiveLink('Main');
          navigation.navigate('Main');
        }}
        style={{
          backgroundColor: activeLink === 'Main' ? '#b1e0f5' : '',
        }}
        {...props}
      />
    </DrawerContentScrollView>
  );
});

export default SideMenu;
