import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {AuthenLayout} from "../authentification";
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import validation from "../../utils/validation";
import { CustomButton, CustomSwitch, FormInput, TextButton } from "../../utils";
import { useAppDispatch } from "../redux/store";
import { login, saveUserInfo } from "../redux/profile/profileSlice";
import Layout from "../../utils/Layout";
import {
    forgetCredentials,
    rememberCredentials,
} from "../redux/credentials/credentialsSlice";
import {useSelector} from "react-redux";
import {StatusBar} from "expo-status-bar";

const SignIn = ({navigation}) => {
    const credentials = useSelector((state) => state.credentialSlice);
    const [email, setEmail] = React.useState(credentials.email);
    const [password, setPassword] = React.useState(credentials.password);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [showPass, setShowPass] = React.useState(false);
    const [saveMe, setSaveMe] = React.useState(credentials.remember);
    const dispatch = useAppDispatch();

    function isEnableSignIn() {
        return email !== "" && password !== "" && emailError === "";
    }

    //console.log(credentials, "credentials");
    return (

            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:COLORS.white
                }}
            >
                <StatusBar  style={"dark"} />
                <Layout>
                    <View
                        style={{
                            marginTop:40
                        }}
                    >

                    </View>
                <AuthenLayout
                    title="Let's Sign you In"
                    subtitle=" Welcome back you have been missed"
                >
                    <View
                        style={{
                            flex: 1,
                            marginTop: SIZES.padding * 2,
                        }}
                    >
                        {/*{form input}*/}
                        <FormInput
                            label="Email"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            value={email}
                            onchange={(value) => {
                                validation.validateEmail(value, setEmailError);
                                setEmail(value);
                            }}
                            errorMsg={emailError}
                            appendComponent={
                                <View
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        source={
                                            email === "" || (email !== "" && emailError === "")
                                                ? icons.correct
                                                : icons.cancel
                                        }
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor:
                                                email === ""
                                                    ? COLORS.gray
                                                    : email !== "" && emailError === ""
                                                    ? COLORS.green
                                                    : COLORS.red,
                                        }}
                                    />
                                </View>
                            }
                        />
                        <FormInput
                            label="Password"
                            value={password}
                            secureTextEntry={!showPass}
                            autoCompleteType="password"
                            containerStyle={{
                                marginTop: SIZES.radius,
                            }}
                            onchange={(value) => {
                                validation.validatePassword(value, setPasswordError);
                                setPassword(value);
                            }}
                            errorMsg={passwordError}
                            appendComponent={
                                <TouchableOpacity
                                    style={{
                                        width: 40,
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                    }}
                                    onPress={() => setShowPass(!showPass)}
                                >
                                    <Image
                                        source={showPass ? icons.eyeClose : icons.eye}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: COLORS.gray,
                                        }}
                                    />
                                </TouchableOpacity>
                            }
                        />

                        {/*{save me & forgot password}*/}
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: SIZES.radius,
                                justifyContent: "space-between",
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
                                marginTop: 30,
                                paddingVertical: 15,
                                borderColor: COLORS.doree,
                                borderWidth: 1,
                                borderRadius: 20,
                            }}
                            onPress={async () => {
                                dispatch(saveUserInfo({email}))
                                if (saveMe) {
                                    dispatch(rememberCredentials({email, password, remember: saveMe}));
                                }
                                if (!saveMe) {
                                    dispatch(rememberCredentials({email: "", password: "", remember: saveMe}));
                                }

                                //request to server auth get response push it in redux
                                //post request auth using fetch
                                await fetch("http://51.38.248.170/tsyp/api/login_check", {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        username: email,
                                        password: password,
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        // //console.log(responseJson);
                                        dispatch(login(responseJson));
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });

                                //   dispatch(login({ email, password }));
                            }}
                            colors={[COLORS.doree, COLORS.doree1]}
                        />
                        {/*{sign up}*/}
                        {/* <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.darkGray,
                ...FONTS.body3,
              }}
            >
              Don't have an account ?
            </Text>
            <View style={{ marginLeft: 10 }}>
              <CustomButton
                buttonText="Sign Up"
                colors={[]}
                onPress={() => navigation.navigate("SignUp")}
              />
            </View>
          </View> */}
                    </View>
                </AuthenLayout>
                </Layout>
            </View>

    );
};

export default SignIn;
