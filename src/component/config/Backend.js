import firebase from 'firebase';

class Backend {
    uid = '';
    messagesRef = null;
    // initialize Firebase Backend
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyAQpkf7fbY5Pie65N8I83imKp6yVAMPUWg",
            authDomain: "unitchat-37201.firebaseapp.com",
            databaseURL: "https://unitchat-37201.firebaseio.com",
            projectId: "unitchat-37201",
            storageBucket: "",
            messagingSenderId: "701005589704",
            appId: "1:701005589704:web:164635bca576ee06"
        });
        // check sign in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
                this.setUserEmail(user.email);

                // console.log('>>> user info back from firebase')
                // console.log(user)
                // alert('sign in already')
            } else {
                // firebase.auth().signInAnonymously().catch((error) => {
                // // alert('sign in anonymous')
                // //     alert(error.message);
                // });
                // alert('chua dang nhap')
            }
        });
        // sign out
        // var auth = firebase.auth();
        // firebase.auth().signOut().then(function () {
        //     // Sign-out successful.
        //     console.log('signOUt')
        //     alert('sign out')
        // }).catch(function (error) {
        //     // An error happened.
        // });


    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }
    //user emai
    setUserEmail(value) {
        this.email = value;
    }
    getUserEmail() {
        return this.email;
    }
    S4 = () => {
        return (((1 + Math.random() * Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages/all');
        ///
        // console.log(firebase.database());
        ///
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }
    // send the message to the Backend
    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                id: this.S4() + this.S4(),
                user_id: this.getUid(),
                is_read: false,
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }
    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
    // sign out
    sign_out = () => {
        var auth = firebase.auth();
        auth.signOut().then(function () {
            // Sign-out successful.
            console.log('signOUt already!')
            // alert(Backend.getUserEmail())
        }).catch(function (error) {
            // An error happened.
        });
    }

}

export default new Backend();
