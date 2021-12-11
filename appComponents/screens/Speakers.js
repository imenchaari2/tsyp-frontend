import React from 'react';
import {
    View,
    Text, FlatList, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image
} from 'react-native';
import {speakerDetails} from "./details/speakerDetails";
import {ceremoniesSpeakers} from "./details/speakerDetails";
import {COLORS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Layout from "../../utils/Layout";
import Constants from "expo-constants";
import LayoutHeader from "../../utils/LayoutHeader";

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
        <View
            style={{
                height: '100%',
                backgroundColor: COLORS.white
            }}
        >
            <Layout >
            <LayoutHeader
                icon={icons.speaker}
                title="Speakers"
                onPress={navigation.goBack}
           />
            <Text style={style.userDetail}>Get the chance to know more about your favourite speaker and contact him for
                more details 😊</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={style.sectionTitle}>Speakers of Workshops</Text>
                <View>
                   {/* <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={speakerDetails}
                        renderItem={({item}) => <Card place={item}/>}
                    />*/}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {speakerDetails.map((item,index)=>{
                            return(<Card place={item} key={index}/>)
                        })}
                    </ScrollView>

                </View>
                <Text style={style.sectionTitle}>Speakers of ceremonies</Text>
              {/*  <View>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={speakerDetails}
                        renderItem={({item}) => <Card place={item}/>}
                    />
                </View>*/}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {ceremoniesSpeakers.map((item,index)=>{
                        return(<Card place={item} key={index}/>)
                    })}
                </ScrollView>
            </ScrollView>
        </Layout>
        </View>

    )
}
const style = StyleSheet.create({

    userDetail: {
        backgroundColor: COLORS.white2,
        paddingHorizontal: 22,
        color: COLORS.blue1,
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop:20,
        textAlign: 'auto',
        fontSize: 12.7,
        paddingVertical: 10,
        elevation:8
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
        fontWeight: '700',
        fontSize: 18,
        color: COLORS.brown
    },
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 20
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
