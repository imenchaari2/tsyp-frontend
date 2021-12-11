import React from "react";
import {View,Text,Image,TouchableOpacity} from "react-native";
import {COLORS, FONTS, SIZES} from "../constants";
const ProfileValue =({icon, label , value })=>{
    return(
        <View
        style={{
            flexDirection: 'row',
            height:80,
            alignItems: 'center'
        }}
        >
            <View
                style={{
                    width:40,
                    height:40,
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: COLORS.light
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        paddingTop:35,
                        width:25,
                        height:25,
                        tintColor: COLORS.gold,

                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                {label &&
                <Text
                    style={{
                        color: COLORS.darkGray,
                        ...FONTS.body4
                    }}
                >
                    {label}
                </Text>
                }
                <Text
                    style={{
                        ...FONTS.h4,}}
                >
                    {value}
                </Text>


            </View>

        </View>
    )
}
export default ProfileValue;
