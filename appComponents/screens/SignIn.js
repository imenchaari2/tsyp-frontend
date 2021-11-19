import React from 'react';
import {
    View,
    Text, Image, TouchableOpacity
} from 'react-native';
import {AuthenLayout} from "../authentification";
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, CustomSwitch, FormInput, TextButton} from "../../utils";
import Icon from "react-native-vector-icons/MaterialIcons";


const SignIn= ({navigation}) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    const [saveMe, setSaveMe] = React.useState(false)

    function isEnableSignIn(){
        return email !=="" && password!== "" && emailError ===""
    }

    return (
        <View
            style={{
                flex: 1,
                /*alignItems: 'center',
                justifyContent: 'center',*/
                backgroundColor: COLORS.white

            }}
        ><Icon
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
            <AuthenLayout title ="Let's Sign you In"
                          subtitle=" Welcome back you have been missed"
            >
                <View
                    style={{
                        flex:1,
                        marginTop: SIZES.padding*2
                    }}
                >
                    {/*{form input}*/}
                    <FormInput
                    label="Email"
                    keyboardType="email-address"
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
                    <FormInput
                        label="Password"
                        secureTextEntry={!showPass}
                        autoCompleteType="password"
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        onchange={(value)=>{
                            validation.validatePassword(value,setPasswordError)
                            setPassword(value)}}
                        errorMsg={passwordError}
                        appendComponent={
                            <TouchableOpacity
                                style={{
                                    width:40,
                                    alignItems:'flex-end',
                                    justifyContent: 'center',
                                }}
                                onPress={()=> setShowPass(!showPass)}
                            >
                                <Image
                                    source={showPass? icons.eyeClose : icons.eye}
                                    style={{
                                        height:20,
                                        width:20,
                                        tintColor: COLORS.gray
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />

                    {/*{save me & forgot password}*/}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            justifyContent: 'space-between'
                        }}
                    >
                        <CustomSwitch
                         value={saveMe}
                         onchange={(value) => setSaveMe(value)}
                        />
                        <CustomButton
                            buttonText="Forgot Password ?"
                            colors={[COLORS.white]}
                            onPress={() => navigation.navigate("ForgotPassword")}
                        />
                    </View>
                    {/*{sign in}*/}
                    <CustomButton
                        buttonText="Sign In"
                        disabled={!isEnableSignIn()}
                        buttonContainerStyle={{
                            marginTop:30,
                            paddingVertical:15,
                            borderColor: COLORS.doree,
                            borderWidth:1,
                            borderRadius: 20
                        }}
                        colors={ isEnableSignIn()?[COLORS.doree , COLORS.doree1] : [COLORS.transparentPrimray]}
                    />
                    {/*{sign up}*/}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.darkGray,
                                ...FONTS.body3
                            }}
                        >
                            Don't have an account ?
                        </Text>
                        <View style={{marginLeft:10}}>

                            <CustomButton
                                buttonText="Sign Up"
                                colors={ []}
                                onPress={() => navigation.navigate("SignUp")}

                            />
                    </View>

                    </View>
                </View>


            </AuthenLayout>
        </View>
    )
}

export default SignIn;
