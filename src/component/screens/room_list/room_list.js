import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';

import firebase from 'firebase';
import Firebase from 'firebase';

import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';

class room_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomLists: [],
            users: [],
        };
    }

    componentDidMount() {
        // let username = await AsyncStorage.getItem('name');
        // this.setState({ username })
        Firebase.database().ref('roomlists').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    roomLists: Object.values(snapshot.val())
                });
            }

        });
        // users
        Firebase.database().ref('user').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    users: Object.values(snapshot.val())
                }, () => console.log(Object.values(snapshot.val())));
            }

        });
    }

    _renderRoomList = (item) => {
        // var room = item
        // console.log(room)
        // console.log(room.user_id)
        return (
            <TouchableOpacity
                // style={{borderWidth:1}}
                onPress={() => this.props.navigation.navigate("chat_room", {
                    // key: item.key,
                    room_id: item.room_id,
                    room_name: item.room_name,
                    user_id: item.user_id[0].id_guess
                }
                )}>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 10 }}>{item.room_name}</Text>
                </View></TouchableOpacity>

            // <TouchableOpacity onPress={() => this.props.navigation.navigate('Chatdetail'
            // )}>
            //     <View>
            //         <Text>{item.room_name}</Text>
            //     </View>
            // </TouchableOpacity>
        );
    }

    _renderUserList = (user) => {
        var this_user = user
        // console.log(room)
        // console.log(room.user_id)
        return (
            <TouchableOpacity
                onPress={() => { this.taoChatRoom(this_user) }}
            >
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 10 }}>{this_user.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    taoChatRoom = (user) => {
        if (Backend.getUid() === user.user_id.id_guess || Backend.getUid() === user.user_id.id_owner) {
            // console.log(user)
            alert('phong da ton tai')
        }
        else {
            Firebase.database().ref('roomlists').push({
                room_id: this.S4() + this.S4(),
                room_name: !(this.state.room_name === '') ? this.state.roomLists : 'default',

                user_id: [{
                    id_guess: user.user_id,
                    id_owner: Backend.getUid(),
                }]

            });
            alert('da tao phong thanh cong')
        }
        // this.props.navigation.navigate('chat', {
        //     id_room: '',
        //     // name: this.state.name,
        //     // email: this.state.email,
        // });
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>List rooms</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <ScrollView>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            data={this.state.roomLists}
                            renderItem={({ item }, index) => this._renderRoomList(item)}
                        />
                        <FlatList
                            style={{ marginBottom: 1 }}
                            data={this.state.users}
                            renderItem={({ item }, index) => this._renderUserList(item)}
                        />

                    </ScrollView>

                </Content>
            </Container>

        );
    }
}

export default room_list;
