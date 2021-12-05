import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import {
  Dimensions, Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Layout noMargin>
      <View style={{flexDirection :'row'}}>
        <ImageBackground
          source={images.logo}
          style={{
            width: "50%"
          }}
          imageStyle={{
            borderBottomRightRadius: 65,
          }}
        />
        {/*<Image
        source={images.logo}
        />
        <Image
        source={images.nasyp}
        />*/}
      </View>
      </Layout>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
});
export default HomeScreen;
