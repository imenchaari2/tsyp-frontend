import * as Notifications from "expo-notifications";
import React, {useEffect, useRef} from "react";
import {
    Dimensions, Image,
    ImageBackground,
    SafeAreaView, ScrollView,
    StyleSheet, Text, TouchableOpacity,
    View,
} from "react-native";
import {COLORS, images} from "../../constants";
import {updateNotificationRecieved} from "../redux/notification/notificationSlice";
import {useAppDispatch} from "../redux/store";
import Layout from "../../utils/Layout";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {ceremoniesSpeakers} from "./details/speakerDetails";
import {sponsors} from "./details/Sponsors";

const {width} = Dimensions.get("screen");
const Card = ({place}) => {
    return (
        <ImageBackground style={style.cardImage} source={place.image} resizeMode='contain'/>
    );
}
const HomeScreen = ({navigation}) => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useAppDispatch();

    useEffect(() => {
        notificationListener.current =
            Notifications.addNotificationResponseReceivedListener((value) => {
                //dispatch(updateNotificationRecieved());
                // //console.log(value);
                const url = value?.notification?.request?.content?.data?.data?.screen;
                // //console.log(url);
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
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 1}}>
                <View style={{width: "25%" , marginLeft: 5}}>
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

                <View style={{height: "100%"}}>
                    <Text style={style.textStyle}> Our Sponsors</Text>
                <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 0.5}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {sponsors.map((item) => {
                            return (<Card place={item}/>)
                        })}
                    </ScrollView>
                </View>

                <Text style={style.textStyle}> Organizers of the congress</Text>
                <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 0.1}}>

                    <View style={{width: "50%", paddingHorizontal: 20,}}>
                        <Image
                            source={images.logoEnisSb}
                            style={{
                                width: "100%",
                                height: 100,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{width: "50%", paddingHorizontal: 20}}>
                        <Image
                            source={images.logoSection}
                            style={{
                                width: "100%",
                                height: 100,

                            }}
                            resizeMode='contain'
                        />
                    </View>
                </View>
                    <Text style={style.textStyle}> Our partner</Text>
                    <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 0.1}}>

                        <View style={{width: "33%", padding: 20,}}>
                            <Image
                                source={images.press}
                                style={{
                                    width: "100%",
                                    height: 50,
                                }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{width: "33%", padding: 20}}>
                            <Image
                                source={images.paq}
                                style={{
                                    width: "100%",
                                    height: 50,

                                }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{width: "33%", padding: 20}}>
                            <Image
                                source={images.enis}
                                style={{
                                    width: "100%",
                                    height: 50,

                                }}
                                resizeMode='contain'
                            />
                        </View>

                    </View>
                <Text style={style.textStyle}> This app is made in collaboration with</Text>
                <View style={{flexDirection: 'row', backgroundColor: COLORS.light, elevation: 0.1}}>

                    <View style={{width: "33%", padding: 20,}}>
                        <Image
                            source={images.issatso}
                            style={{
                                width: "100%",
                                height: 40,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{width: "33%", padding: 20}}>
                        <Image
                            source={images.essths}
                            style={{
                                width: "100%",
                                height: 50,

                            }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{width: "33%", padding: 20}}>
                        <Image
                            source={images.logoEnisSb}
                            style={{
                                width: "100%",
                                height: 50,

                            }}
                            resizeMode='contain'
                        />
                    </View>
                </View>


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
        borderWidth: 1,
        borderColor: COLORS.gold,
        elevation: 8,
        marginHorizontal: 4,
        padding: 10
    },
    cardImage: {
        height: 125,
        width: 120,
        marginRight: 8,
        padding: 19,
        overflow: 'hidden',
        borderRadius: 10,
        borderColor: COLORS.lightGray1,
        borderWidth: 1,
        marginLeft: 10,
        backgroundColor: COLORS.white3,
    },
    detailsContainerPress: {
        height: 110,
        backgroundColor: COLORS.white4,
        bottom: 60,
        width: "60%",
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.blue,
        elevation: 12,
        margin: 3,
        marginHorizontal: 30,
        padding: 30
    },
    textStyle: {
        paddingVertical:10,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: 15,
        color: COLORS.gold1,
    }
});
export default HomeScreen;
