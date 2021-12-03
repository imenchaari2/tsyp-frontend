import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import OnBoarding from "./appComponents/screens/OnBoarding";
import 'react-native-gesture-handler';
import CustomDrawer from "./navigation/CustomDrawer";
import {
    Authentification,
    CheckIn,
    DetailsScreen,
    Feedback,
    ForgotPassword,
    SignIn,
    SignUp,
    Speakers, SpeakersDetailsScreen, ProfileContent,
    UserProfile
} from "./appComponents/screens";
import {persistor, Store, useAppDispatch} from './appComponents/redux/store';
import * as Notifications from "expo-notifications";
import {addToNotificationList} from "./appComponents/redux/profile/profileSlice";
import {Linking} from "react-native";


const Stack = createStackNavigator();

const Navigator = () => {
    /*const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useAppDispatch()*/


    /* useEffect(() => {

         notificationListener.current = Notifications.addNotificationResponseReceivedListener(value => {
             dispatch(addToNotificationList(value));
             console.log(value);
             const url = value.notification.request.content.data.data.screen;
             console.log(url);


         });
         return () => {
             Notifications.removeNotificationSubscription(notificationListener.current);
             Notifications.removeNotificationSubscription(responseListener.current);
         };
     }, []);*/
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'OnBoarding'}
            >
                <Stack.Screen
                    name="Home"
                    component={CustomDrawer}
                />
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
                <Stack.Screen name="Speakers" component={Speakers}/>
                <Stack.Screen name="userProfile" component={UserProfile}/>
                <Stack.Screen name="checkIn" component={CheckIn}/>
                <Stack.Screen name="Feedback" component={Feedback}/>
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="Authentification" component={Authentification}/>
                <Stack.Screen name="speakerDetailsScreen" component={SpeakersDetailsScreen}/>
                <Stack.Screen name="ProfileContent" component={ProfileContent}/>


            </Stack.Navigator>
        </NavigationContainer>


    )
}
export default Navigator;
