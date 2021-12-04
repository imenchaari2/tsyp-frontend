import React from 'react';
import {Image, Text, TouchableOpacity,View,StyleSheet, Platform} from 'react-native';
import {COLORS, constants, FONTS, icons, images, SIZES,} from "../../constants";
import Animated from "react-native-reanimated";
import {Header} from "../header";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, {
    Path
} from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Home from "./Home";
import {QrCodeScanner, TrackingMap, TsypPlan, UserProfile} from "./index";
import Notifications from "./Notifications";
import Constants from 'expo-constants'

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessibilityLabel, accessibilityState, children, onPress }) => {

    const isSelected = accessibilityState.selected;


    if (isSelected) {
        return (

            <Animated.View style={{ flex: 1, alignItems: 'center' }}>
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >
                    <View style={{flex: 1, backgroundColor: COLORS.white}}/>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{flex: 1, backgroundColor: COLORS.white}}/>
                </Animated.View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 70,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.primary,
                        ...styles.shadow
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </Animated.View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.black,

                    }}
                />
                <BottomTabBar {...props.props} />
            </View>
        )
    } else {
        return (
            <BottomTabBar {...props.props} />
        )
    }
}

const MainLayout = ({navigation,drawerAnimationStyle}) => {

    return(
    <Animated.View
        style={{
            flex: 1,
            backgroundColor: COLORS.white,
            ...drawerAnimationStyle
        }}
    >
        {/*Header*/}
        <Header
            containerStyle={{
                height: 70,
                paddingHorizontal: SIZES.padding,
                marginTop: Platform.OS === 'ios' ? Constants.statusBarHeight:35,
                alignItems: 'center'
            }}
            leftComponent={
                <TouchableOpacity
                    style = {{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.darkGray,
                        borderRadius: SIZES.radius,
                        marginBottom:10,
                    }}
                    onPress={() => navigation.openDrawer()}
                >
                    <Image
                        source={icons.menu}
                        style = {{
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
            }
            rightComponent={
                <TouchableOpacity
                    style = {{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius,
                        marginBottom:10,
                    }}
                >
                    <Image
                        source ={images.profile}
                        style={{
                            width: 49,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}

                    />
                </TouchableOpacity>
            }


        />
        {/*content*/}
        <View
            style={{
                flex: 1
            }}

>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                style: {
                    elevation: 10,
                    flex:2,
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.radius,
                    paddingBottom: 10,
                    borderTopLeftRadius: 200,
                    borderTopRightRadius: 200,
                    backgroundColor: COLORS.black,
                    position: 'absolute',
                    top: 20,
                    left:0,
                    right:0,
                    height: 100,
                },
            "tabBarShowLabel": false,
                "tabBarStyle":[
                    {
                        "display":"flex"
                    },
                    null
                ]
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >

            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 60,
                                tintColor: focused ? COLORS.black : COLORS.gold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="TsypPlan"
                component={TsypPlan}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.tsypPlan}
                            resizeMode="contain"
                            style={{
                                width: 39,
                                height: 40,
                                tintColor: focused ? COLORS.black : COLORS.gold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="TrackingMap"
                component={TrackingMap}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.trackingMap}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 60,
                                tintColor: focused ? COLORS.black : COLORS.gold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="QrCode"
                component={QrCodeScanner}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.qrcode}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height:50,
                                tintColor: focused ? COLORS.black : COLORS.gold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}

                        />
                    )
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.notification}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.black : COLORS.gold
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

        </Tab.Navigator>
        </View>
    </Animated.View>

    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.doree,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default MainLayout;



