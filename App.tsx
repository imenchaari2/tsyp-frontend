import React, {useState} from 'react';
import "react-native-gesture-handler";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, Store} from "./appComponents/redux/store";
import NavigatorContainer from "./navigation";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import AppLoading from "expo-app-loading";

export default function App() {
    const [isLoading, setLoading] = useState(true);

    if (isLoading) {
        return(
            <AppLoading
                startAsync={async () => console.log('starting app')}
                onFinish={() => { setTimeout(() => {setLoading(false)}, 1000) }}
                onError={(err: any) => {console.log(err)}}
            />
        )
    }

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