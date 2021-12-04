import React, {useEffect, useRef} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { images,COLORS,SIZES,FONTS} from "../../constants";
import {CustomButton} from "../../utils"
import {useAppDispatch} from "../redux/store";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import {addToNotificationList} from "../redux/profile/profileSlice";

const OnBoarding = ({ navigation }) => {
    const notificationListener = useRef();
    const responseListener = useRef();



    useEffect(() => {

        notificationListener.current = Notifications.addNotificationResponseReceivedListener(value => {

            console.log(value);
            const url = value?.notification?.request?.content?.data?.data?.screen;
            console.log(url);
            url&&navigation.navigate(url);

        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);

        };
    }, []);

    function renderHeader() {
        return (
            <View
                style={{
                    height: SIZES.height >700 ? "60%" : "65%",
                    justifyContent: 'center'
                }}
            >
                <ImageBackground
                    source={images.logo}
                    style={{
                        width:'100%',
                        height:250,
                        justifyContent: 'flex-end',
                        backgroundColor: COLORS.black,
                    }}
                    resizeMode="contain"
                >

                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={[
                            COLORS.gold,
                            COLORS.transparent
                        ]}
                        style={{
                            height: 900,
                            justifyContent: 'flex-end',

                        }}
                    >
                    </LinearGradient>
                </ImageBackground>

                <View


                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.doree,
                            marginTop:20,
                            fontWeight:'bold',

                            ...FONTS.h3
                        }}
                    >
                        Welcome to TSYP Edition 9
                    </Text>


                </View>
            </View>
        )
    }

    function renderDetail(){
        return(
            <View
            style={{
                flex:1,
                paddingHorizontal: SIZES.padding
            }}
            >
                {/* <Text
                    style={{
                        color: COLORS.gold
                    }}
                >
                    collaboration
                </Text> */}
                <View
                    style={{
                        flex:1,
                        justifyContent: "center"
                    }}
                >
                    <CustomButton

                        buttonText="Login"
                        buttonContainerStyle={{
                            paddingVertical:15,
                            borderColor: COLORS.black,
                            borderWidth:1,
                            borderRadius: 20
                        }}
                        colors={[COLORS.doree1, COLORS.gold]}
                        onPress={() => navigation.navigate("SignIn")}
                    />
                    {/* <CustomButton
                        buttonText="SignUp"
                        buttonContainerStyle={{
                            marginTop:SIZES.radius,
                            paddingVertical:15,
                            borderColor: COLORS.doree,
                            borderWidth:1,
                            borderRadius: 20
                        }}
                        colors={[]}
                        onPress={() => navigation.navigate("Home")}
                    /> */}
                </View>


            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            <StatusBar barStyle="light-content"/>
            {renderHeader()}
            {renderDetail()}
        </View>
    )
}

export default OnBoarding;
