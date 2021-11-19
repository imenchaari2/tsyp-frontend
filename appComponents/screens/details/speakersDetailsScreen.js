import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text, TouchableOpacity, Linking, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from "../../../constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {CustomButton} from "../../../utils";
import ExpoMailComposer from "expo-mail-composer/src/ExpoMailComposer";


const DetailsScreen = ({navigation, route}) => {
    const place = route.params;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <ImageBackground style={{flex: 0.7}} source={place.image}>
                <View style={style.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={28}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />
                    <Icon name="more-vert" size={28} color={COLORS.white} />
                </View>
                <View style={style.imageDetails}>
                    <Text
                        style={{
                            width: '70%',
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: COLORS.white,
                            marginBottom: 20,
                        }}>
                        {place.name}
                    </Text>
                </View>
            </ImageBackground>
            <View style={style.detailsContainer}>
                <View style={style.iconContainer}>
                    <Icon name="favorite" color={COLORS.red} size={30} />
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Icon name="place" size={28} color={COLORS.gold} />
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.gold,
                        }}>
                        {place.location}
                    </Text>
                </View>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
                    About the speaker
                </Text>
                <ScrollView>
                <Text style={{marginTop: 20, lineHeight: 22}}>{place.details}</Text>
                </ScrollView>
            </View>
            <View style={style.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                    <View style={{ marginLeft:70}}>
                    <View style={style.iconContainer}>
                        <FontAwesome5 name="facebook-square" color={COLORS.blue} size={40}
                                      onPress={()=>Linking.openURL(place.facebook)}/>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft:65}}>
                        <View style={style.iconContainer}>
                            <FontAwesome5 name="instagram" color={COLORS.purple} size={40}
                                          onPress={()=>Linking.openURL(place.instagram)}/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft:65}}>
                        <View style={style.iconContainer}>
                            <FontAwesome5 name="linkedin"
                                          color={COLORS.blue} size={40}
                                          onPress={()=>Linking.openURL(place.linkedin)}
                                          style={{borderRadius:20}}/>
                        </View>
                    </View>
                </View>
                <View style={style.bookNowBtn}>
                    <CustomButton
                        buttonText="Contact"

                        buttonContainerStyle={{
                            color: COLORS.gold, fontSize: 30, fontWeight: 'bold'
                        }}
                        colors={[]}
                        onPress={() => {
                            ExpoMailComposer.composeAsync({
                                recipients:
                                    ['lfavre3@gmail.com'],
                                subject: '',
                                body: '',
                            }).then(r => console.log(r));
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    bookNowBtn: {
        height: 50,
        width: 150,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer: {
        height: 55,
        width: 55,
        position: 'absolute',
        top: -30,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        top: -40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        flex: 0.3,
    },
    header: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    imageDetails: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.doree1,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default DetailsScreen;
