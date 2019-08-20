import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import React, { Component } from 'react'
// import App from './App';
import { name as appName } from '../../../../app.json';
import store from '../../../../store'
// import ContactForm from './src/component/redux/contactForm'
import ContactForm from '../../redux/contactForm'

    // const handleSummit = value => {
    //     alert(`submit success with value = ${value}`)
    // };
export default class Login_redux_form extends Component {
   

    render() {
        return (
            <Provider store={store}>
                <ContactForm  />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Login_redux_form);