import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text } from 'native-base';

// import firebase from 'firebase';
import firebase from 'firebase';

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
        firebase.database().ref('roomlists').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    roomLists: Object.values(snapshot.val())
                });
            }

        });
        // users
        firebase.database().ref('user').on("value", snapshot => {
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
                    <Text style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 10 }}>{item.room_name}</Text>
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
            <TouchableOpacity style={{ 
                // borderWidth: 1,
                 borderRadius: 15, marginVertical: 5, 
                // flexDirection: 'column',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                backgroundColor: 'white',
                height: 80

            }}
                onPress={() => { this.taoChatRoom(this_user) }}
            >
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between', }}>
                    <Image source={{ uri: this_user.avatar }} style={{
                        marginTop: 10,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        
                    }}
                    />
                   
                </View>
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between',marginLeft: 70,marginTop:-65 }}>
                    
                    <Text style={{
                        // borderWidth: 1, borderRadius: 5,
                        paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 0
                    }}>{this_user.name}</Text>
                </View>
                <View style={{ paddingHorizontal: 15, alignContent: 'space-between',marginLeft: 70,marginTop:-5 }}>
                    
                    <Text style={{
                        fontSize: 11,
                        // borderWidth: 1, borderRadius: 5,
                        paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, marginTop: 0
                    }}>{this_user.sub_id}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    taoChatRoom = (user_khach) => {
        const list_room = this.state.roomLists;
        const current_user = Backend.getUid();
        var dem = 0
        var id_phong_trung = 0
        var ten_phong_trung = ""

        list_room.forEach((element) => {
            if (element.user_id[0].id_owner == current_user && element.user_id[0].id_guess == user_khach.user_id) {
                dem++
                id_phong_trung = element.room_id
                ten_phong_trung = element.room_name
            }
        });


        if (dem > 0) {
            // console.log(user)

            // alert('phong da ton tai')
            this.props.navigation.navigate("chat_room", {
                // key: item.key,
                room_id: id_phong_trung,
                ten_phong: ten_phong_trung,

                // room_name: item.room_name,
                // user_id: item.user_id[0].id_guess
            })

        }
        else {
            var new_room_id = Backend.S4() + Backend.S4()

            firebase.database().ref('roomlists').push({
                room_id: new_room_id,
                room_name: user_khach.name,

                user_id: [{
                    id_guess: user_khach.user_id,
                    id_owner: Backend.getUid(),
                }]

            });
            // alert('da tao phong thanh cong')
        }
        // this.props.navigation.navigate("chat_room", {
        //     // key: item.key,
        //     room_id: new_room_id,
        //     // room_name: item.room_name,
        //     // user_id: item.user_id[0].id_guess
        // })

    }


    render() {
        return (
            <Container style={{backgroundColor:'#6455BE'}} >
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Danh sách bạn bè</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: '96%', paddingLeft: "4%", }}>
                    <ScrollView >
                        {/* <FlatList
                            style={{ marginBottom: 10 }}
                            data={this.state.roomLists}
                            renderItem={({ item }, index) => this._renderRoomList(item)}s
                        /> */}
                        <FlatList
                            style={{ marginBottom: 1 }}
                            data={this.state.users}
                            renderItem={({ item }, index) => this._renderUserList(item)}
                            column={1}
                        />

                    </ScrollView>

                </Content>
            </Container>

        );
    }
}

export default room_list;
