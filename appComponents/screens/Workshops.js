import React, {useEffect, useState} from "react";
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
} from "react-native";
import {COLORS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Layout from "../../utils/Layout";
import {useSelector} from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import LayoutHeader from "../../utils/LayoutHeader";

const {height} = Dimensions.get("window");
const workshopsCategories = [
    {name: "SESSION 1"},
    {name: "SESSION 2"},
    {name: "SESSION 3"},
];
const techOrNoTech = [
    {isTech: "false"},
    {isTech: "true"},
];

const Card = ({workshop, navigation}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DetailsScreen", workshop)}
        >
            <View style={style.cardContainer}>
                {/* Render the card image */}
                <View style={style.cardImageContainer}>
                    <Image
                        source={icons.workshop}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                        }}
                    />
                </View>

                {/* Render all the card details here */}
                <View style={style.cardDetailsContainer}>
                    {/* Name and gender icon */}
                    <View
                        style={{flexDirection: "row", justifyContent: "space-between"}}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: COLORS.darkGray,
                                fontSize: 20,
                            }}
                        >
                            {workshop?.name}
                        </Text>
                        <Icon name="gender-male" size={22} color={COLORS.gray}/>
                    </View>

                    {/* Render the age and type */}
                    <Text style={{fontSize: 12, marginTop: 5, color: COLORS.darkGray}}>
                        {workshop?.speaker?.firstName}
                        {workshop?.speaker?.lastName}
                    </Text>
                    <Text style={{fontSize: 10, marginTop: 5, color: COLORS.gray}}>
                        {workshop?.numberOfParticipants}
                    </Text>

                    {/* Render distance and the icon */}
                    <View style={{marginTop: 5, flexDirection: "row"}}>
                        <Icon name="map-marker" color={COLORS.primary} size={18}/>
                        <Text style={{fontSize: 12, color: COLORS.gray, marginLeft: 5}}>
                            {workshop?.location}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const HomeScreen = ({navigation, drawerAnimationStyle}) => {
    const userToken = useSelector((state) => state.profileSlice.profile.token);

    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredWorkshops, setFilteredWorkshops] = React.useState([]);
    const [workshopss, setWorkshopss] = useState([]);
    const [nonTechnicalWorkshopss, setNonTechnicalWorkshopss] = useState([]);
    const [technicalWorkshopss, setTechnicalWorkshopss] = useState([]);
    const fetchSessions = async () => {
        try {
            const res = await fetch("http://51.38.248.170/tsyp/api/sessions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + userToken,
                },
            }).then((res) => res.json()).then((res) => {
                if (res && res.length > 0) {

                    setWorkshopss(res);
                }
            });

        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        fetchSessions();
        //console.log(workshopss,"workshopss");

    }, []);


    const filterWorkshop = index => {
        const currentWorkshops = workshopss.filter(
            (item) =>
                item?.workshop?.toUpperCase() === workshopsCategories[index].name
        )[0]?.workshops;
        setFilteredWorkshops(currentWorkshops);
    };

    const filterTechOrNoTechWorkshops = index => {

        const techWorkshops = workshopss.filter(
            (item) =>
                item?.workshop?.toUpperCase() === workshopsCategories[index].name
        )[0]?.workshops.filter((value) =>
            value?.isTechnical === 'true'
        );
        setTechnicalWorkshopss(techWorkshops);
        console.log(technicalWorkshopss, "technical ones")

    };


    React.useEffect(() => {
        //filterWorkshop(0);
        filterTechOrNoTechWorkshops(0);
    }, [workshopss]);

    return (
        <View
            style={{
                height: '100%',
                backgroundColor: COLORS.white
            }}
        >
            <Layout>

                <LayoutHeader
                    icon={icons.workshop}
                    title="Workshops"
                    onPress={navigation.goBack}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={style.mainContainer}>
                        {/* Render all the categories */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 20,
                            }}
                        >
                            {workshopsCategories.map((item, index) => (
                                <View
                                    key={"workshop" + index}
                                    style={{
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSeletedCategoryIndex(index);
                                            filterTechOrNoTechWorkshops(index);
                                        }}
                                        style={[
                                            style.categoryBtn,
                                            {
                                                backgroundColor:
                                                    selectedCategoryIndex === index
                                                        ? COLORS.primary
                                                        : COLORS.white,
                                            },
                                        ]}
                                    >
                                        <Image
                                            source={icons.session1}
                                            resizeMode="contain"
                                            style={{
                                                width: 39,
                                                height: 40,
                                                tintColor:
                                                    selectedCategoryIndex === index
                                                        ? COLORS.black
                                                        : COLORS.primary,
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

                                    <Card workshop={item} navigation={navigation}/>
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </View>

    );
};

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        minHeight: height,
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
    },
    categoryBtn: {
        height: 100,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        elevation: 8,
    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginHorizontal: 2,
    },
    cardDetailsContainer: {
        height: 150,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: "center",
    },
    cardImageContainer: {
        height: 140,
        width: 140,
        backgroundColor: COLORS.lightGray2,
        borderRadius: 40,
    },
});
export default HomeScreen;
