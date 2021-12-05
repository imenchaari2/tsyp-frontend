import {Image, ImageBackground, View} from "react-native";
import React from "react";
import Constants from 'expo-constants'
import {images} from "../constants";

const Layout = ({children,noMargin=false}) => {
    return (
        <View style={{flex: 1, marginTop:!noMargin? Constants.statusBarHeight:0}}>
            <ImageBackground
                source={images.backblanc}
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                {children}
            </ImageBackground>


        </View>
    )
};

export default Layout;
