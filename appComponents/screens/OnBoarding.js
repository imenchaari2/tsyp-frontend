import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import {
    ImageBackground,
    StatusBar, Text, View
} from 'react-native';
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { CustomButton } from "../../utils";

const OnBoarding = ({ navigation }) => {


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
                        height:220,
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
                            height: 1200,
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

                        buttonText="Log In"
                        buttonContainerStyle={{
                            paddingVertical:15,
                            borderColor: COLORS.black,
                            marginHorizontal:10,
                            borderWidth:1,
                            borderRadius: 20
                        }}
                        colors={[COLORS.doree, COLORS.gold]}
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
