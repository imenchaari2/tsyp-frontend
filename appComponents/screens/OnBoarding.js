import React from "react";
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
                        flex: 3,
                        justifyContent: 'flex-end',
                        backgroundColor: COLORS.black,
                        marginTop: 60
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

                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            width: "70%",
                            color: COLORS.doree,
                            lineHeight: 20,
                            margin:70,
                            marginTop: 90,
                            ...FONTS.h3
                        }}
                    >
                        Welcome to TSYP Edition 9
                    </Text>


                </View>
                <View
                    style={{
                        flex: 1.5,
                        justifyContent: 'center'
                    }}
                >


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
                <Text
                    style={{

                        width: "90%",
                        color: COLORS.gold
                    }}
                >
                    collaboration
                </Text>
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
                    <CustomButton
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
                    />
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
