import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';
import firebase from 'firebase';
import Firebase from 'firebase';

class FirebaseSvc {
    signup = async (user, success_callback, failed_callback) => {
        // console.log('create account')
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }
}
const firebaseSvc = new FirebaseSvc();

class sign_up extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'admin@gmail.com',
            password: '123456',
            name: ""
        };
    }

    onPressSignup = async () => {
        // this.props.navigation.navigate('login')
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        firebaseSvc.signup(user, this.signupSuccess, this.signupFailed);

    };

    signupSuccess = () => {
        // alert('successed signup, please login to get in chat room')
        // console.log('signup successful, navigate to login.');
        Alert.alert('Successed!',
            'please login in order get in chat rooms',
            [
                { text: 'Okay' }
            ])
        this.props.navigation.navigate('login_redux_form', {
            name: this.state.name,
            email: this.state.email,
        });
    };

    signupFailed = () => {
        Alert.alert('Failed!',
            'Signup failure. Please tried again.',
            [
                { text: 'Okay', onPress: () => console.log('okie') }
            ])
    };

    onChangeTextEmail = email => this.setState({ email });

    onChangeTextPassword = password => this.setState({ password });

    onChangeTextName = name => this.setState({ name });
    


    render() {
        return (
            // <SafeAreaView>
            <Container>
                <Header>
                    <Left>
                        {/* <Button transparent> */}
                        {/* <Icon name='arrow-back' /> */}
                        {/* <Text>Back</Text> */}
                        {/* </Button> */}
                    </Left>
                    <Body>
                        <Title>Sign up</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form style={{ paddingBottom: 15 }}>
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(name) => this.onChangeTextName(name)} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(email) => this.onChangeTextEmail(email)} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(password) => this.onChangeTextPassword(password)} />
                        </Item>
                    </Form>
                    <Button full
                        onPress={() => this.onPressSignup()}
                    >
                        <Text>Sign up</Text>
                    </Button>
                </Content>
            </Container>

            // </SafeAreaView>
        );
    }
}

export default sign_up;
