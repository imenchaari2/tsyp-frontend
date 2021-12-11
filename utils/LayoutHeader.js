import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Constants from 'expo-constants'
import {COLORS, icons, images, SIZES} from "../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LayoutHeader = ({title,icon,onPress}) => {
    return (
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 12,
            justifyContent: 'space-between',
            backgroundColor: COLORS.white
        }}>

            <Icon
                name="arrow-left"
                size={25}
                color={COLORS.black}
                onPress={onPress}
                style={{
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 35,
                    height: 35,
                    padding:4
                }}

            />
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    flex: 1,
                    color: COLORS.gold,
                    fontSize: 18.5,
                    marginTop: 4,


                }}
            >{title}</Text>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius
                }}
            >
                <Image
                    source={icon}
                    style={{
                        width: 35,
                        height: 30,
                        borderRadius: SIZES.radius,
                        tintColor: COLORS.black
                    }}

                />
            </TouchableOpacity>

        </View>
    )
};

export default LayoutHeader;
