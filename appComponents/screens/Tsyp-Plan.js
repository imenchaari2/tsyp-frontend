import React from 'react';
import {
    View,
    Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, FlatList
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import plandetails from "./details/PlanDetails";
const Plandetails = [
    {name: '19 DECEMBER ', image:require('../../assets/images/54053865-19-décembre-vecteur-plat-calendrier-icône-quotidienne-date-et-heure-jour-mois-vacances-.jpg'),},
    {name: '20 DECEMBER ', image:require('../../assets/images/2nd.jpg')},
    {name: '21 DECEMBER ',image:require('../../assets/images/3rd.jpg')},
];
const Card = ({day, navigation}) => {
    const [selectedDayIndex, setSeletedDayIndex] = React.useState(0);


    return (
        <View style={{flexDirection: 'row'}}>

                <View style={style.cardDetailsContainer}>
                    <Image
                        source={icons.session1}
                        resizeMode="contain"
                        style={{
                            width: 39,
                            height: 40,
                            tintColor: selectedDayIndex
                                ? COLORS.black
                                : COLORS.gold,
                            paddingRight: 20,
                            marginLeft:0,

                        }}

                    />
                    <Text>      </Text>
                    <View >

                    <Text style={{fontSize: 15, fontWeight:'bold', marginTop: 5, color: COLORS.darkGray}}>
                        {day?.hour}
                    </Text>
                    <Text style={{fontSize: 11, marginTop: 6, color: COLORS.darkGray}}>
                        {day?.activity}
                    </Text>

                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <Icon name="map-marker" color={COLORS.gold} size={18} />
                        <Text style={{fontSize: 12, color: COLORS.gray, marginLeft: 5}}>
                            {day?.location}
                        </Text>
                    </View>

                </View>
                </View>
            </View>

    );
};
const TsypPlan = ({navigation}) => {
    const [currentTime, setCurrentTime] = React.useState(0);
    const [selectedDayIndex, setSeletedDayIndex] = React.useState(0);
    const [selectedImageIndex, setSeletedImageIndex] = React.useState(0);
    const [filteredHours, setFilteredHours] = React.useState([]);

    const fliterDay = index => {
        const currentHours = plandetails.filter(
            item => item?.day?.toUpperCase() === Plandetails[index].name,
            item => item?.image === Plandetails[index].image

        )[0]?.hours;
        setFilteredHours(currentHours);
    };

    React.useEffect(() => {
        fliterDay(0);
    }, []);
    return (
        <SafeAreaView style={{flex: 1, color: COLORS.red , marginBottom: 118}}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginHorizontal: 40,

            }}>
            {Plandetails.map((item, index) => (
                <View key={'day'+'image'+ index}
                      style={{
                          alignItems: 'center'
                      }}>

                    <TouchableOpacity
                        onPress={() => {
                            setSeletedDayIndex(index);
                            setSeletedImageIndex(index);
                            fliterDay(index);
                        }}
                        style={[
                            style.categoryBtn,
                            {
                                backgroundColor:
                                    (selectedDayIndex === index
                                         && selectedImageIndex === index)? COLORS.white
                                        : COLORS.white,
                            },
                        ]}>

                        <View>
                            <Image
                                source={Plandetails[index].image}
                                resizeMode="cover"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    /* tintColor: selectedDayIndex === index
                                         ? COLORS.black
                                         : COLORS.primary,*/
                                    padding: 28

                                }}

                            />

                        </View>

                    </TouchableOpacity>
{/*
                    <Text style={style.categoryBtnName}>{item.name}</Text>
*/}
                </View>
            ))}

        </View>

            <View style={{marginTop: 20}}>
                <FlatList
                    data={filteredHours}
                    renderItem={({item}) => (
                        <Card day={item} navigation={navigation} />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginTop:5
    },

    categoryBtn: {
        height: 100,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 8,


    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 8,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailsContainer: {
        height: 110,
        backgroundColor: COLORS.white,
        flex: 1,
        flexDirection: 'row',
        marginTop:-5,
        paddingHorizontal: 40,
        marginBottom:12,
        paddingTop: 10,
        elevation: 1.5
    },
});
export default TsypPlan;
