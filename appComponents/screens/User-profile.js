import React from 'react';
import {
    View,
    Text, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import {COLORS, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const UserProfile = ({navigation}) => {
    return (
        <View
            style={{

                flex: 1,
                backgroundColor: COLORS.white


            }}
        >
            <View style={style.header}>

                <Icon
                    name="arrow-left"
                    size={35}
                    color={COLORS.gray}
                    onPress={navigation.goBack}
                    style={{
                        borderColor: COLORS.lightGray1,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 50,
                        height: 47,
                        padding : 5
                    }}

                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight:'bold',
                        flex:1,
                        color: COLORS.gold,
                        fontSize: 18,
                        marginTop: 10,


                    }}
                >My Account</Text>
                <TouchableOpacity
                    style = {{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}
                >
                    <Image
                        source ={images.user}
                        style={{
                            width: 49,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}

                    />
                </TouchableOpacity>

            </View>
            <View
                style={{

                    backgroundColor:COLORS.white2,
                    marginTop: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    borderRadius : SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.lightGray2,
                    marginHorizontal: 20,
                    minHeight:300


                }}
            >
            <Text style={style.userDetail}>Full Name</Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>User Id</Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Student Branch</Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Email</Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Occupation</Text>

        </View>
            <View
                style={{

                    backgroundColor:COLORS.white2,
                    marginTop: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    borderRadius : SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.lightGray2,
                    marginHorizontal: 20,
                    minHeight: 260


                }}
            >
                <Text style={style.userDetail}>CIN </Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Phone Number</Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Hotel && Room </Text>
                <View
                    style={{
                        height: 2,
                        marginVertical: SIZES.radius,
                        backgroundColor: COLORS.lightGray1,
                        width: 300,
                        marginLeft:20
                    }}
                />
                <Text style={style.userDetail}>Room shared with </Text>

            </View>
        </View>
    )
}
const style = StyleSheet.create({

    userDetail: {
        flex: 0.3,
        backgroundColor: COLORS.white2,
        paddingHorizontal: 20,
        color: COLORS.gray,
        fontSize: 15,
        fontWeight:'bold',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white
    }

});
export default UserProfile;
