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
} from 'WebbeeReactNative/src/models/CategoryModel';
import { FAB } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { FieldModel, InputTypes } from 'WebbeeReactNative/src/models/Fields';
import { Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

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
// const FieldWrapper: React.FC<{ field: FieldModel }> = observer(({ field }) => {
//   switch (field.fieldType) {
//     case InputTypes.Text:
//     case InputTypes.Number:
//       return (
//         <TextInput
//           keyboardType={
//             field.fieldType === InputTypes.Text ? 'default' : 'numeric'
//           }
//           label={'Field'}
//           value={field.name}
//           onChangeText={field.setName}
//           style={{ flex: 1 }}
//         />
//       );

//     default:
//       return <Text>123123</Text>;
//   }
// });

const FieldWrapper: React.FC<{ field: FieldModel }> = observer(({ field }) => {
  return (
    <>
      <TextInput
        label={'Field'}
        value={field.name}
        onChangeText={field.setName}
        style={{ flex: 1 }}
      />
      <FieldMenu title={field.fieldType} onChange={field.setFieldType} />
    </>
  );
});

const Categories: React.FC<{ list: CategoryListModel }> = observer(
  ({ list }) => {
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
          {/* <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => onChangeTheme({ darkMode: !isDark })}
          >
            <Image
              source={Images.icons.colors}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity> */}
          {list.categories.map((category, key) => {
            return (
              <View style={styles.cardWrapper} key={key}>
                <Card style={[Layout.fullWidth, Layout.mb5]}>
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

const CategoriesScreenWrapper = observer(props => {
  const category = useMemo(
    () => CategoryListModelInstance.getCategoryById(props.route.params._id),
    [props?.route?.params?._id],
  );
  console.log(category?._id, category?.name);
  useEffect(() => {}, []);

  return <Text>asdasd</Text>;
  // return <Categories list={list} />;
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
});
