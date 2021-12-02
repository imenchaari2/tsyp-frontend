import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform, StyleSheet, TouchableWithoutFeedback, Image, FlatList} from 'react-native';
import {COLORS, FONTS, images, SIZES} from "../../constants";
import icons from "../../constants/icons";
import {CustomSwitch} from "../../utils";
import notificationList from "./details/notificationList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useSelector} from "react-redux";
import {useAppDispatch} from '../redux/store';
import {addToNotificationList, pushAllprofile, setNotificationState} from '../redux/profile/profileSlice';
import {retry} from "@reduxjs/toolkit/query";


const Card = ({day}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            <View style={style.cardDetailsContainer}>
                <View>

                    <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 5, color: COLORS.darkGray}}>
                        {day?.title}
                    </Text>
                    <Text style={{fontSize: 11, marginTop: 6, color: COLORS.darkGray}}>
                        {day?.body}
                    </Text>
                </View>
            </View>
        </View>

    );
};
const CustomSwitchNotification = ({value, onchange}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => onchange(!value)}
        >
            <View
                style={value ? style.switchOnContainer : style.switchOffContainer}
            >
                <View
                    style={{
                        ...style.dot,
                        backgroundColor: value ? COLORS.white : COLORS.gray
                    }}
                >

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const dispatch = useAppDispatch()
    const notificationSlice = useSelector((state) => state.profileSlice.profile)
    console.log(notificationSlice)


    return (
        <View style={{backgroundColor: COLORS.lightGray2}}>
            <View style={style.userDetail}>
                <Image
                    source={icons.notification}
                    style={{
                        marginTop: 3,
                        width: 40,
                        height: 50,
                        tintColor: COLORS.gold,

                    }}
                />
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >Notifications</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLORS.darkGray2,
                            }}
                        > Allow the app to send you daily </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLORS.darkGray2,
                            }}>
                            updates and reminders
                        </Text>
                    </View>
                    <CustomSwitchNotification
                        value={notificationSlice.notification}
                        onchange={async (value) => {
                            dispatch(setNotificationState())
                            if (value === true) {
                                await schedulePushNotification();
                            }
                        }}
                    />
                </View>
            </View>


            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {notificationSlice.notificationList.map((item, index) => (
                    <View key={index} style={style.notificationDetail}>
                        <View style={style.HeaderLeftImageView}>
                            <Image
                                style={style.HeaderLeftImage}
                                source={images.profile}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <View>
                                <Text>title :{item?.payload?.request?.content?.title}</Text>
                                <Text>body: {item?.payload?.request?.content?.body}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

        </View>
    );
}

async function schedulePushNotification() {
    notificationList.map(async (item) => (
        await Notifications.scheduleNotificationAsync({
            content: {
                title: item.title,
                body: item.body,
                data: {data: item.data},
            },
            trigger: item.trigger
        })));
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

const style = StyleSheet.create({
    userDetail: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        justifyContent: 'space-evenly',
        fontSize: 15,
        borderRadius: 20,
        marginVertical: 20,
        paddingVertical: 20,
    },
    switchOnContainer: {
        width: 40,
        height: 30,
        paddingRight: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: COLORS.gold,
        marginTop: 10,
    },
    switchOffContainer: {
        width: 40,
        height: 30,
        paddingLeft: 2,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginTop: 10,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 10,
    },
    notificationDetail: {
        flex: 1,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    HeaderLeftImageView: {
        width: 40,
        height: 40,
        marginLeft: 15,
    },
    HeaderLeftImage: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    }
});
