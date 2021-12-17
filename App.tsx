import React from 'react';
import "react-native-gesture-handler";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, Store} from "./appComponents/redux/store";
import NavigatorContainer from "./navigation";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={Store}>
                <PersistGate persistor={persistor}>
                    <StatusBar style={"dark"}/>
                    <NavigatorContainer/>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}