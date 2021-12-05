import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React from "react";
import {
    Image,
    Platform, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {useSelector} from "react-redux";
import {COLORS, SIZES} from "../../constants";
import icons from "../../constants/icons";
import {clearNotificationList} from "../redux/notification/notificationSlice";
import {setNotificationState} from "../redux/profile/profileSlice";
import {useAppDispatch} from "../redux/store";
import notificationList from "./details/notificationList";
import {imgref} from "../../constants/images";
import Layout from "../../utils/Layout";
import { MaterialIcons } from '@expo/vector-icons';

const Card = ({day}) => {
    return (
        <View style={{flexDirection: "row"}}>
            <View style={style.cardDetailsContainer}>
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            marginTop: 5,
                            color: COLORS.darkGray,
                        }}
                    >
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
        <TouchableWithoutFeedback onPress={() => onchange(!value)}>
            <View style={value ? style.switchOnContainer : style.switchOffContainer}>
                <View
                    style={{
                        ...style.dot,
                        backgroundColor: value ? COLORS.white : COLORS.gray,
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const dispatch = useAppDispatch();
    const notificationSlice = useSelector((state) => state.notificationSlice.notification);
    console.log(notificationSlice);

    return (
        <Layout noMargin>
        <View style={{height: "100%"}}>
            <View style={style.userDetail}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={icons.notification}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: COLORS.gold,
                            marginRight: 15
                        }}
                    />

                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold"

                            }}
                        >
                            Notifications
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLORS.darkGray2,
                            }}
                        >
                            clear notifications
                        </Text>
                    </View>

                </View>

                <TouchableOpacity
                onPress={async (value) => {
                    try {
                        dispatch(clearNotificationList());

                    } catch (error) {
                        console.log(error);
                    }
                }}
                >
                    <MaterialIcons name="clear-all" size={50} color={COLORS.gold} />

                </TouchableOpacity>
            </View>
            <ScrollView>


                <View style={{alignItems: "center", justifyContent: "center", height: "100%"}}>
                    {notificationSlice.notificationList.map((item, index) => {
                        /* const img=item?.data?.image/!*?.split('images/')[1]*!/*/
                        return (
                            <View key={index} style={style.notificationDetail}>
                                {item?.data?.image && <View style={style.HeaderLeftImageView}>
                                    <Image
                                        style={style.HeaderLeftImage}
                                        source={imgref[item?.data?.image]}
                                    />
                                </View>}
                                <View style={{flexDirection: "row",width:"100%", paddingHorizontal:20}}>
                                    <View>
                                        <Text style={{color: COLORS.brown2,fontSize:14,fontWeight:"700"}}>{item?.title}</Text>
                                        <Text style={{color: COLORS.brown,fontSize:12,fontWeight:"500"}}>{item?.body}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
        </Layout>
    );
}


const style = StyleSheet.create({
    userDetail: {
        borderWidth: 0.4,
        borderColor: COLORS.darkGray2,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: COLORS.white2,
        fontSize: 15,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        elevation:8
    },
    notificationDetail: {
        flex: 1,
        paddingHorizontal: 32,
        margin:3,
        paddingVertical: 15,
        backgroundColor: COLORS.white3,
        borderRightWidth: 1.7,
        borderLeftWidth: 1.7,
        borderTopWidth:0.7,
        borderColor: COLORS.lightGray1,
        justifyContent: "center",
        flexDirection: 'row',
        width: "92%",
        borderRadius:10

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
    },
});
