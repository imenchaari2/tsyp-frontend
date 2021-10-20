
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {COLORS, icons, images, SIZES} from "../../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import workshopsInfos from "./details/workshopsInfos";
const {height} = Dimensions.get('window');
const workshopsCategories = [
    {name: 'SESSION 1'},
    {name: 'SESSION 2'},
    {name: 'SESSION 3'},
];

const Card = ({workshop, navigation}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', workshop)}>
            <View style={style.cardContainer}>
                {/* Render the card image */}
                <View style={style.cardImageContainer}>
                    <Image
                        source={icons.workshop}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={style.cardDetailsContainer}>
                    {/* Name and gender icon */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text
                            style={{fontWeight: 'bold', color: COLORS.darkGray, fontSize: 20}}>
                            {workshop?.domain}
                        </Text>
                        <Icon name="gender-male" size={22} color={COLORS.gray} />
                    </View>

                    {/* Render the age and type */}
                    <Text style={{fontSize: 12, marginTop: 5, color: COLORS.darkGray}}>
                        {workshop?.speaker}
                    </Text>
                    <Text style={{fontSize: 10, marginTop: 5, color: COLORS.gray}}>
                        {workshop?.participants}
                    </Text>

                    {/* Render distance and the icon */}
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <Icon name="map-marker" color={COLORS.primary} size={18} />
                        <Text style={{fontSize: 12, color: COLORS.gray, marginLeft: 5}}>
                            {workshop?.location}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const HomeScreen = ({navigation,drawerAnimationStyle}) => {
    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredWorkshops, setFilteredWorkshops] = React.useState([]);

    const fliterWorkshop = index => {
        const currentWorkshops = workshopsInfos.filter(
            item => item?.workshop?.toUpperCase() === workshopsCategories[index].name,
        )[0]?.workshops;
        setFilteredWorkshops(currentWorkshops);
    };

    React.useEffect(() => {
        fliterWorkshop(0);
    }, []);

    return (
        <SafeAreaView style={{flex: 1, color: COLORS.white}}>
                {/*Header*/}
            <View style={style.header}>

                <Icon
                    name="arrow-left"
                    size={35}
                    color={COLORS.gray}
                    onPress={navigation.goBack}
                    style={{
                        borderColor: COLORS.lightGray1,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 50,
                        height: 47,
                        padding : 5
                    }}

                />
                <Text
                    style={{
                        textAlign: 'center',
                        flex:1,
                        color: COLORS.gold,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,

                    }}
                >Workshops</Text>


            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.mainContainer}>
                    {/* Render the search inputs and icons */}
                    <View style={style.searchInputContainer}>
                        <Icon name="magnify" size={24} color={COLORS.gray} />
                        <TextInput
                            placeholderTextColor={COLORS.grey}
                            placeholder="Search workshops"
                            style={{flex: 1}}
                        />
                        <Icon name="sort-ascending" size={24} color={COLORS.gray} />
                    </View>

                    {/* Render all the categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                        {workshopsCategories.map((item, index) => (
                            <View key={'workshop' + index}
                                  style={{
                                      alignItems: 'center'
                                  }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSeletedCategoryIndex(index);
                                        fliterWorkshop(index);
                                    }}
                                    style={[
                                        style.categoryBtn,
                                        {
                                            backgroundColor:
                                                selectedCategoryIndex === index
                                                    ? COLORS.primary
                                                    : COLORS.white,
                                        },
                                    ]}>
                                    <Image
                                        source={icons.session1}
                                        resizeMode="contain"
                                        style={{
                                            width: 39,
                                            height: 40,
                                            tintColor: selectedCategoryIndex === index
                                                ? COLORS.black
                                                : COLORS.primary

                                        }}

                                    />

                                </TouchableOpacity>
                                <Text style={style.categoryBtnName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Render the cards with flatlist */}
                    <View style={{marginTop: 20}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filteredWorkshops}
                            renderItem={({item}) => (
                                <Card workshop={item} navigation={navigation} />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const style = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white2,
        paddingHorizontal: 20,
        paddingVertical: 20,
        minHeight: height,
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white
    },

    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        borderColor: COLORS.gray,
        borderWidth:0.5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryBtn: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 8,

    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginHorizontal:20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',

    },
    cardImageContainer: {
        height: 140,
        width: 140,
        backgroundColor: COLORS.lightGray2,
        borderRadius: 40,

    },
});
export default HomeScreen;

