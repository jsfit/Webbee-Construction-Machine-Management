import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { changeTheme, ThemeState } from '../../store/theme';
import { observer } from 'mobx-react-lite';
import {
  CategoryListModelInstance,
  CategoryListModel,
  CategoryModel,
  Item,
} from 'WebbeeReactNative/src/models/CategoryModel';
import { FAB } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { FieldModel, InputTypes } from 'WebbeeReactNative/src/models/Fields';
import { Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Layout } from 'WebbeeReactNative/src/theme';

const fieldMenuItems = ['Text', 'Date', 'Number', 'Checkbox'];

const FieldMenu: React.FC<{
  title: string | undefined;
  onChange: (name: string) => void;
}> = observer(({ title, onChange }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const onPressItem = (name: string) => {
    setShowDropDown(false);
    onChange(name);
  };
  return (
    <Menu
      visible={showDropDown}
      onDismiss={() => setShowDropDown(false)}
      anchor={
        <Button
          mode="outlined"
          style={styles.fieldUpdateButton}
          onPress={() => setShowDropDown(true)}
        >
          {title}
        </Button>
      }
    >
      {fieldMenuItems.map((name, key) => {
        return (
          <Menu.Item onPress={() => onPressItem(name)} title={name} key={key} />
        );
      })}
    </Menu>
  );
});
const FieldWrapper: React.FC<{
  field: FieldModel;
  item: Item;
}> = observer(({ field, item }) => {
  switch (field.fieldType) {
    case InputTypes.Text:
    case InputTypes.Number:
      return (
        <View style={{ flexDirection: 'column', flex: 1, marginVertical: 5 }}>
          <Text>{field.name}</Text>
          <TextInput
            key={item._id}
            keyboardType={
              field.fieldType === InputTypes.Text ? 'default' : 'numeric'
            }
            value={item.model[field._id ?? '']}
            onChangeText={(value: any) =>
              item.setAttribute(field._id ?? '', value)
            }
            style={{ flex: 1 }}
          />
        </View>
      );

    default:
      return <Text>123123</Text>;
  }
});

const Category: React.FC<{ category: CategoryModel }> = observer(
  ({ category }) => {
    const {
      Common,
      Fonts,
      Gutters,
      Layout,
      Images,
      darkMode: isDark,
    } = useTheme();
    const dispatch = useDispatch();

    const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
      dispatch(changeTheme({ theme, darkMode }));
    };

    return (
      <>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <View style={styles.cardWrapper}>
            {category.items.map((item, key) => {
              return (
                <Card style={[Layout.fullWidth, styles.mb10]} key={key}>
                  <Card.Content>
                    {category.fields.map((field: FieldModel, key: number) => {
                      return (
                        <View style={styles.fieldWrapper} key={key}>
                          <FieldWrapper field={field} item={item} />
                        </View>
                      );
                    })}
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={category.addItem}
          color="white"
        />
      </>
    );
  },
);

const CategoryScreenWrapper = observer(() => {
  const route: any = useRoute();

  const category = useMemo(
    () => CategoryListModelInstance.getCategoryById(route.params._id),
    [route?.params?._id],
  );

  if (!category) return null;
  return <Category category={category} />;
});

export default CategoryScreenWrapper;

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
  mb10: {
    marginBottom: 10,
  },
});
