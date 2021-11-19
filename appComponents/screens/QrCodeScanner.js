import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {COLORS} from "../../constants";

export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not scanned yet')

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if (data === 'exp://192.168.1.6:19000'){
            setText('Allowed to get in ✅' )}
        else{
            setText('Not allowed to get in ! 🚫')
        }
        console.log('Type: ' + type + '\nData: ' + data)
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
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 500, width: 500 }} />
            </View>
            <Text style={text ==='Not allowed to get in ! 🚫' ?styles.maintextNot : text ==='Not scanned yet' ? styles.maintext : styles.maintextyes}>{text}</Text>

            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color= {COLORS.gold} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 20,
        margin: 20,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    maintextyes: {
        fontSize: 20,
        margin: 20,
        color: COLORS.green,
        fontWeight: 'bold'
    },
    maintextNot: {
        fontSize: 20,
        margin: 20,
        color: COLORS.red,
        fontWeight: 'bold'
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

