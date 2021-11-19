import React, {Component} from 'react';
import {
    View,
    Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView
} from 'react-native';
import {AuthenLayout} from "../authentification";
import {COLORS, FONTS, icons, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, FormInput} from "../../utils";
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";



const checkIn= ({navigation}) => {
    const [emailError, setEmailError] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [setFirstName] = React.useState("")
    const [setLastName] = React.useState("")
    const [setPhone] = React.useState("")
    const [setCin] = React.useState("")
    const [setRoomSharing] = React.useState("")
    const [state, setState] = React.useState(new Date())
    const [number, onChangeNumber] = React.useState(null);

    return (

        <View
            style={{
                flex: 1,
                /*alignItems: 'center',
                justifyContent: 'center',*/
                backgroundColor: COLORS.white

            }}
        >
            <Icon
                name="arrow-back"
                size={30}
                color={COLORS.black}
                onPress={navigation.goBack}
                style={{
                    paddingTop: 20,
                    paddingHorizontal: 20,
                    position:"relative",
                    left:10
                }}
            />
            <AuthenLayout
                title="Check In"
                subtitle="Please fill in the form with your data"
                titleContainerStyle={{
                    marginTop: 10
                }}
            >


                <ScrollView>
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <FormInput
                        label="Email"
                        keyboardType="Email-address"
                        autoCompleteType="email"
                        onchange={(value)=>{
                            validation.validateEmail(value,setEmailError)
                            setEmail(value)}}
                        errorMsg={emailError}
                        appendComponent={
                            <View
                                style={{
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    source={email === "" ||(email!== "" && emailError ==="")? icons.correct : icons.cancel}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: email === ""? COLORS.gray : (email!== "" && emailError ==="")? COLORS.green : COLORS.red
                                    }}
                                />

                            </View>
                        }
                    />
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>

                    <FormInput
                        label="Phone number"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',
                            justifyContent:'center'

                        }}
                        onchange={(value) =>{
                            setPhone(value)
                        }}
                        appendComponent={
                            <TextInput
                                style={{borderColor:COLORS.transparent }}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder="(+216)      "
                                keyboardType="numeric"
                            />
                        }
                    />
                    <FormInput
                        label="Cin number"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',
                            justifyContent:'center'

                        }}
                        onchange={(value) =>{
                            setCin(value)
                        }}
                        appendComponent={
                            <TextInput
                                style={{borderColor:COLORS.transparent }}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder="      "
                                keyboardType="numeric"
                            />
                        }
                    />
                    </View>


                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <FormInput
                        label="First name"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setFirstName(value)
                        }}
                    />
                    <FormInput
                        label="Last name"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setLastName(value)
                        }}
                    />

                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>

                    <FormInput
                        label="Check in date"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setLastName(value)
                        }}
                    appendComponent={
                        <View >
                        <DatePicker
                            showIcon={true}
                            androidMode="spinner"
                            style={{ paddingVertical:8,}}
                            date={state}
                            mode="date"
                            placeholder="DD/MM/YYYY"
                            format="DD-MM-YYYY"
                            minDate={moment().format('DD-MM-YYYY')}
                            confirmBtnText="Chọn"
                            cancelBtnText="Hủy"
                            customStyles={{
                                dateInput: {
                                    backgroundColor: COLORS.lightGray2,
                                    borderColor: COLORS.transparent

                                },
                            }}
                            onDateChange={(date) => {
                                setState( date );
                            }}
                        />
                        </View>}
                    />
                    <FormInput
                        label="Check out date"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setLastName(value)
                        }}
                        appendComponent={
                            <View >
                                <DatePicker
                                    showIcon={true}
                                    androidMode="spinner"
                                    style={{ paddingVertical:8,}}
                                    date={state}
                                    mode="date"
                                    placeholder="DD/MM/YYYY"
                                    format="DD-MM-YYYY"
                                    minDate={moment().format('DD-MM-YYYY')}
                                    confirmBtnText="Chọn"
                                    cancelBtnText="Hủy"
                                    customStyles={{
                                        dateInput: {
                                            backgroundColor: COLORS.lightGray2,
                                            borderColor: COLORS.transparent,

                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setState( date );
                                    }}
                                />
                            </View>}
                    />
                    </View>
                    <FormInput
                        label="Room shared with"
                        containerStyle={{
                            marginTop: SIZES.radius,
                        }}
                        onchange={(value) =>{
                            setRoomSharing(value)
                        }}
                        />

                    <CustomButton
                        buttonText="Save your informations"
                        buttonContainerStyle={{
                            marginTop:30,
                            paddingVertical:15,
                            borderColor: COLORS.doree,
                            borderWidth:1,
                            borderRadius: 20
                        }}
                        colors={ [COLORS.doree , COLORS.doree1] }
                    />
                </View>
                </ScrollView>
            </AuthenLayout>

        </View>

    )
}

export default checkIn;
