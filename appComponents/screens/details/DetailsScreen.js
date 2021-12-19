import React, {useEffect, useState} from 'react';
import {
    Text,
    ImageBackground,
    SafeAreaView,
    View,
    Image,
    StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, images, SIZES} from "../../../constants";
import {CustomButton} from "../../../utils";
import Constants from "expo-constants";
import {saveUserInfo} from "../../redux/profile/profileSlice";
import {useSelector} from "react-redux";
import {withDelay} from "react-native-reanimated";
import {imgref} from "../../../constants/images";

const DetailsScreen = ({navigation, route}) => {
    const token = useSelector((state) => state.profileSlice.profile.token);
    const [sessionsId, setSessionsId] = useState([]);
    const [IsSubscribed, setIsSubscribed] = useState(true);
    const [IsFull, setIsFull] = useState(false);
    const [IsAlreadySubscribedPerSession, setIsAlreadySubscribedPerSession] = useState(true);
    const workshopsCategories = [
        {technical: "technical"},
        {nonTechnical: "nonTechnical"},

    ];
    const verifyWorkshopSubscription = async () => {
        try {
            const res = await fetch("http://51.38.248.170/tsyp/api/verify-workshop/" + workshop.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
                .then((res) => res.json()).then((res) => {
                     console.log(res);
                    if (res.Response === 'Success') {
                        console.log("Successfully registered");
                        setIsSubscribed(true);

                    } else {
                        console.log("Not registred");
                        setIsSubscribed(false);
                    }
                });

        } catch (error) {
            console.log(error);
        }

    };
    const verifyWorkshopFullness = async () => {
        if (workshop?.numberOfParticipants === workshop?.users.length) {
            setIsFull(true)
        } else {
            setIsFull(false)
        }
    };
    const verifyWorkshopSubscriptionPerSession = async () => {
        try {
            const res = await fetch("http://51.38.248.170/tsyp/api/connected-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
                .then((res) => res.json()).then((res) => {
                    res.workshops.map(item => {
                        sessionsId.push(item.session.id)
                    })
                    console.log(sessionsId)

                    if (sessionsId.includes(workshop.session)) {
                        console.log("AlreadySubscribedPerSession")
                        setIsAlreadySubscribedPerSession(true)
                        console.log(IsAlreadySubscribedPerSession)
                    } else {
                        setIsAlreadySubscribedPerSession(false)
                        console.log("notSubscribedPerSession")

                    }

                });

        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        verifyWorkshopSubscriptionPerSession();
        verifyWorkshopSubscription();
        verifyWorkshopFullness();

    }, []);

    function renderSubscribeButton() {
        return (
            <CustomButton
                buttonText="Subscribe "
                buttonContainerStyle={{
                    backgroundColor: COLORS.primary,
                    height: 60,
                    width: 350,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                colors={[COLORS.doree1]}
                onPress={async () => {
                    await fetch("http://51.38.248.170/tsyp/api/add-workshop/" + workshop.id, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseJson) => {
                            // console.log(responseJson);
                            if (responseJson.Response === 'Success') {
                                console.log("Successfully registered");

                            } else {
                                console.log("Error");
                            }
                        });
                    setIsSubscribed(false);
                    await withDelay(1000, 0);
                    navigation.goBack();
                }}

            />
        )
    }

    function renderUnSubscribeButton() {
        return (
            <CustomButton
                buttonText="UnSubscribe "
                buttonContainerStyle={{
                    backgroundColor: COLORS.primary,
                    height: 60,
                    width: 350,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                colors={[COLORS.doree1]}
                onPress={async () => {
                    await fetch("http://51.38.248.170/tsyp/api/remove-workshop/" + workshop.id, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseJson) => {
                             console.log(responseJson);
                            if (responseJson.Response === 'Success') {
                                console.log("Successfully removed");

                            } else {
                                console.log("Error");
                            }
                        });
                    setIsSubscribed(true)
                    await withDelay(1000);
                    navigation.goBack();

                }}

            />
        )
    }
    function renderFullButton() {
        return (
            <CustomButton
                buttonText="This workshop is Full "
                buttonContainerStyle={{
                    backgroundColor: COLORS.primary,
                    height: 60,
                    width: 350,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                colors={[COLORS.doree1]}
                onPress={async () => {
                    await withDelay(1000);
                    navigation.goBack();

                }}

            />
        )
    }
    function renderAlreadySubscribedPerSessionButton() {
        return (
            <CustomButton
                buttonText="Already Subscribed Per Session "
                buttonContainerStyle={{
                    backgroundColor: COLORS.primary,
                    height: 60,
                    width: 350,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                colors={[COLORS.doree1]}
                onPress={async () => {
                    await withDelay(1000);
                    navigation.goBack();

                }}

            />
        )
    }


    const workshop = route.params;

    function renderButton() {
        if(IsFull===true && IsSubscribed === false){
            return renderFullButton();
        }
        if( IsSubscribed===false && IsAlreadySubscribedPerSession=== true){
            return renderAlreadySubscribedPerSessionButton();
        }
        if(IsSubscribed===false && IsAlreadySubscribedPerSession=== false){
            return renderSubscribeButton();
        }
        if((IsSubscribed===true && IsFull === true) || (IsSubscribed===true && IsFull === false)){
            return renderUnSubscribeButton();
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={{
                height: 400, backgroundColor: COLORS.light, marginTop: Constants.statusBarHeight,
            }}>

                <ImageBackground
                    resizeMode="cover"

                    source={imgref[workshop?.isTechnical===true ? "technical" : "nonTechnical"]}
                    style={{

                        height:'100%',
                        marginBottom:30,
                        marginTop:-30,

                    }}>
                    {/* Render  Header */}
                    <View style={style.header}>
                        <Icon
                            name="arrow-left"
                            size={28}
                            color={COLORS.gray}
                            onPress={navigation.goBack}
                        />
                        <Icon name="dots-vertical" size={28} color={COLORS.gray}/>
                    </View>
                </ImageBackground>


                <View style={style.detailsContainer}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text
                            style={{fontSize: 20, color: COLORS.gray, fontWeight: 'bold'}}>
                            Domain: {workshop?.domain}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>

                        <Text style={{fontSize: 14, color: COLORS.gray}}>Number of participants required :{workshop.numberOfParticipants}</Text>
                    </View>

                    {/* Render location and icon */}
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <Icon name="map-marker" color={COLORS.primary} size={20}/>
                        <Text style={{fontSize: 14, color: COLORS.gray, marginLeft: 5}}>
                            {workshop.location}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Comment container */}

            <View style={{marginTop: 80, justifyContent: 'space-between', flex: 1}}>
                {/* Render user image , name and date */}
                <View style={{flexDirection: 'row', paddingHorizontal: 20}}>

                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                            style={{color: COLORS.black, fontSize: 14, fontWeight: 'bold'}}>
                             Speaker :{workshop?.speaker}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.gray,
                                fontSize: 11,
                                fontWeight: 'bold',
                                marginTop: 2,
                                paddingBottom: 10
                            }}>
                            {workshop?.speaker?.lastName}

                        </Text>
                    </View>
                    <Text style={{color: COLORS.gold, fontSize: 12, fontWeight: 'bold'}}>Duration
                        : {workshop?.duration} </Text>
                </View>
                <ScrollView>

                    <Text style={style.comment1}> About the workshop: </Text>
                        <Text style={style.comment}>{workshop?.description}</Text>



                </ScrollView>

                {/* Render footer */}
                <View style={style.footer}>
                    {renderButton()}

                </View>

            </View>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    detailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        bottom: 60,
        borderRadius: 18,
        padding: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    comment1: {
        marginTop: 10,
        fontSize: 14,
        fontWeight:'bold',
        color: COLORS.darkGray,
        lineHeight: 20,
        marginHorizontal: 20,
    },
    comment: {
        marginTop: 10,
        fontSize: 14,
        color: COLORS.gray,
        lineHeight: 20,
        marginHorizontal: 20,
    },
    footer: {
        height: 100,
        backgroundColor: COLORS.light,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btn: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        marginTop: Constants.statusBarHeight,
        padding: 20,
        justifyContent: 'space-between',
    },
});
export default DetailsScreen;
