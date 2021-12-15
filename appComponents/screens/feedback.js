import React from 'react';
import {
    View,
    Text, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CustomButton, FormInput} from "../../utils";
import Constants from "expo-constants";
import Layout from "../../utils/Layout";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {saveUserInfo} from "../redux/profile/profileSlice";
import {useSelector} from "react-redux";


const Feedback = ({navigation}) => {
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = React.useState(1);
    const starFilled = icons.starFilled;
    const starCorner = icons.starCorner;
    const [feedback, setFeedback] = React.useState("")
    const token = useSelector((state) => state.profileSlice.profile.token);
    const [sendRequest, setSendRequest] = React.useState(false);

    return (
        <Layout noMargin>
        <View
            style={{

                height:'100%'

            }}
        >
            <View style={style.header}>

                <Icon
                    name="arrow-left"
                    size={25}
                    color={COLORS.black}
                    onPress={navigation.goBack}
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
                >Feedback</Text>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}
                >
                    <Image
                        source={icons.star}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: SIZES.radius,
                            tintColor: COLORS.black
                        }}

                    />
                </TouchableOpacity>

            </View>
            <KeyboardAwareScrollView
                onKeyboardDismissMode="on-Drag"
            >
            <Text style={style.userDetail}> As IEEE Enis Student Branch we had the honor to organize the TSYP 9th
                Edition and we would love to know ,dear attendee, your feedback about the overall event organisation
            </Text>
            <Text style={style.cardDetailsContainer}>How would you rate the organization of this event? </Text>
            <View style={style.customRatingBar}>
                {maxRating.map((item, key) => {
                    return (

                        <TouchableOpacity
                            value={defaultRating}
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating((item))}

                        >
                            <Image
                                style={style.starStyle}
                                source={
                                    item <= defaultRating ? starFilled : starCorner
                                }

                            />

                        </TouchableOpacity>
                    )
                })}

            </View>
            <Text style={{
                justifyContent: 'center', marginLeft: 110, marginTop: 5, fontSize: 20,
                fontWeight: defaultRating === 5 ? 'bold' : 'normal'
            }}>
                {defaultRating === 1 ? <Text>disappointed 😔</Text> :
                    defaultRating === 2 ? <Text>unsatisfied 😕</Text> :
                        defaultRating === 3 ? <Text>satisfied 😊</Text> :
                            defaultRating === 4 ? <Text>enjoyed it 😍</Text> :
                                <Text style={{color: COLORS.red1}}>I just LOVE it 💞</Text>}
            </Text>


            <TextInput
                value={feedback}
                onChangeText={(value) => {
                    setFeedback(value)
                }}
                style={{
                    borderRadius: 20,
                    height:100,
                    marginHorizontal: 20,
                    marginTop: 50,
                    paddingHorizontal: 20,
                    borderWidth:1,
                    borderColor:COLORS.doree
                }}
                placeholder="Leave your comments here .."

            />


                <CustomButton
                    buttonText="Send your feedback"
                    buttonContainerStyle={{
                        marginTop:40,
                        marginHorizontal: 20,
                        paddingVertical: 15,
                        borderColor: COLORS.doree,
                        borderWidth: 1,
                        borderRadius: 20,

                    }}
                    colors={[COLORS.doree, COLORS.doree1]}
                    onPress={async () => {
                        await fetch("http://51.38.248.170/tsyp/api/send-feedback", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + token,
                            },
                            body: JSON.stringify({
                                rate: defaultRating,
                                feedback: feedback,
                            }),
                        })
                            .then((response) => {

                                //console.log(response);
                                return response.json();
                            })
                            .then((responseJson) => {
                                //console.log(responseJson);
                                if (responseJson.Response === 'Success') {
                                    //console.log("Successfully feedback send");
                                } else {
                                    //console.log("Error");
                                }
                            });
                        navigation.navigate('Home');

                    }}

                />
            </KeyboardAwareScrollView>
        </View>

        </Layout>
    )
}
const style = StyleSheet.create({

    userDetail: {
        marginTop:40,
        backgroundColor: COLORS.white3,
        paddingHorizontal: 15,
        color: COLORS.darkGray,
        fontSize: 15,
        borderRadius: 20,
        borderColor: COLORS.doree1,
        borderWidth: 1,
        paddingVertical: 20,
        textAlign: 'center',
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        paddingTop:40 ,
        paddingHorizontal:20,
        padding:15,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,

    },
    cardDetailsContainer: {
        height: 200,
        backgroundColor: COLORS.white3,
        marginTop: 30,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        marginVertical: 20,
        marginBottom: 5,
        paddingTop: 30,
        borderRadius: 20,
        borderColor: COLORS.gold,
        borderWidth: 0.9,
        color: COLORS.darkGray,
        fontSize: 15,
        textAlign: 'center',
    },
    customRatingBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: -70,


    },
    starStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: -30,
        marginLeft: 3,
    }

});
export default Feedback;
