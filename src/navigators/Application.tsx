import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  DrawerActions,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Categories, Category, Dashboard } from '../screens';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import { SideMenu } from '../components';
import Icon from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  const headerLeft = () => {
    return (
      <Icon
        name="menu"
        size={30}
        style={{ marginLeft: 10 }}
        onPress={() => navigationRef?.dispatch?.(DrawerActions.toggleDrawer())}
      />
    );
  };
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Drawer.Navigator
          screenOptions={{ headerShown: true }}
          drawerContent={props => <SideMenu {...props} />}
        >
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerLeft,
            }}
          />
          <Drawer.Screen
            name="Main"
            component={Categories}
            options={{
              title: 'Manage Categories',
              headerLeft,
            }}
          />
          <Drawer.Screen
            name="Category"
            component={Category}
            options={({ route }) => ({
              title: route.params?.title,
              headerLeft,
            })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
