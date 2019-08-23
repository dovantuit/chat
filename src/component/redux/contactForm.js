import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from 'firebase';
import Backend from '../../component/config/Backend';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import { thisExpression } from '@babel/types';

// validation
const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = `Require!`
    }
    else if (!values.password.length > 5) {
        errors.password = `pass more than 5 letters`
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
        <TextInput style={{ borderColor: 'steeblue', borderWidth: 1, height: 37, width: 220, padding: 5, borderRadius: 5 }}
            keyboardType={keyboardType} onChangeText={onChange} {...restInput}>

        </TextInput>

        {touched && ((error && <Text style={{ color: 'red', marginLeft: 10, }}>{error}</Text>) ||
            (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))
        }
    </View>
    );
};

class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            u_id: [],
            email: '',
            password: '',
            name: "",
            // test
            user_sql: []
        };
    }

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onChangeUserName = name => this.setState({ name });

    login = async (user) => {

        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() => { this.loginSuccess() })
            .catch(() => { this.loginFailed() });
    }

    submit = values => {

        const user = {
            email: values.email,
            password: values.password,
            // name: (this.state.name === "") ? 'default' : this.state.name,
        };
        this.login(user);

    }



    taoUser = (user) => {
        // check trung user
        const list_user = this.state.users;
        const current_user_id = Backend.getUid();
        var dem = 0
        list_user.forEach((element) => {
            if (user.email == element.email) {
                dem++
            }
        });

        console.log('>>>>> lis_user')

        if (dem == 0) {
            // alert('chua ton tai user')
            firebase.database().ref('user').push({
                email: user.email,
                user_id: Backend.getUid(),
                name: user.email,
                avatar: 'https://placeimg.com/140/140/any',
                sub_id: Backend.S4() + Backend.S4(),

            });
        }



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
            }
        } else {
            // No user is signed in.
        }
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


        // firebase.database().ref('user').on("value", snapshot => {
        //     console.log('>>>>>> users []: ')
        //     if (snapshot.val() !== undefined && snapshot.val() !== null) {
        //         this.setState({
        //             users: Object.values(snapshot.val())
        //         }, () => console.log(this.state.users));
        //     }
        // });

    };

    async  loadData_SQL() {

        fetch('http://10.0.5.179:3000/user_read')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({
                    user_sql: responseJson.user,
                }, () => console.log(this.state.user_sql)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async updateData_SQL() {
        // alert('update now')
        var url = 'http://10.0.5.179:3000/user_update';
        var data = {
            id: 18,
            //id_user: '9',
           // avatar: 'http://',
          
            //name: 'do van tu',
            //sub_id: '9',
           // user_id: '9'
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
          
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: 18,
                emai: 'adsadasasdasdasddasb@gmail.com',
           }), // data can be `string` or {object}!
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }


    componentDidMount() {
        //this.loadData_SQL();
        this.updateData_SQL();

        // firebase.database().ref('user').on("value", snapshot => {
        //     if (snapshot.val() !== undefined && snapshot.val() !== null) {
        //         this.setState({
        //             users: Object.values(snapshot.val())
        //         });
        //     }
        // });
        // console.log(this.state)
    }
    // admin@gmail.com
    render() {
        // const { navigate } = this.props.navigation;
        const { handleSubmit } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'flex-start' }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 40, alignContent: 'center', }} >LOGIN</Text>

                <Field name="email" d keyboardType="email-address" label="Email:" component={renderField} />
                <Field name="password" keyboardType="default" label="Password:" component={renderField} />
                <TouchableOpacity onPress={handleSubmit(this.submit.bind(this))} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'lightblue' }} >
                    <Text style={{
                        backgroundColor: 'steeblue', color: 'white', fontSize: 16,
                        height: 37, width: 200, textAlign: 'center', padding: 10,
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('sign_up')} style={{ borderRadius: 10, margin: 10, alignItems: 'center', backgroundColor: 'lightblue' }} >
                    <Text style={{
                        backgroundColor: 'steeblue', color: 'white', fontSize: 16,
                        height: 37, width: 200, textAlign: 'center', padding: 10,
                    }}>Sign up</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const ContactForm = reduxForm({
    form: 'contact', // a unit name for only this form
    validate,
})(ContactComponent // class
)

function mapStateToProps(state) {
    return {
    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        initialize,
    }, dispatch);
}

// export default ContactForm
// export default withNavigation(ChartStatePenetrationItem);
export default withNavigation(ContactForm);