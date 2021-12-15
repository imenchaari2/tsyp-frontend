import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
} from "react-native";
import {COLORS, FONTS, icons, SIZES} from "../../constants";
import validation from "../../utils/validation";
import {CustomButton, FormInput} from "../../utils";
import {AuthenLayout} from "../authentification";
import Icon from "react-native-vector-icons/MaterialIcons";
import Layout from "../../utils/Layout";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../redux/store";
import {saveUserInfo} from "../redux/profile/profileSlice";

const ProfileContent = ({navigation}) => {
    const user = useSelector((state) => state.profileSlice.profile.user);
    const token = useSelector((state) => state.profileSlice.profile.token);
    const userFlow = useSelector((state) => state.profileSlice.profile.flowCompleted);
    const dispatch = useAppDispatch();
    const [emailError, setEmailError] = React.useState("");
    const [email, setEmail] = React.useState(user?.email || "");
    const [occupation, setOccupation] = React.useState(user?.occupation || "");
    const [fullName, setFullName] = React.useState(user?.fullName || "");
    const [branch, setBranch] = React.useState(
        user?.branch || ""
    );
    const [phone, setPhone] = React.useState(user?.phone || "");
    const [idMember, setIdMember] = React.useState(user?.idMember || "");
    const [room, setRoom] = React.useState(user?.room || "");
    const [hotel, setHotel] = React.useState(user?.hotel || "");
    const [sharedWith, setSharedWith] = React.useState(user?.sharedWith || "");
    const [sendRequest, setSendRequest] = React.useState(false);
    // //console.log(user,"user");
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white
            }}
        >
            <Layout>
                <AuthenLayout
                    title="Profile Content"
                    subtitle="Please fill in the form with your data"
                    titleContainerStyle={{
                        marginTop: SIZES.radius,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FormInput
                            value={fullName}
                            label="Full Name"
                            containerStyle={{
                                marginTop: SIZES.radius,
                            }}
                            onchange={(value) => {
                                setFullName(value);
                            }}
                        />
                        <FormInput
                            editable={false}
                            value={email}
                            label="Email"
                            keyboardType="Email-address"
                            autoCompleteType="email"
                            onchange={(value) => {
                                validation.validateEmail(value, setEmailError);
                                setEmail(value);
                            }}
                            errorMsg={emailError}
                            appendComponent={
                                <View
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        source={
                                            email === "" || (email !== "" && emailError === "")
                                                ? icons.correct
                                                : icons.cancel
                                        }
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor:
                                                email === ""
                                                    ? COLORS.gray
                                                    : email !== "" && emailError === ""
                                                    ? COLORS.green
                                                    : COLORS.red,
                                        }}
                                    />
                                </View>
                            }
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormInput
                                value={phone}
                                label="Phone number"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                    justifyContent: "center",
                                }}
                                style={{borderColor: COLORS.transparent}}
                                onChangeText={(value) => {
                                    setPhone(value);
                                }}
                                placeholder="(+216)      "
                                keyboardType="numeric"
                                onchange={(value) => {
                                    setPhone(value);
                                }}
                            />
                            <FormInput
                                value={idMember}
                                label="ID number"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                    justifyContent: "center",
                                }}
                                onchange={(value) => {
                                    setIdMember(value);
                                }}
                                keyboardType="numeric"
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormInput
                                value={branch}
                                label="Student Branch"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                }}
                                onchange={(value) => {
                                    setBranch(value);
                                }}
                            />
                            <FormInput
                                value={occupation}
                                label="Occupation"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                }}
                                onchange={(value) => {
                                    setOccupation(value);
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <FormInput
                                value={hotel}
                                label="Hotel"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                }}
                                onchange={(value) => {
                                    setHotel(value);
                                }}
                            />
                            <FormInput
                                value={room}
                                label="Room number"
                                containerStyle={{
                                    marginTop: SIZES.radius,
                                    width: "49%",
                                    justifyContent: "center",
                                }}
                                onchange={(value) => {
                                    setRoom(value);
                                }}
                                keyboardType="numeric"
                            />
                        </View>

                        <FormInput
                            value={sharedWith}
                            label="Room shared with"
                            containerStyle={{
                                marginTop: SIZES.radius,
                            }}
                            onchange={(value) => {
                                setSharedWith(value);
                            }}
                        />

                        <CustomButton
                            disabled={ fullName === "" || email === "" || phone === "" || idMember === "" || branch === "" || occupation === "" || hotel === "" || sharedWith === ""}
                            onPress={async () => {
                                await fetch("http://51.38.248.170/tsyp/api/update", {
                                    method: "PUT",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + token,
                                    },
                                    body: JSON.stringify({
                                        fullName: fullName,
                                        phone: phone,
                                        idMember: idMember,
                                        branch: branch,
                                        occupation: occupation,
                                        hotel: hotel,
                                        room: room,
                                        sharedWith: sharedWith,
                                    }),
                                })
                                    .then((response) => {
                                        dispatch(
                                            saveUserInfo({
                                                fullName,
                                                phone,
                                                idMember,
                                                branch,
                                                occupation,
                                                hotel,
                                                room,
                                                sharedWith,
                                            })
                                        );
                                        // //console.log(response);
                                        return response.json();
                                    })
                                    .then((responseJson) => {
                                        // //console.log(responseJson);
                                        if (responseJson.status === 200) {
                                            // //console.log("Successfully registered");
                                        } else {
                                            //console.log("Error");
                                        }
                                    });
                                if (!userFlow) {
                                    navigation.navigate('checkIn');
                                }
                                else{
                                    navigation.goBack();
                                }
                            }}
                            buttonText="Save your informations"
                            buttonContainerStyle={{
                                marginTop: 30,
                                paddingVertical: 15,
                                borderColor: COLORS.doree,
                                borderWidth: 1,
                                borderRadius: 20,
                            }}
                            colors={( fullName === "" || email === "" || phone === "" || idMember === "" || branch === "" || occupation === "" || hotel === "" || sharedWith === "") ? [] : [COLORS.doree, COLORS.doree1]}
                        />
                        {/* </View> */}
                    </ScrollView>
                </AuthenLayout>
            </Layout>
        </View>
    );
};

export default ProfileContent;
