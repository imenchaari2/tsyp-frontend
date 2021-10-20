import React from 'react';
import {
    View,
    Text, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import {COLORS, FONTS, SIZES} from "../constants";
const CustomSwitch = ({value, onchange}) => {
    return(
        <TouchableWithoutFeedback
            onPress={() => onchange(!value)}
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <View
                    style={value? styles.switchOnContainer: styles.switchOffContainer}
                >
                    <View
                        style={{
                            ...styles.dot,
                            backgroundColor: value? COLORS.white : COLORS.gray
                        }}
                    >

                    </View>
                </View>
                <Text
                    style={{
                        color: value? COLORS.gold : COLORS.gray,
                        marginLeft: SIZES.base,
                        ...FONTS.body4
                    }}
                >
                   Save Me
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    switchOnContainer:{
        width:40,
        height:20,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.gold,
        marginTop:4,
    },
    switchOffContainer:{
        width:40,
        height:20,
        paddingLeft:2,
        justifyContent: 'center',
        borderWidth:1,
        borderColor :COLORS.gray,
        borderRadius: 10,
        marginTop:4,

    },
    dot:{
        width:12,
        height:12,
        borderRadius:6
    },
});
export default CustomSwitch;
