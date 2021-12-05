import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import {
  Dimensions, Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet, Text,
  View,
} from "react-native";
import { COLORS, images } from "../../constants";
import { updateNotificationRecieved } from "../redux/notification/notificationSlice";
import { useAppDispatch } from "../redux/store";
import Layout from "../../utils/Layout";

const { width } = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((value) => {
        //dispatch(updateNotificationRecieved());
        console.log(value);
        const url = value?.notification?.request?.content?.data?.data?.screen;
        console.log(url);
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
        <View style={{height: "100%"}}>

        {/*<Text>kjll</Text>
        <Image
        source={images.logo}
        />
        <Image
        source={images.nasyp}
        />*/}
            <View style={{flexDirection:'row',backgroundColor:COLORS.light,elevation:4}}>
            <View style={{width: "25%"}}>
                <Image
                    source={images.logo1}
                    style={{
                        width:"100%",
                        height:180,
                    }}
                    resizeMode='contain'
                />
            </View>
            <View style={{width: "75%"}}>
                <Image
                    source={images.nasyp}
                    style={{
                        width:"100%",
                        height:200,

                    }}
                    resizeMode='contain'
                />
            </View>
            </View>
      </View>
      </Layout>
  );
};

const style = StyleSheet.create({

});
export default HomeScreen;
