import React from 'react';
import {
    View,
    Text, Image
} from 'react-native';
import {AuthenLayout} from "../authentification";
import {COLORS, icons, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, FormInput} from "../../utils";
import Icon from "react-native-vector-icons/MaterialIcons";


const ForgotPassword= ({navigation}) => {
    const [email, setEmail] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    function isEnableSendEmail(){
        return email !=="" && emailError ===""
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
        <AuthenLayout
        title="Password Recovery"
        subtitle="Please enter your email address to recover your password"
        titleContainerStyle={{
            marginTop: SIZES.padding*2
        }}

        >
            <View
                style={{
                    flex:1,
                    marginTop: SIZES.padding*2
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
            </View>
            <CustomButton
                buttonText="send Email"
                disabled={!isEnableSendEmail()}
                buttonContainerStyle={{
                    marginTop:30,
                    paddingVertical:15,
                    borderColor: COLORS.doree,
                    borderWidth:1,
                    borderRadius: 20
                }}
                colors={ isEnableSendEmail()?[COLORS.doree , COLORS.doree1] : [COLORS.transparentPrimray]}
                onPress={() => navigation.goBack()}

            />
        </AuthenLayout>
        </View>
    )
}

export default ForgotPassword;
