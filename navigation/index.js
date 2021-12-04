import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import 'react-native-gesture-handler';
import { useSelector } from "react-redux";
import {
    CheckIn,
    DetailsScreen,
    Feedback, ForgotPassword, ProfileContent, SignIn, Speakers, SpeakersDetailsScreen, UserProfile
} from "../appComponents/screens";
import OnBoarding from "../appComponents/screens/OnBoarding";
import CustomDrawer from "../navigation/CustomDrawer";

const Stack = createStackNavigator();

const Navigator = () => {
  const user = useSelector((state) => state.profileSlice.profile.user);
  if (user) {
    return (
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
    );
  } else {
    return (
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
    );
  }
};

export default Navigator;
