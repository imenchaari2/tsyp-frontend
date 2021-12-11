import React from "react";
import {TouchableOpacity,Text} from "react-native";
import {COLORS,FONTS} from "../constants";
import {LinearGradient} from "expo-linear-gradient";
const CustomButton=({ buttonText, disabled, buttonContainerStyle , colors , onPress})=>{
    if(colors.length >1 ){
        return(
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
            >
                <LinearGradient
                start={{x:0, y:0}}
                end={{x:1,y:0}}
                colors={colors}
                style={{
                    ...buttonContainerStyle
                }}
                >
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.black,
                        ...FONTS.h4,
                        fontWeight:'700'
                    }
                    }
                >
                    {buttonText}
                </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }else if(colors.length===0){
        return(
            <TouchableOpacity
                style={{
                    ...buttonContainerStyle
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color:COLORS.gold,
                        ...FONTS.h4,
                        fontWeight:'bold'
                    }}
                >
                    {buttonText}
                </Text>

            </TouchableOpacity>
        )
    }
    else if(colors.length===1){
        return(
            <TouchableOpacity
                style={{
                    ...buttonContainerStyle
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color:COLORS.gray,
                        ...FONTS.h4,
                        fontWeight:'bold'
                    }}
                >
                    {buttonText}
                </Text>

            </TouchableOpacity>
        )
    }
}
export default CustomButton;
