import React, {Component} from 'react';
import {
    View,
    Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, FormInput} from "../../utils";
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import {AuthenLayout} from "../authentification";
import Icon from "react-native-vector-icons/MaterialIcons";



const ProfileContent= ({navigation}) =>{
    const [emailError, setEmailError] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [setOccupation] = React.useState("")
    const [setFullName] = React.useState("")
    const [setStudentBranch] = React.useState("")
    const [setPhone] = React.useState("")
    const [setId] = React.useState("")
    const [setRoom] = React.useState("")
    const [setHotel] = React.useState("")
    const [setRoomSharing] = React.useState("")
    const [number, onChangeNumber] = React.useState(null);

    return (

        <View
            style={{
                flex: 1,
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
                title="Profile Content"
                subtitle="Please fill in the form with your data"
                titleContainerStyle={{
                    marginTop: SIZES.radius
                }}
            >

                <ScrollView>
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <FormInput
                        label="Full Name"
                        containerStyle={{
                            marginTop: SIZES.radius,
                        }}
                        onchange={(value) =>{
                            setFullName(value)
                        }}
                    />
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
                                onChangeText={onChangeNumber }
                                value={number}
                                placeholder="(+216)      "
                                keyboardType="numeric"
                            />
                        }
                    />
                    <FormInput
                        label="ID number"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',
                            justifyContent:'center'

                        }}
                        onchange={(value) =>{
                            setId(value)
                        }}
                        appendComponent={
                            <TextInput
                                style={{borderColor:COLORS.transparent }}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder="            "
                                keyboardType="numeric"

                            />
                        }
                    />
                    </View>


                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <FormInput
                        label="Student Branch"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setStudentBranch(value)
                        }}
                    />
                    <FormInput
                        label="Occupation"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        onchange={(value) =>{
                            setOccupation(value)
                        }}
                    />

                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <FormInput
                            label="Hotel"
                            containerStyle={{
                                marginTop: SIZES.radius,
                                width:'49%'
                            }}
                            onchange={(value) =>{
                                setHotel(value)
                            }}
                        />
                        <FormInput
                            label="Room number"
                            containerStyle={{
                                marginTop: SIZES.radius,
                                width:'49%',
                                justifyContent:'center'

                            }}
                            onchange={(value) =>{
                                setRoom(value)
                            }}
                            appendComponent={
                                <TextInput
                                    style={{borderColor:COLORS.transparent }}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    keyboardType="numeric"
                                />
                            }
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

export default ProfileContent;
