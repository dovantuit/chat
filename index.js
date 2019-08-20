import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import React, { Component } from 'react'
import App from './App';
import { name as appName } from './app.json';
import store from './store'
import ContactForm from './src/component/redux/contactForm'

    // const handleSummit = value => {
    //     alert(`submit success with value = ${value}`)
    // };
// export default class App extends Component {

//     render() {
//         return (
//             <Provider store={store}>
//                 <ContactForm />
//             </Provider>
//         )
//     }
// }

AppRegistry.registerComponent(appName, () => App);
