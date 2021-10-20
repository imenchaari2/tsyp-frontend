import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {AuthenLayout} from "../authentification";
import {COLORS, FONTS, SIZES} from "../../constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {CustomButton, TextButton} from "../../utils";


const Authentification= () => {
    const [timer, setTimer] = React.useState(60)
    React.useEffect(()=>{
        let intervall = setInterval(()=>{
            setTimer(prevTimer =>{
                if(prevTimer>0){
                    return prevTimer -1
                }else{
                    return prevTimer
                }
            })
        },200)
    },[])
    return (
        <AuthenLayout
            title=" Authentification"
            subtitle="An Authentification code has been sent to your email"
            titleContainerStyle={{
                marginTop: SIZES.padding*2
            }}
        >
        <View
        style={{
            flex:1,
            marginTop: SIZES.padding*2
        }}>
            <OTPInputView
                pinCount={4}
                style={{
                    width: "97%",
                    height: 50
                }}
                codeInputFieldStyle={{
                    width:70,
                    height:65,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    color: COLORS.black,
                    ...FONTS.h3
                }}
                onCodeFilled={(code)=>{
                    console.log(code)
                }}
            />
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    marginTop: SIZES.padding*2
                }}
            >
                <Text style={{
                    color: COLORS.darkGray, ...FONTS.body3
                }}>Didn't receive code yet ? </Text>
                <CustomButton
                    buttonText={`Resend(${timer}s)`}
                    disabled={timer !== 0}
                    buttonContainerStyle={{
                        marginHorizontal:8,
                    }}
                    colors={ []}
                    onPress={()=> setTimer(60)}
                    /* onPress={() => navigation.goBack()}*/

                />
            </View>
        </View>

            <View>
                <CustomButton
                    buttonText="Continue"
                    buttonContainerStyle={{
                        marginTop:30,
                        marginHorizontal:8,
                        paddingVertical:15,
                        borderColor: COLORS.doree,
                        borderWidth:1,
                        borderRadius: 20
                    }}
                    colors={ [COLORS.doree , COLORS.doree1]}
                   /* onPress={() => navigation.goBack()}*/

                />
            </View>
            <View
                style={{
                    marginTop: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color:COLORS.blue,
                        fontSize:11
                    }}
                >
                    By Signing up you agree to our terms and conditions
                </Text>
            </View>
        </AuthenLayout>
    )
}

export default Authentification;
