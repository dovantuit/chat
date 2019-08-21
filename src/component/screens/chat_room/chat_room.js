




import React from 'react';
import { SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import Firebase from 'firebase'

class Backend {
    uid = '';
    messagesRef = null;
    // initialize Firebase Backend
    constructor() {
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
        // check sign in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
                this.setUserName(user.name);
               
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    
                });
            }
        });

    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }
    setUserName(value) {
        this.name = value;
    }
    getUserName() {
        return this.uid.name;
    }

    S4 = () => {
        return (((1 + Math.random() * Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    // retrieve the messages from the Backend
    // loadMessages(callback) {
    //     this.messagesRef = firebase.database().ref(`messages/${this.props.navigation.state.params.room_id}`);
    //     ///
    //     // console.log(firebase.database());
    //     ///
    //     // this.messagesRef.off();
    //     const onReceive = (data) => {
    //         const message = data.val();
    //         callback({
    //             _id: data.key,
    //             text: message.text,
    //             createdAt: new Date(message.createdAt),
    //             user: {
    //                 _id: message.user._id,
    //                 name: message.user.name,
    //             },
    //         });
    //     };
    //     this.messagesRef.limitToLast(20).on('child_added', onReceive);
    // }
    // send the message to the Backend
    sendMessage(message, id) {
        // for (let i = 0; i < message.length; i++) {
            this.messagesRef = firebase.database().ref(`messages/${id}`);
            this.messagesRef.push({
                // id: this.S4() + this.S4(),
                id: id,
                user_id: this.getUid(),
                is_read: false,
                text: message[0].text,
                user: message[0].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        // }
    }
    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}
const Backend_chat_rom = new Backend();

export default class chat_room extends React.Component {
    state = {
        messages: [],
        name: 'Tom Watanabe',
        room_id: '',
    };

    componentWillMount() {
        // console.log('props name:')
        // console.log(this.props.navigation.state.params.name)
    };

     componentDidMount() {
        this.setState({ room_id: this.props.navigation.state.params.room_id })
        Firebase.database().ref(`messages/${this.props.navigation.state.params.room_id}`).on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    messages: Object.values(snapshot.val(), () => console.log(this.state.messages))
                });
            }
        });
    };

    componentWillUnmount() {
        Backend_chat_rom.closeChat();
    };

    S4 = () => {
        return (((1 + Math.random() * Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    render() {
        return (

            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend_chat_rom.sendMessage(message, this.props.navigation.state.params.room_id);
                }}
                // showUserAvatar
                // showAvatarForEveryMessage
                user={{
                    _id: Backend_chat_rom.getUid(),
                    // name: this.props.navigation.state.params.name,
                    name: this.state.name,

                }}
                onPressAvatar={() => alert(`name = ${Backend_chat_rom.getUserName()}`)}

            />
        );
    };

}