import React, { Component } from 'react'
import { Field, reduxForm, touch } from 'redux-form'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from 'firebase';
import Firebase from 'firebase';
import Backend from '../../component/config/Backend';

class FirebaseSvc {
    login = async (user, success_callback, failed_callback) => {
        console.log('login')
        Alert('login')
        // alert('login')
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }
}
const firebaseSvc = new FirebaseSvc();

// validation
const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = `Require!`
    }
    else if (!values.username.length > 20) {
        errors.username = `Name less than 20 letters`
    }

    if (!values.email) {
        errors.email = 'Require!'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    return errors
}

const renderField = ({ label, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (<View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>

        <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
        <TextInput style={{ borderColor: 'steeblue', borderWidth: 1, height: 37, width: 220, padding: 5, }}
            keyboardType={keyboardType} onChangeText={onChange} {...restInput}>

        </TextInput>

        {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
            (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))
        }
    </View>
    );
};

const submit = values => {
    alert(`validtion success. value = ~${JSON.stringify(values)}`)
}
// const ContactComponent = props => {
//     const { handleSubmit } = props;
//     return (
//         <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'flex-start' }} >
//             <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 40, alignContent: 'center', }} >LOGIN</Text>
//             <Field name="username" keyboardType="default" label="Username:" component={renderField} />
//             <Field name="email" d keyboardType="email-address" label="Email:" component={renderField} />
//             <TouchableOpacity onPress={handleSubmit(submit)} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'lightblue' }} >
//                 <Text style={{
//                     backgroundColor: 'steeblue', color: 'white', fontSize: 16,
//                     height: 37, width: 200, textAlign: 'center', padding: 10,
//                 }}>Login</Text>
//             </TouchableOpacity>

//         </View>
//     )
// }

class ContactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: 'admin@gmail.com',
            password: '123456',
            name: "",
        };
    }

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onChangeUserName = name => this.setState({ name });

    onPressLogin = async () => {
        // console.log('login')
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: (this.state.name === "") ? 'default' : this.state.name,
        };
        firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
    }

    taoUser = (user) => {
        // check trùng usesr
        // var trung = 0;
        //  this.state.users.map(that_user => {
        //     if (that_user.email === user.email) {
        //         trung += 1
        //     }
        // })
        // if (trung = 0) {

        firebase.database().ref('user').push({
            email: user.email,
            user_id: Backend.getUid(),
            name: this.state.name,
            avatar: 'https://placeimg.com/140/140/any',
            sub_id: Backend.S4() + Backend.S4(),

        });
        // }

        ///

        // alert(user.email)
    }

    loginSuccess = () => {
        /// --- get user information
        var user = firebase.auth().currentUser;
        if (user) {

            // User is signed in.
            if (user != null) {

                this.taoUser(user);
                email = user.email;
                uid = user.uid;
                name = user.name;
                // alert(uid)
            }
        } else {
            // No user is signed in.
        }
        ///

        // Alert.alert('Notice!',
        //     `Successed login under ${this.state.email},\n you are in chat now`,
        //     [
        //         { text: 'Okie Great', onPress: () => console.log('okie') }
        //     ])
        // alert('login successful, navigate.');
        this.props.navigation.navigate('menu', {
            uid: Backend.getUid(),
            name: this.state.name,
            email: this.state.email,
            user: user.name
        });
    };

    loginFailed = () => {
        alert('Login failure. Please tried again.');
    };

    componentWillMount() {
        if (!firebase.apps.length) { // avoid re-build firebase
            var config = {
                apiKey: "AIzaSyAQpkf7fbY5Pie65N8I83imKp6yVAMPUWg",
                authDomain: "unitchat-37201.firebaseapp.com",
                databaseURL: "https://unitchat-37201.firebaseio.com",
                projectId: "unitchat-37201",
                storageBucket: "",
                messagingSenderId: "701005589704",
                appId: "1:701005589704:web:164635bca576ee06"
            };
            firebase.initializeApp(config);
        }
        firebase.database().ref('user').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    users: Object.values(snapshot.val())
                }, () => console.log(this.state.users));
            }
        });

    };

    componentDidMount() {
        // let username = await AsyncStorage.getItem('name');
        // this.setState({ username })
        firebase.database().ref('user').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    users: Object.values(snapshot.val())
                }, () => console.log(this.state.users));
            }
        });
        console.log('okie')
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'flex-start' }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 40, alignContent: 'center', }} >LOGIN</Text>
                <Field name="username" keyboardType="default" label="Username:" component={renderField} />
                <Field name="email" d keyboardType="email-address" label="Email:" component={renderField} />
                <TouchableOpacity onPress={()=>this.onPressLogin()} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'lightblue' }} >
                    <Text style={{
                        backgroundColor: 'steeblue', color: 'white', fontSize: 16,
                        height: 37, width: 200, textAlign: 'center', padding: 10,
                    }}>Login</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const ContactForm = reduxForm({
    form: 'contact', // a unit name for only this form
    validate,
})(ContactComponent)
export default ContactForm




// class ContactComponent extends Component{
//     render(){
//         const { handelSubmit} = this.props;
//         return (
//             <View></View>
//         )
//     }
// }