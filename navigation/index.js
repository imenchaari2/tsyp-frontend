import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import {
  CheckIn,
  DetailsScreen,
  Feedback,
  ForgotPassword,
  ProfileContent,
  SignIn,
  Speakers,
  SpeakersDetailsScreen,
  UserProfile,
} from "../appComponents/screens";
import OnBoarding from "../appComponents/screens/OnBoarding";
import CustomDrawer from "../navigation/CustomDrawer";
import { NavigationContainer } from "@react-navigation/native";
import notificationList from "../appComponents/screens/details/notificationList";
import { useAppDispatch } from "../appComponents/redux/store";
import { addToNotificationList } from "../appComponents/redux/notification/notificationSlice";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();


async function schedulePushNotification() {
  try {
    notificationList.map(
      async (item) =>
        await Notifications.scheduleNotificationAsync({
          content: {
            title: item.title,
            body: item.body,
            data: { data: item.data },
          },
          trigger: item.trigger,
        })
    );
  } catch (error) {
    console.log(error);
  }
}

const Navigator = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state) => state?.profileSlice?.profile?.token);
  const notification = useSelector((state) => state?.notificationSlice?.notification);
  const newNotifList = notificationList.filter((item) => {
    if (new Date() > new Date(item.trigger)&&  new Date(item.trigger)>new Date( notification.clearDate)) {
      return item;
      // dispatch(addToNotificationList(item));
    }
  });
  useEffect(() => {
    if (newNotifList.length > 0) {
      newNotifList.reverse();
      dispatch(addToNotificationList(newNotifList));

    }
  }, [notification.notificationRecieved]);
useEffect(() => {
  if (user) {
    schedulePushNotification();
  }
}, [user]);


  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={CustomDrawer} />

          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="Speakers" component={Speakers} />
          <Stack.Screen name="userProfile" component={UserProfile} />
          <Stack.Screen name="checkIn" component={CheckIn} />
          <Stack.Screen name="Feedback" component={Feedback} />

          <Stack.Screen
            name="speakerDetailsScreen"
            component={SpeakersDetailsScreen}
          />
          <Stack.Screen name="ProfileContent" component={ProfileContent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          //initialRouteName={"OnBoarding"}
        >
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigator;
