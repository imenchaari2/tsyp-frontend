import React from 'react';
import {
    View,
    Text, StyleSheet, Image, TouchableWithoutFeedback
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from "../../constants";
import {CustomSwitch} from "../../utils";

const CustomSwitchNotification = ({value, onchange}) => {
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
                        style={value? style.switchOnContainer: style.switchOffContainer}
                    >
                        <View
                            style={{
                                ...style.dot,
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

                    </Text>
                </View>
            </TouchableWithoutFeedback>
    )
}
const Notifications = () => {
    const [saveMe, setSaveMe] = React.useState(false)
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            <View style={style.userDetail}>
                <Image
                    source={icons.notification}
                    style={{
                        width:40,
                        height:50,
                        tintColor: COLORS.gold,
                        marginTop: 8,
                        marginLeft: -7
                    }}
                />
                <View>
                <Text
                    style={{
                        marginHorizontal: 20,
                        fontSize: 18,
                        fontWeight:'bold'
                    }}
                >Notifications</Text>
                    <Text
                        style={{
                            marginHorizontal: 20,
                            fontSize: 12,
                            color: COLORS.darkGray2,
                            paddingRight:30
                        }}
                    > Allow the app to send you daily updates and reminders</Text>
                </View>


            </View>
            <View
                style={{
                    position: "relative",
                    top:-80,
                    left:320
                }}
            >
                <CustomSwitchNotification
                    value={saveMe}
                    onchange={(value) => setSaveMe(value)}
                />
            </View>

        </View>

    )
}
const style = StyleSheet.create({

    userDetail: {
        flexDirection:'row',
        flex: 0.155,
        backgroundColor: COLORS.lightGray2,
        paddingHorizontal: 20,
        color: COLORS.darkGray,
        fontSize: 15,
        borderRadius : 20,
        marginHorizontal : 20,
        paddingTop: 20,
        textAlign: 'center',
        marginTop:40
    },
        switchOnContainer:{
            width:40,
            height:30,
            paddingRight: 2,
            justifyContent: 'center',
            alignItems: 'flex-end',
            borderRadius: 10,
            backgroundColor: COLORS.gold,
            marginTop:4,
        },
        switchOffContainer:{
            width:40,
            height:30,
            paddingLeft:2,
            justifyContent: 'center',
            borderWidth:1,
            borderColor :COLORS.gray,
            borderRadius: 10,
            marginTop:4,

        },
        dot:{
            width:16,
            height:16,
            borderRadius:10
        },
    });
export default Notifications;
