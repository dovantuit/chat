import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import App from './App';
import { name as appName } from './app.json';
import store from './store'
import ContactForm from './src/component/redux/contactForm'
// export default class App extends Compon

AppRegistry.registerComponent(appName, () => App);
