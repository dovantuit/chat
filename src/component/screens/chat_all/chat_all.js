import React from 'react';
import { SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';

import Backend from '../../config/Backend';

export default class Chat extends React.Component {
    state = {
        messages: [],
        name: 'Tom Watanabe'
    };

    componentWillMount() {
        // console.log('props name:')
        // console.log(this.props.navigation.state.params.name)
    };

    componentDidMount() {
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
        
        
    };

    componentWillUnmount() {
        Backend.closeChat();
    };

    S4 = () => {
        return (((1 + Math.random() * Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    render() {
        return (
            
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend.sendMessage(message);
                }}
                showUserAvatar
                // showAvatarForEveryMessage
                user={{
                    _id: Backend.getUid(),
                    // name: this.props.navigation.state.params.name,
                    name: this.state.name,

                }}
                onPressAvatar={() => alert(`name = ${Backend.getUid()}`)}

            />
        );
    };

}