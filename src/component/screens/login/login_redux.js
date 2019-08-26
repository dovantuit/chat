import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

const renderField = ({ label, keyboardType, name }) => {
    return (
        <View style={{ flexDirection: 'row', height: 58, alignItems: 'center', }}>
            <Text>{label}</Text>
            <TextInput keyboardType={keyboardType}></TextInput>
        </View>);
};
const ContactComponent = props => {
    const { handelSubmit } = props;
    return (
        <View>
            <Text>redux-form example</Text>
            <Field keyboardType="default" label="Username:" component={renderField} name="Username" />
            <Field keyboardType="email-address" label="Email:" component={renderField} name="Email" />
            <TouchableOpacity onPress={handelSubmit} >
                <Text>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}
const ContactForm = reduxForm({
    form: 'contact', // a unit name for only this form
})(ContactComponent)
export default ContactForm
