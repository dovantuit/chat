import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import chat_all from '../chat_all/chat_all';
import room_list from '../room_list/room_list';
import profile from '../profile/profile';
// import Icon from 'native-base'

export default createMaterialBottomTabNavigator(
    {
        Roomlist: {
            screen: room_list,
            navigationOptions: {
                tabBarLabel: 'list rooms',
                tabBarColor: '#312974',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={'md-home'} style={{ color: tintColor }} />
                )
            }
        },
        Chat_all: {
            screen: chat_all,
            navigationOptions: {
                tabBarLabel: 'chat all',
                tabBarColor: '#312974',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={'md-contact'} style={{ color: tintColor }} />
                // <Icon type="AntDesign" style={{  color: 'black' }} name="message1" />

                )
            }
        },
        profile_tab: {
            screen: profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarColor: '#312974',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={20} name={'md-contact'} style={{ color: tintColor }} />
                )
            }
        },
    },
    {
        initialRouteName: 'Roomlist', // load this screen first
        shifting: false, // shifting : true -> inactive tab won't show lable
        labeled: true , // show tab label and icon
        activeTintColor: 'white',
        // inactiveTintColor: '#ddd',
        inactiveTintColor: 'white',
        barStyle: {
            height: 55
        }
    }
);