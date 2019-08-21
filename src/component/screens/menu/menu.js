import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import chat_all from '../chat_all/chat_all';
import room_list from '../room_list/room_list';

export default createMaterialBottomTabNavigator(
    {
        Settings: {
            screen: room_list,
            navigationOptions: {
                tabBarLabel: 'list rooms',
                tabBarColor: '#312974',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={'md-home'} style={{ color: tintColor }} />
                )
            }
        },
        Home: {
            screen: chat_all,
            navigationOptions: {
                tabBarLabel: 'chat all',
                tabBarColor: '#312974',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={'md-settings'} style={{ color: tintColor }} />
                )
            }
        },
    },
    {
        shifting: true,
        activeTintColor: 'white',
        // inactiveTintColor: '#ddd',
        inactiveTintColor: 'white',
        barStyle: {
            height: 55
        }
    }
);