import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import {Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, Store } from './appComponents/redux/store';


const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
   <Provider store={Store}>
        <PersistGate persistor={persistor}>
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
              <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
              <Stack.Screen name="Speakers" component={Speakers} />
              <Stack.Screen name="userProfile" component={UserProfile} />
              <Stack.Screen name="checkIn" component={CheckIn} />
              <Stack.Screen name="Feedback" component={Feedback} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Authentification" component={Authentification} />
              <Stack.Screen name="speakerDetailsScreen" component={SpeakersDetailsScreen} />
              <Stack.Screen name="ProfileContent" component={ProfileContent} />



          </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
      </Provider>
    </SafeAreaProvider>

  )
}
export default App;
