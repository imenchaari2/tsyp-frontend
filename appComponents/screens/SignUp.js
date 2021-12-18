import React from 'react';
import {
    View,
    Text, Image, TouchableOpacity
} from 'react-native';
import {AuthenLayout} from "../authentification";
import {COLORS, FONTS, icons, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, FormInput} from "../../utils";
import Icon from "react-native-vector-icons/MaterialIcons";


const SignUp= ({navigation}) => {
    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [usernameError, setUsernameError] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)

    function isEnableSignUp(){
        return email !=="" && username!== "" && password!== "" && emailError ===""&& passwordError ===""&& usernameError ===""
    }
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
        title="  Getting started  "
        subtitle="Please create an account to continue"
        titleContainerStyle={{
            marginTop: SIZES.radius
        }}
        >
            {/*{Form input and sign up}*/}
            <View
            style={{
                flex:1,
                marginTop: SIZES.padding*2,
            }}
            >
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
                label="Username"
                containerStyle={{
                    marginTop: SIZES.radius,
                }}
                onchange={(value) =>{
                    setUsername(value)
                }}
                errorMsg={usernameError}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image
                            source={username === "" || (username!== ""&& usernameError==="")? icons.correct: icons.cancel}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: username === ""? COLORS.gray : (username!== "" && usernameError ==="")? COLORS.green : COLORS.red
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
                <CustomButton
                    buttonText="Sign Up"
                    disabled={!isEnableSignUp()}
                    buttonContainerStyle={{
                        marginTop:30,
                        paddingVertical:15,
                        borderColor: COLORS.doree,
                        borderWidth:1,
                        borderRadius: 20
                    }}
                    colors={ isEnableSignUp()?[COLORS.doree , COLORS.doree1] : [COLORS.transparentPrimray]}
                    onPress={() => /*isEnableSignUp()?*/ navigation.navigate("Authentification")/*:navigation.navigate("SignUp")*/}
                />
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
                        Already have an account ?
                    </Text>
                    <View style={{marginLeft:10}}>

                        <CustomButton
                            buttonText="Sign In"
                            colors={ []}
                            onPress={() => navigation.navigate("SignIn")}

                        />
                    </View>
                </View>
            </View>
            {/*{Footer}*/}

        </AuthenLayout>
        </View>
    )
}

export default SignUp;
