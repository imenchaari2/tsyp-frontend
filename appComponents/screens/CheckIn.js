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
import Layout from "../../utils/Layout";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../redux/store";
import { saveUserInfo } from '../redux/profile/profileSlice';



const checkIn= ({navigation}) => {
    const user = useSelector((state) => state.profileSlice.profile.user);

    const [emailError, setEmailError] = React.useState("")
    const [email, setEmail] = React.useState(user.email||"");
    const [FirstName,setFirstName] = React.useState(user.firstName||"");
    const [LastName,setLastName] = React.useState(user.lastName||"");
    const [Phone,setPhone] = React.useState(user.phone||"");
    const [Cin,setCin] = React.useState(user.cin||"");
    const [RoomSharing,setRoomSharing] = React.useState(user.roomSharing||"");
    const [checkinDate, setcheckinDate] = React.useState(new Date(2021,11,20));
    const [checkoutDate, setcheckoutDate] = React.useState(new Date(2021,11,22));

    const dispatch = useAppDispatch();

    return (
        <Layout>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >

            <AuthenLayout
                title="Check In"
                subtitle="Please fill in the form with your data"
                titleContainerStyle={{
                    marginTop: 10,

                }}
            >


                <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <FormInput
                    value={email}
                    editable={false}
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
                        value={Phone}
                        label="Phone number"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',
                            justifyContent:'center'

                        }}
                        placeholder="(+216)      "
                        keyboardType="numeric"
                        onchange={(value) =>{
                            setPhone(value)
                        }}
                                style={{borderColor:COLORS.transparent }}
                                                        
                       
                    />
                    <FormInput
                        value={Cin}
                        label="Cin number"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',
                            justifyContent:'center'

                        }}
                        onchange={(value) =>{
                            setCin(value)
                        }}
                        keyboardType="numeric"
                    />
                    </View>


                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <FormInput
                        value={FirstName}
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
                    value={LastName}
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
                    value={checkinDate}
                        label="Check in date"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%'
                        }}
                        // onchange={(value) =>{
                        //     setcheckinDate(value)
                        // }}
                    appendComponent={
                        <View style={{alignSelf:'center',marginLeft:-12}}>
                        <DatePicker
                        disabled
                            showIcon={true}
                            androidMode="spinner"
                            style={{ paddingVertical:8,}}
                            date={checkinDate}
                            mode="date"
                            placeholder="DD/MM/YYYY"
                            format="DD-MM-YYYY"
                            minDate={moment().format('DD-MM-YYYY')}
                            customStyles={{
                                dateInput: {
                                    backgroundColor: COLORS.light,
                                    borderColor: COLORS.transparent

                                },
                            }}
                            onDateChange={(date) => {
                                setcheckinDate( date );
                            }}
                        />
                        </View>}
                    />
                    <FormInput
                        label="Check out date"
                        containerStyle={{
                            marginTop: SIZES.radius,
                            width:'49%',

                        }}
                        // onchange={(value) =>{
                        //     setLastName(value)
                        // }}
                        appendComponent={
                            <View style={{alignSelf:'center',marginLeft:-12}}>
                                <DatePicker
                                disabled
                                    showIcon={true}
                                    androidMode="spinner"
                                    style={{ paddingVertical:8}}
                                    date={checkoutDate}
                                    mode="date"
                                    placeholder="DD/MM/YYYY"
                                    format="DD-MM-YYYY"
                                    minDate={moment().format('DD-MM-YYYY')}
                                    customStyles={{
                                        dateInput: {
                                            backgroundColor: COLORS.light,
                                            borderColor: COLORS.transparent,

                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setcheckoutDate( date );
                                    }}
                                />
                            </View>}
                    />
                    </View>
                    <FormInput
                    value={RoomSharing}
                        label="Room shared with"
                        containerStyle={{
                            marginTop: SIZES.radius,
                        }}
                        onchange={(value) =>{
                            setRoomSharing(value)
                        }}
                        />

                    <CustomButton
                    disabled={email === "" || emailError !== "" || Phone === "" || Cin === "" || FirstName === "" || LastName === "" || checkinDate === "" || checkoutDate === "" || RoomSharing === ""}
                    onPress={()=>{
                        
                            dispatch(saveUserInfo(email,FirstName,LastName,Phone,Cin,checkinDate,checkoutDate,RoomSharing))
                            navigation.navigate('Home')
                        
                    }}
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
        </Layout>

    )
}

export default checkIn;
