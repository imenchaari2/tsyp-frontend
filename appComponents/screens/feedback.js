import React from 'react';
import {
    View,
    Text, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CustomButton, FormInput} from "../../utils";
import Constants from "expo-constants";


const Feedback = ({navigation}) => {
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = React.useState(1);
    const starFilled = icons.starFilled;
    const starCorner = icons.starCorner;
    const [feedback, setFeedback] = React.useState("")

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                marginTop: Constants.statusBarHeight,

            }}
        >
            <View style={style.header}>

                <Icon
                    name="arrow-left"
                    size={30}
                    color={COLORS.gray}
                    onPress={navigation.goBack}
                    style={{
                        borderColor: COLORS.darkGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 47,
                        height: 47,
                        padding: 5,

                    }}

                />
                <Text
                    style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        color: COLORS.gold,
                        fontSize: 18,
                        marginTop: 10,
                        fontWeight: 'bold'


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
                            width: 49,
                            height: 50,
                            tintColor: COLORS.darkGray,

                        }}

                    />
                </TouchableOpacity>

            </View>
            <Text style={style.userDetail}> As IEEE Enis Student Branch we had the honor to organize the TSYP 9th
                Edition and we would love to know ,dear attendee, your feedback about the overall event organisation
            </Text>
            <Text style={style.cardDetailsContainer}>How would you rate the organization of this event? </Text>
            <View style={style.customRatingBar}>
                {maxRating.map((item, key) => {
                    return (

                        <TouchableOpacity
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
                onchange={(value) => {
                    setFeedback(value)
                }}
                style={{
                    backgroundColor: COLORS.lightGray2,
                    flex: 0.5,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    marginTop: 50,
                    paddingHorizontal: 20,
                }}

                placeholder="Leave your comments here .."

            />
            <CustomButton
                buttonText="Send your feedback"

                buttonContainerStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    borderColor: COLORS.doree,
                    borderWidth: 1,
                    borderRadius: 20,

                }}
                colors={[COLORS.doree, COLORS.doree1]}
                onPress={() => navigation.goBack()}

            />
        </View>
    )
}
const style = StyleSheet.create({

    userDetail: {
        backgroundColor: COLORS.lightGray2,
        paddingHorizontal: 15,
        color: COLORS.darkGray,
        fontSize: 15,
        borderRadius: 20,
        paddingVertical: 20,
        textAlign: 'center',
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,

    },
    cardDetailsContainer: {
        height: 180,
        backgroundColor: COLORS.white,
        marginTop: 30,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        marginVertical: 20,
        marginBottom: 5,
        paddingTop: 30,
        borderRadius: 20,
        borderColor: COLORS.lightGray1,
        borderWidth: 0.9,
        color: COLORS.darkGray,
        fontSize: 15,
        textAlign: 'center'
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
