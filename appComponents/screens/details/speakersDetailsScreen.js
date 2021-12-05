import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text, TouchableOpacity, Linking, ScrollView, Image, Dimensions,
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
            <View  style={{position:"relative",flex:1}}>
                <View  style={{flex:3}}>


                    <Image source={place.image}
                           style={{
                               width: '100%',
                               height: '100%',
                               resizeMode: "cover"
                           }}/>
                    {/*<View style={{ position:"absolute",width:"100%" ,marginBottom:16,height:100,
                    padding: 16,
                    bottom: 0,
                    backgroundColor:"#000",
                    opacity:0.6,
                    zIndex:35225,
                    left:0}}>

                </View>*/}

                </View>
                <View style={[style.detailsContainer, {flex:3,
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 4,
                    //     height: 12,

                    // },
                    // shadowOpacity: 0.58,
                    // shadowRadius: 16.00,

                    // elevation: 24,

                }]}>
                    <View style={style.iconContainer}>
                        <Icon name="favorite" color={COLORS.red} size={30}/>
                    </View>
                    <View style={{flexDirection: 'row', padding: 8}}>
                        <Icon name="place" size={28} color={COLORS.gold}/>
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
                    <ScrollView style={{height:"100%"}} showsVerticalScrollIndicator={false}>
                        <View style={{padding:16}}>
                        <Text style={{marginTop: 8, fontWeight: 'bold', fontSize: 20}}>
                            {place.name}
                        </Text>

                        <Text style={{marginTop: 20, lineHeight: 22,}}>{place.details}</Text>
                        </View>
                    </ScrollView>
                   

                </View>
                <View style={[style.footer,{backgroundColor: "yellow",zIndex:55522,flex:0.5}]}>
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
                                            [place.email],
                                        subject: '',
                                        body: '',
                                    }).then(r => console.log(r));
                                }}
                            />
                        </View>
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
        //top: -40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        // flex: 0.6,
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
      //  position: 'absolute',
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
