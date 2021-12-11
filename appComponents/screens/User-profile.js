import React, {useEffect, useState} from 'react';
import {
    View,
    Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CustomButton, ProfileValue, TextButton} from "../../utils";
import Layout from "../../utils/Layout";
import Constants from "expo-constants";
import LayoutHeader from "../../utils/LayoutHeader";
import {useSelector} from 'react-redux';


const UserProfile = ({navigation}) => {
    const user = useSelector((state) => state.profileSlice.profile.user)
    function renderProfileCard() {
        return (
            <View style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.black,
                marginTop: 20,
            }}>
                {/*profile image*/}
                <TouchableOpacity
                    style={{
                        paddingVertical: 10
                    }}
                />
                <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
                        <Image
                            source={images.profile}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 40,
                                borderWidth: 1,

                            }}
                            resizeMode="contain"
                        />
                        <Image
                            source={images.nasyp}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 40,
                                borderWidth: 1,

                            }}
                            resizeMode="contain"
                        />
                    </View>
                    {/*details*/}
                    <View
                        style={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            alignItems: 'flex-start'
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.doree,
                                ...FONTS.h3,
                                fontWeight: 'bold'
                            }}
                        >
                            TSYP 9TH & NASYP
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body5
                            }}
                        >
                            Please fill your profile content
                        </Text>
                        <CustomButton
                            buttonText="+ Fill in your details"
                            buttonContainerStyle={{
                                paddingVertical: 4,
                                marginTop: 10,
                                paddingHorizontal: SIZES.radius,
                                borderRadius: 20,
                                marginBottom: 20,
                                backgroundColor: COLORS.white
                            }}
                            colors={[COLORS.white2, COLORS.doree]}
                            onPress={() => navigation.navigate("ProfileContent")}
                        />
                    </View>

                </View>

            </View>
        )
    }

    function renderProfileSection1() {
        return (
            <View
                style={style.profileSectionContainer}
            >
                <ProfileValue
                    icon={icons.profile}
                    label="Full Name"
                    value={user?.fullName}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.email}
                    label="Email"
                    value={user?.email}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.phone}
                    label="Phone number"
                    value={user?.phone}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.idMember}
                    label="User Id"
                    value={user?.idMember}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.idMember}
                    label="Cin number"
                    value={user?.cin}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.studentBranch}
                    label="Student Branch"
                    value={user?.branch}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.occupation}
                    label="Occupation"
                    value={user?.occupation}
                />

            </View>
        )
    }

    function renderProfileSection2() {
        return (
            <View
                style={style.profileSectionContainer}
            >
                <ProfileValue
                    icon={icons.hotel}
                    label="Hotel"
                    value={user?.hotel}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.room}
                    label="Room number"
                    value={user?.room}
                />
                <View
                    style={{
                        height: 2,
                        backgroundColor: COLORS.lightGray1,
                    }}
                />
                <ProfileValue
                    icon={icons.roomShare}
                    label="Room shared with"
                    value={user?.sharedWith}
                />


            </View>
        )
    }


    return (
        <View
            style={{
                height: '100%',
                backgroundColor: COLORS.white
            }}
        >
            <Layout>
                <LayoutHeader
                    icon={images.user}
                    title="Profile Content"
                    onPress={() => navigation.navigate("Home")}
                />
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: SIZES.padding,
                                paddingBottom: 150
                            }}
                >
                    {renderProfileCard()}
                    {/*profile section*/}
                    {renderProfileSection1()}
                    {renderProfileSection2()}

                </ScrollView>

            </Layout>
        </View>

    )
}
const style = StyleSheet.create({

    profileSectionContainer: {
        marginTop: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray2,
        paddingHorizontal: SIZES.padding,
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white
    }

});
export default UserProfile;
