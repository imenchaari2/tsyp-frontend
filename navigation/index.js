import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { setflowCompleted } from "../appComponents/redux/profile/profileSlice";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: "high",
  }),
});

async function schedulePushNotification() {
  try {
    notificationList.map(async (item) => {
      if (new Date() < new Date(item.trigger)) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: item.title,
            body: item.body,
            data: { data: item.data },
          },
          trigger: item.trigger,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const Navigator = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state) => state.profileSlice.profile.user);
  const userFlow = useSelector((state) => state.profileSlice.profile.flowCompleted);

  const userToken = useSelector((state) => state?.profileSlice?.profile?.token);
  const notification = useSelector(
    (state) => state?.notificationSlice?.notification
  );
  const [userInfoCompleted, setUserInfoCompleted] = useState(true);
  const [checkinCompleted, setCheckinCompleted] = useState(true);
  const [flow, setflow] = useState(true)
  const newNotifList = notificationList.filter((item) => {
    if (
      new Date() > new Date(item.trigger) &&
      new Date(item.trigger) > new Date(notification.clearDate)
    ) {
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
    if (userToken) {
      schedulePushNotification();
    }
  }, [userToken]);
  useEffect(() => {
    //check all field of user filled
    if (
      user?.fullName &&
      user?.fullName !== "" &&
      user?.email &&
      user?.email !== "" &&
      user?.phone &&
      user?.phone !== ""
    ) {
      console.log("user  completed");
      setUserInfoCompleted(true);
    } else {
      setUserInfoCompleted(false);
    }
    if (
      user?.cin &&
      user?.cin !== "" 
     
    ) {
      console.log("user cin completed");
      setCheckinCompleted(true);
    } else {
      setCheckinCompleted(false);
    }
  }, [user?.fullName,user?.cin,user?.phone,userFlow]);
 useEffect(() => {
   setflow(userFlow)
 }, [userFlow,flow]); 
  

  console.log(user);
  if (userToken) {
     if(!userInfoCompleted&&!userFlow){
      console.log("user not completed");
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={"checkIn"}
            //  initialRouteName={"userProfile"}
          >
          
           

            <Stack.Screen name="ProfileContent" component={ProfileContent} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else if(!checkinCompleted){
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={"checkIn"}
            //  initialRouteName={"userProfile"}
          >
         
            <Stack.Screen name="checkIn" component={CheckIn} />

        
          </Stack.Navigator>
        </NavigationContainer>
      );
    }else {
      console.log("user  completed here");
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // initialRouteName={"checkIn"}
            initialRouteName={"Home"}
          >
            <Stack.Screen name="Home" component={CustomDrawer} />

            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="Speakers" component={Speakers} />
            <Stack.Screen name="checkIn" component={CheckIn} />
            <Stack.Screen name="Feedback" component={Feedback} />

            <Stack.Screen
              name="speakerDetailsScreen"
              component={SpeakersDetailsScreen}
            />
            <Stack.Screen name="userProfile" component={UserProfile} />
            <Stack.Screen name="ProfileContent" component={ProfileContent} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } 
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
