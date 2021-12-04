import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from 'react';
import {
    Dimensions, ImageBackground, SafeAreaView, StyleSheet,
    View
} from 'react-native';
import { COLORS, images } from "../../constants";

const {width} = Dimensions.get('screen');
const HomeScreen = ({navigation}) => {
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


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View>

                    <ImageBackground
                        source={images.tsyp}
                        style={{
                            width:"100%",
                            height:270
                        }}
                        imageStyle={{
                            borderBottomRightRadius:65
                        }}
                    />

                </View>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
    },
    headerTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 23,
    },
    inputContainer: {
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 12,
    },
    categoryContainer: {
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
});
export default HomeScreen;

