import React from 'react';
import {
    Text,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    View,
    Image,
    StyleSheet, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, images} from "../../../constants";
import {CustomButton} from "../../../utils";
import Constants from "expo-constants";

const DetailsScreen = ({navigation, route}) => {
    const workshop = route.params;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={{
                height: 400, backgroundColor: COLORS.light, marginTop: Constants.statusBarHeight,
            }}>
                <ImageBackground
                    resizeMode="cover"
                    /*source={workshop?.image}*/
                    source={images.ilyes}
                    style={{
                        height: "100%",

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
                            {workshop?.domain?.name}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>

                        <Text style={{fontSize: 13, color: COLORS.gray}}>{workshop.participants}</Text>
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
                    <Image
                        source={require('../../../assets/images/ilyes.jpg')}
                        style={{height: 40, width: 40, borderRadius: 20}}
                    />
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                            style={{color: COLORS.gray, fontSize: 12, fontWeight: 'bold'}}>
                            Speaker
                        </Text>
                        <Text
                            style={{
                                color: COLORS.gray,
                                fontSize: 11,
                                fontWeight: 'bold',
                                marginTop: 2,
                                paddingBottom: 10
                            }}>
                            grade

                        </Text>
                    </View>
                    <Text style={{color: COLORS.grey, fontSize: 12}}>Duration </Text>
                </View>
                <ScrollView>

                    <Text style={style.comment}>
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                        Description of the workshop and what participant should get to work properly
                    </Text>


                </ScrollView>

                {/* Render footer */}
                <View style={style.footer}>

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
                        /*onPress={() => navigation.goBack()}*/

                    />

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
    comment: {
        marginTop: 10,
        fontSize: 12.5,
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
