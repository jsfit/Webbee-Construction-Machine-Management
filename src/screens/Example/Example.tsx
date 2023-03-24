import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { changeTheme, ThemeState } from '../../store/theme';

const Example = () => {
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
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.colCenter,
        Layout.scrollSpaceBetween,
      ]}
    >
      <View
        style={[
          Layout.fill,
          Layout.justifyContentBetween,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
        ]}
      >
        <TouchableOpacity
          style={[Common.button.circle, Gutters.regularBMargin]}
          onPress={() => onChangeTheme({ darkMode: !isDark })}
        >
          <Image
            source={Images.icons.colors}
            style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Example;
