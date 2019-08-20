import React from 'react';
import { Button } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';
 
class login_new extends React.Component {
    state = {
        email: '',
    }
 
    handleChange = (email) => {
        this.setState({ email });
    }
 
    submit = () => {
        // your submit logical
    }
 
    handleSubmit = () => {
        this.refs.form.submit();
    }
 
    render() {
        const { email } = this.state;
        return (
            <Form
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    name="email"
                    label="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email invalid']}
                    placeholder="Your email"
                    type="text"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={this.handleChange}
                />
                 <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                />
            </Form>
        );
    }
}
export default login_new