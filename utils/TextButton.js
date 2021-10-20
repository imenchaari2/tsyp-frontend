import React from "react";
import {TouchableOpacity,Text} from "react-native";
import {COLORS,FONTS} from "../constants";
import {LinearGradient} from "expo-linear-gradient";
const TextButton = ({label})=>{
    return(
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white
            }}
            >
            <Text
                style={{
                    color: COLORS.gray,
                    ...FONTS.h4
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}
export default TextButton;
