import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation, useRoute } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import DatePicker from 'react-native-date-picker';

const FieldWrapper: React.FC<{
  field: FieldModel;
  item: Item;
}> = observer(({ field, item }) => {
  const [datePicker, setDatePicker] = useState(false);
  let value = item.model[field._id ?? ''] ?? '';

  switch (field.fieldType) {
    case InputTypes.Text:
    case InputTypes.Number:
      return (
        <View style={styles.textWrapper}>
          <Text>{field.name}</Text>
          <TextInput
            keyboardType={
              field.fieldType === InputTypes.Text ? 'default' : 'numeric'
            }
            value={value}
            onChangeText={(value: any) =>
              item.setAttribute(field._id ?? '', value)
            }
          />
        </View>
      );

    case InputTypes.Checkbox:
      return (
        <View style={styles.checkbox}>
          <ToggleSwitch
            isOn={!!value}
            onColor="green"
            offColor="grey"
            label={field.name}
            size="medium"
            onToggle={isOn => item.setAttribute(field._id ?? '', isOn)}
            labelStyle={{ marginLeft: 0 }}
          />
        </View>
      );

    case InputTypes.Date:
      return (
        <View style={styles.dateWrapper}>
          <Text>{field.name}</Text>
          <TouchableOpacity
            onPress={() => {
              setDatePicker(true);
            }}
            style={styles.selectDate}
          >
            <Text>{value || `Select Date`}</Text>
          </TouchableOpacity>
          <DatePicker
            mode="date"
            date={value ? new Date(value) : new Date()}
            modal
            open={datePicker}
            onConfirm={date => {
              item.setAttribute(field._id ?? '', date.toDateString());
              setDatePicker(false);
            }}
            onCancel={() => setDatePicker(false)}
          />
        </View>
      );

    default:
      return <Text>No Component</Text>;
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
                  <Icon
                    onPress={() => category.removeItem(item)}
                    name="delete"
                    size={20}
                    color={'red'}
                    style={{
                      alignSelf: 'flex-end',
                      paddingRight: 10,
                      paddingTop: 10,
                    }}
                  />
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
  checkbox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateWrapper: {
    flex: 1,
    marginTop: 10,
  },
  selectDate: {
    width: '100%',
    backgroundColor: '#e7e0ec',
    height: 50,
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
  },
  textWrapper: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 5,
  },
});
