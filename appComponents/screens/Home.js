import * as Notifications from "expo-notifications";
import React, {useEffect, useRef} from "react";
import {
    Dimensions, Image,
    ImageBackground,
    SafeAreaView, ScrollView,
    StyleSheet, Text,
    View,
} from "react-native";
import {COLORS, images} from "../../constants";
import {updateNotificationRecieved} from "../redux/notification/notificationSlice";
import {useAppDispatch} from "../redux/store";
import Layout from "../../utils/Layout";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const {width} = Dimensions.get("screen");
const HomeScreen = ({navigation}) => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useAppDispatch();

    useEffect(() => {
        notificationListener.current =
            Notifications.addNotificationResponseReceivedListener((value) => {
                //dispatch(updateNotificationRecieved());
                // console.log(value);
                const url = value?.notification?.request?.content?.data?.data?.screen;
                // console.log(url);
                url && navigation.navigate(url);
            });
        responseListener.current =
            Notifications.addNotificationReceivedListener((value) => {
                dispatch(updateNotificationRecieved());

            });
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    return (
        <Layout noMargin>
            <ScrollView>
                <View style={{height: "100%"}}>

                    <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 4}}>
                        <View style={{width: "25%"}}>
                            <Image
                                source={images.logo1}
                                style={{
                                    width: "100%",
                                    height: 180,
                                }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{width: "75%"}}>
                            <Image
                                source={images.nasyp}
                                style={{
                                    width: "100%",
                                    height: 200,

                                }}
                                resizeMode='contain'
                            />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 10
                    }}>
                        <View style={{backgroundColor: COLORS.blue2, borderRadius: 12, marginHorizontal:10}}>
                            <Text style={{
                                marginTop: 15,
                                color: COLORS.darkBlue,
                                fontSize: 20,
                                elevation: 10,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                height: 105
                            }}>
                                Our Sponsors</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: "93%", marginHorizontal: 10, justifyContent:'center', alignItems: 'center'}}>
                            <View style={style.detailsContainer}>
                                <Image
                                    source={images.primatec}
                                    style={{width: "100%", height: 100}}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={style.detailsContainer}>
                                <Image
                                    source={images.polina}
                                    style={{width: "100%", height: 100}}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>
                  {/*  <View style={{
                        marginTop:-45
                    }}>
                        <View style={{backgroundColor: COLORS.doree2, borderRadius: 24}}>
                            <Text style={{
                                marginTop: 10,
                                color: COLORS.red1,
                                fontSize: 20,
                                elevation: 10,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                height: 105
                            }}>
                                Media Partner</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: "95%", marginHorizontal: 10}}>
                            <View style={style.detailsContainerPress}>
                                <Image
                                    source={images.press}
                                    style={{width: "85%", height: 80}}
                                    resizeMode="contain"
                                />
                            </View>

                        </View>
                    </View>*/}
                </View>

            </ScrollView>
        </Layout>
    );
};

const style = StyleSheet.create({
    detailsContainer: {
        height: 120,
        backgroundColor: COLORS.white4,
        bottom: 60,
        width: "42%",
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:COLORS.gold,
        elevation: 8,
        marginHorizontal: 4,
        padding:10
    },
    detailsContainerPress: {
        height: 110,
        backgroundColor: COLORS.white4,
        bottom: 60,
        width: "60%",
        borderRadius: 18,
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center',
        borderWidth:1,
        borderColor:COLORS.blue,
        elevation: 12,
        margin: 3,
        marginHorizontal:30,
        padding: 30
    },
});
export default HomeScreen;
