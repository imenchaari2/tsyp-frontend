import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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
const Stack = createStackNavigator();

const Navigator = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state) => state?.profileSlice?.profile?.token);
  const notification = useSelector((state) => state?.notificationSlice)
  notificationList.map((item) => {
    if(new Date()>new Date(item.trigger)){

    dispatch(addToNotificationList(item));

  }
});
console.log(notification);

  console.log(user);
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
