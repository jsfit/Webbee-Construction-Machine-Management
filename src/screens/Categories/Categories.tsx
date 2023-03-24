import React, { useEffect, useState } from 'react';
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
import { CategoryListModel } from 'WebbeeReactNative/src/models/CategoryModel';
import { FAB } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { FieldModel, InputTypes } from 'WebbeeReactNative/src/models/Fields';

const FieldWrapper: React.FC<{ field: FieldModel }> = observer(({ field }) => {
  switch (field.fieldType) {
    case InputTypes.Text:
      return (
        <TextInput
          label={'Field'}
          value={field.name}
          onChangeText={field.setName}
          style={{ flex: 1 }}
        />
      );

    default:
      return <Text>123123</Text>;
  }
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
        <ScrollView>
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

                    {category.fields.map((field: FieldModel) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <FieldWrapper field={field} />
                          <Button
                            mode="outlined"
                            onPress={() => console.log('Pressed')}
                            style={{
                              borderRadius: 1,
                              height: '100%',
                              justifyContent: 'center',
                            }}
                          >
                            {field.fieldType}
                          </Button>
                        </View>
                      );
                    })}
                  </Card.Content>
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
                </Card>
              </View>
            );
          })}
        </ScrollView>
        <FAB style={styles.fab} small icon="plus" onPress={list.addCategory} />
      </>
    );
  },
);

const CategoriesScreenWrapper = observer(() => {
  const [list] = useState(() => new CategoryListModel());

  useEffect(() => {
    list.addCategory();
  }, []);

  return <Categories list={list} />;
});

export default CategoriesScreenWrapper;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  cardWrapper: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
});
