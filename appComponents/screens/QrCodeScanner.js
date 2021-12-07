import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {COLORS} from "../../constants";
import Layout from "../../utils/Layout";
import { useSelector } from 'react-redux';

export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not scanned yet')
    const userToken= useSelector(state => state.profileSlice.profile.token);

    const askForCameraPermission = () => {
        (async () => {
            try {

                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            } catch (error) {
                console.log(error);
            }
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned =async ({ type, data }) => {

        await fetch(data, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + userToken
                },
                })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson,"responseJson");
                if (responseJson.Response === 'Success'){
            setText('Allowed to get in ✅' )}
        else{
            setText('Not allowed to get in ! 🚫')
        }
            })


        // setScanned(true);
        // if (data === 'exp://192.168.1.6:19000'){
        //     setText('Allowed to get in ✅' )}
        // else{
        //     setText('Not allowed to get in ! 🚫')
        // }
        // console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <Layout noMargin>
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 500, width: 500 }} />
            </View>
            <Text style={text ==='Not allowed to get in ! 🚫' ?styles.maintextNot : text ==='Not scanned yet' ? styles.maintext : styles.maintextyes}>{text}</Text>

            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color= {COLORS.gold} />}
        </View>
        </Layout>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.white3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 18,
        margin: 20,
        color: COLORS.black,
        fontWeight: '600'
    },
    maintextyes: {
        fontSize: 18,
        margin: 20,
        color: COLORS.green,
        fontWeight: '600'
    },
    maintextNot: {
        fontSize: 18,
        margin: 20,
        color: COLORS.red,
        fontWeight: '600'
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 320,
        overflow: 'hidden',
        borderRadius: 30,
    }
});

