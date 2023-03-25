import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import {
  CategoryListModelInstance,
  CategoryListModel,
  FieldModel,
  IField,
} from 'WebbeeReactNative/src/models';
import { FAB } from 'react-native-paper';
import { Button, Card, Title } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

interface IMenuItem {
  name: string;
}
const fieldMenuItems = [
  { name: 'Text' },
  { name: 'Date' },
  { name: 'Number' },
  { name: 'Checkbox' },
];

const FieldMenu: React.FC<{
  title: string | undefined;
  onChange: (name: IMenuItem) => void;
  items: Array<object> | Array<string>;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  buttonStyle?: any;
}> = observer(({ title, onChange, items, mode = 'outlined', buttonStyle }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const onPressItem = (name: IMenuItem) => {
    setShowDropDown(false);
    onChange(name);
  };

  return (
    <Menu
      visible={showDropDown}
      onDismiss={() => setShowDropDown(false)}
      anchor={
        <Button
          mode={mode}
          style={buttonStyle}
          onPress={() => setShowDropDown(true)}
        >
          {title}
        </Button>
      }
    >
      {items.map((item: any, key: number) => {
        return (
          <Menu.Item
            onPress={() => onPressItem(item)}
            title={item.name}
            key={key}
          />
        );
      })}
    </Menu>
  );
});

const FieldWrapper: React.FC<{ field: FieldModel }> = observer(({ field }) => {
  return (
    <>
      <TextInput
        label={'Field'}
        value={field.name}
        onChangeText={field.setName}
        style={{ flex: 1 }}
      />
      <FieldMenu
        title={field.fieldType}
        onChange={item => field.setFieldType(item.name)}
        items={fieldMenuItems}
        buttonStyle={styles.fieldUpdateButton}
      />
    </>
  );
});

const Categories: React.FC<{ list: CategoryListModel }> = observer(
  ({ list }) => {
    return (
      <>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          {list.emptyCategories && (
            <View style={styles.emptyListWrapper}>
              <Text style={styles.emptyListText}>
                {`No Categories Available\n (Press on + icon)`}
              </Text>
            </View>
          )}

          {list.categories.map((category, key) => {
            return (
              <View style={styles.cardWrapper} key={key}>
                <Card style={styles.categoryCard}>
                  <Card.Content>
                    <Title>{category.name}</Title>
                    <TextInput
                      label="Category Name"
                      value={category.name}
                      onChangeText={category.setName}
                    />

                    {category.fields.map((field: FieldModel, key: number) => {
                      return (
                        <View style={styles.fieldWrapper} key={key}>
                          <FieldWrapper field={field} />
                          <Icon
                            name="close"
                            size={25}
                            style={{ alignSelf: 'center', marginRight: 1 }}
                            onPress={() => category.removeField(field)}
                          />
                        </View>
                      );
                    })}

                    <FieldMenu
                      mode="contained"
                      title={`Titled Field: ${category.titleFieldName}`}
                      items={category.fields}
                      onChange={(field: IField) => {
                        category.setTitleFieldId(field._id ?? '');
                      }}
                      buttonStyle={styles.mt10}
                    />
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={category.addField}>ADD NEW FIELD</Button>
                    <Button
                      style={styles.danger}
                      onPress={() => list.removeCategory(category)}
                    >
                      <Icon name="delete" size={20} color="white" />
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            );
          })}
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={list.addCategory}
          color="white"
        />
      </>
    );
  },
);

const CategoriesScreenWrapper = observer(() => {
  const [list] = useState(() => CategoryListModelInstance);

  return <Categories list={list} />;
});

export default CategoriesScreenWrapper;

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  cardWrapper: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  fieldWrapper: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  fieldUpdateButton: {
    borderRadius: 1,
    height: '100%',
    justifyContent: 'center',
  },
  danger: {
    backgroundColor: 'red',
  },
  categoryCard: {
    marginBottom: 5,
    width: '100%',
  },
  mt10: {
    marginTop: 10,
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
