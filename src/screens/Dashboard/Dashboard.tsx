import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import {
  CategoryListModelInstance,
  CategoryListModel,
} from 'WebbeeReactNative/src/models';
import { Button } from 'react-native-paper';
import Category from '../Category/Category';
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC<{ list: CategoryListModel }> = observer(
  ({ list }) => {
    const navigation = useNavigation();
    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
        {list.emptyCategories && (
          <View style={styles.emptyListWrapper}>
            <Text style={styles.emptyListText}>No Categories Available</Text>
            <Button onPress={() => navigation.navigate('Main')} mode="outlined">
              Add Category
            </Button>
          </View>
        )}
        {list.categories.map(category => {
          return (
            <View style={styles.cardWrapper} key={category._id}>
              <View style={styles.cardHeader}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.categoryName}>
                    {category.name} ({category.items.length})
                  </Text>
                  <Button onPress={() => category.addItem()} mode="outlined">
                    Add New Item
                  </Button>
                </View>
              </View>
              <View style={styles.hr} />
              <Category categoryItem={category} fabHide={true} />
            </View>
          );
        })}
      </ScrollView>
    );
  },
);

const DashboardcreenWrapper = observer(() => {
  const [list] = useState(() => CategoryListModelInstance);

  return <Dashboard list={list} />;
});

export default DashboardcreenWrapper;

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 80,
  },
  cardWrapper: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  cardHeader: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
  },
  hr: {
    width: '90%',
    height: 1,
    backgroundColor: 'grey',
    alignSelf: 'center',
  },
  emptyListText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyListWrapper: {
    justifyContent: 'center',
    marginTop: 100,
    alignItems: 'center',
  },
});
