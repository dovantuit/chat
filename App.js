import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import login from './src/component/screens/login/login';
import sign_up from './src/component/screens/sign_up/sign_up';
import menu from './src/component/screens/menu/menu';
import room_list from './src/component/screens/room_list/room_list';
import chat_room from './src/component/screens/chat_room/chat_room';
import chat_all from './src/component/screens/chat_all/chat_all';
import login_redux from './src/component/screens/login/login_redux';
import login_redux_form from './src/component/screens/login/login_redux_form';
import login_new from './src/component/screens/login/login_new';


console.disableYellowBox = true;

export default createAppContainer(createSwitchNavigator(
  {
    sign_up: sign_up,
    login: login,
    menu: menu,
    room_list: room_list,
    chat_room: chat_room,
    chat_all: chat_all,
    login_redux: login_redux,
    login_redux_form: login_redux_form,
    login_new: login_new

  },
  {
    initialRouteName: 'login_redux_form',

  }
));