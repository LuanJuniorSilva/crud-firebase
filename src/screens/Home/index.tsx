/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Firestore from '../../components/Firestore';
import RealtimeDatabase from '../../components/RealtimeDatabase';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenConfig from '../ScreenConfig';
import TabBarIcon from '../../components/TabBarIcon';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => <TabBarIcon name={route.name} />,
        tabBarActiveBackgroundColor: '#ddd',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Firestore"
        component={Firestore}
        options={{tabBarLabel: 'BD Firestore'}}
      />
      <Tab.Screen
        name="RealtimeDatabase"
        component={RealtimeDatabase}
        options={{tabBarLabel: 'BD Realtime Database'}}
      />
      <Tab.Screen
        name="ScreenConfig"
        component={ScreenConfig}
        options={{tabBarLabel: 'Configuração da Conta'}}
      />
    </Tab.Navigator>
  );
};
