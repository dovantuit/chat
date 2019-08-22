import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input, Label, List, ListItem, Thumbnail, Text } from 'native-base';
// import firebase from 'firebase';
import firebase from 'firebase';
import Backend from '../../config/Backend';
// import { ScrollView } from 'react-native-gesture-handler';

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],

            id_user_trung: "",
            ten_user_trung: "",
            avatar_user_trung: "",
            email_user_trung: "",
            sub_id_user_trung: "",
            name_user_trung: "",
        };
    }

    async componentDidMount() {
        // users
        await firebase.database().ref('user').on("value", snapshot => {
            if (snapshot.val() !== undefined && snapshot.val() !== null) {
                this.setState({
                    users: Object.values(snapshot.val())
                }, () => console.log(Object.values(snapshot.val())));
            }

        });

        const userList = this.state.users;
        const current_user_email = Backend.getUserEmail();

        userList.forEach((each_user) => {
            if (each_user.email == current_user_email) {
                this.setState({
                    id_user_trung: each_user.user_id,
                    ten_user_trung: each_user.name,
                    avatar_user_trung: each_user.avatar,
                    email_user_trung: each_user.email,
                    sub_id_user_trung: each_user.sub_id,
                    name_user_trung: each_user.name,
                })
            }
        });
    }

    dang_xuat = ()=>{
        Backend.sign_out();
        this.props.navigation.navigate("login_redux_form")
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#6455BE' }} >
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Thông tin tài khoản</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ width: '96%', paddingLeft: "4%", }}>
                    <ScrollView >
                        <Image source={{ uri: this.state.avatar_user_trung }} style={{
                             marginLeft: 130,
                            // marginTop: 10,
                            marginBottom: -10,
                            marginVertical: 'auto',
                            height: 120,
                            width: 120,
                            borderRadius: 60,
                        }}
                        />
                        <TouchableOpacity style={{
                            // borderWidth: 1,
                            marginTop: 20,
                            borderRadius: 15, marginVertical: 5,
                            // flexDirection: 'column',
                            // justifyContent: 'space-between',
                            // alignItems: 'center',
                            backgroundColor: 'white',
                            height: 200
                        }}
                            onPress={() => { console.log('hello') }}
                        >
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}
                                >{this.state.name_user_trung}</Text>

                                <Text>{this.state.id_user_trung}</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            // borderWidth: 1,
                            marginTop: 20,
                            borderRadius: 15, marginVertical: 5, width: 150,
                            // flexDirection: 'column',
                            // justifyContent: 'space-between',
                            // alignItems: 'center',
                            backgroundColor: 'white',
                            height: 30
                        }}
                            onPress={() => {
                                Alert.alert('Chú ý!',
                                    `Bạn có muốn đăng xuất không?`,
                                    [
                                        { text: 'Yes', onPress: () => this.dang_xuat()},
                                        { text: 'No', onPress: () => console.log('okie') }
                                    ])
                                // alert('login successful, navigate.');
                            }}
                        >
                            <View style={{ marginLeft: 35, marginTop: 5 }}>
                                <Text>Đăng xuất</Text>
                            </View>


                        </TouchableOpacity>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

export default profile;
