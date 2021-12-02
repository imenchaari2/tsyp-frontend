import React from 'react';
import {
    View,
    Text, FlatList, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Dimensions
} from 'react-native';
import speakerDetails from "./details/speakerDetails";
import {COLORS} from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const {width} = Dimensions.get('screen');

const Speakers = ({navigation}) => {

    const Card = ({place}) => {
        return (

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('speakerDetailsScreen', place)}>
                <ImageBackground style={style.cardImage} source={place.image}>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginLeft: 5, color: COLORS.white}}>
                                {place.name}
                            </Text>
                        </View>

                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={style.header}>

                <Icon
                    name="arrow-left"
                    size={35}
                    color={COLORS.gray}
                    onPress={navigation.goBack}
                    style={{
                        borderColor: COLORS.darkGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 50,
                        height: 47,
                        padding: 5
                    }}

                />
                <Text
                    style={{
                        textAlign: 'center',
                        flex: 1,
                        color: COLORS.gold,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}
                >Speakers</Text>


            </View>
            <Text style={style.userDetail}>Get the chance to know more about your favourite speaker and contact him for
                more details 😊</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={style.sectionTitle}>Speakers of Workshops</Text>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={speakerDetails}
                        renderItem={({item}) => <Card place={item}/>}
                    />
                </View>
                <Text style={style.sectionTitle}>Speakers of ceremonies</Text>
                <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={speakerDetails}
                        renderItem={({item}) => <Card place={item}/>}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
    },
    userDetail: {
        backgroundColor: COLORS.lightGray2,
        paddingHorizontal: 22,
        color: COLORS.darkGray2,
        borderRadius: 15,
        marginHorizontal: 10,
        textAlign: 'auto',
        fontSize: 12.5,
        paddingVertical: 10,
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
});

export default Speakers;
