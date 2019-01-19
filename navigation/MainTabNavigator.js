import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import RealActivitiesScreen from '../screens/RealActivitiesScreen';
import MedicalScreen from '../screens/MedicalScreen';
import InfoScreen from '../screens/InfoScreen';
import RememberScreen from '../screens/RememberScreen';

const ActivitiesStack = createStackNavigator({
  Activities: RealActivitiesScreen,
});

ActivitiesStack.navigationOptions = {
  tabBarLabel: 'Activities',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MedicalStack = createStackNavigator({
  Medical: MedicalScreen,
});

MedicalStack.navigationOptions = {
  tabBarLabel: 'Medical',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const RememberStack = createStackNavigator({
  Remember: RememberScreen,
});
RememberStack.navigationOptions ={
  tabBarLabel: 'Remember',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  ActivitiesStack: ActivitiesStack,
  MedicalStack: MedicalStack,
  InfoStack: InfoStack,
  RememberStack: RememberStack,
});
