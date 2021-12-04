import React, {useEffect, useRef} from 'react';
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
import {persistor, Store, useAppDispatch} from './appComponents/redux/store';

import NavigatorContainer from './navigation';
const App = () => {
  return (
    <SafeAreaProvider>
   <Provider store={Store}>
        <PersistGate persistor={persistor}>
            <NavigatorContainer/>
      </PersistGate>
      </Provider>
    </SafeAreaProvider>

  )
}
export default App;
