import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import chat_all from '../chat_all/chat_all';
import room_list from '../room_list/room_list';

export default createMaterialBottomTabNavigator(
    {
        Home: {
            screen: chat_all,
            navigationOptions: {
                tabBarLabel: 'chat all',
                tabBarColor: 'blue',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={Platform.OS === 'ios' ? (focused ? 'ios-home' : 'ios-home-outline') : 'md-home'} style={{ color: tintColor }} />
                )
            }
        },

        Settings: {
            screen: room_list,
            navigationOptions: {
                tabBarLabel: 'list rooms',
                tabBarColor: 'blue',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={Platform.OS === 'ios' ? (focused ? 'ios-settings' : 'ios-settings-outline') : 'md-settings'} style={{ color: tintColor }} />
                )
            }
        }
    },
    {
        shifting: true,
        activeTintColor: 'white',
        inactiveTintColor: '#ddd',
        barStyle: {
            height: 55
        }
    }
);