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
                size={30}
                color={COLORS.gray}
                onPress={onPress}
                style={{
                    borderColor: COLORS.darkGray,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 40,
                    height: 40,
                    padding:4
                }}

            />
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    flex: 1,
                    color: COLORS.gold,
                    fontSize: 18,
                    marginTop: 10,


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
                        width: 40,
                        height: 35,
                        borderRadius: SIZES.radius,
                        tintColor: COLORS.darkGray
                    }}

                />
            </TouchableOpacity>

        </View>
    )
};

export default LayoutHeader;
