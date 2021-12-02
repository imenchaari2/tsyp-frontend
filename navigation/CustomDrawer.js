import React from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {DrawerContentScrollView,createDrawerNavigator} from "@react-navigation/drawer";
import {images, COLORS, SIZES, FONTS,constants} from "../constants";
import {Feedback, MainLayout} from "../appComponents/screens";
import icons from "../constants/icons";
import UserProfile from "../appComponents/screens/User-profile";
import Notifications from "../appComponents/screens/Notifications";
import TsypPlan from "../appComponents/screens/Tsyp-Plan";
import Workshops from "../appComponents/screens/Workshops";
import Speakers from "../appComponents/screens/Speakers";
import News from "../appComponents/screens/News";
import QrCodeScanner from "../appComponents/screens/QrCodeScanner";
import Animated from "react-native-reanimated";
const Drawer = createDrawerNavigator()

const CustomDrawerItem = ({label, icon , isFocused,onPress}) =>{
    return(
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 36,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: 18,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.doree : null
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width:20,
                    height:20,
                    tintColor: COLORS.white
                }}
            />
            <Text
                style={{
                    marginLeft:15,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation}) =>{
    return(
        <DrawerContentScrollView
            scrollEnabled = {true}
            contentContainerStyle = {{flex: 1}}
        >
            <View
                style={{
                    flex:1,
                    paddingHorizontal: SIZES.radius,

                }}
            >
                {/*close*/}
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >

                    <TouchableOpacity
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                        onPress={() =>navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={{
                                height:35,
                                width:35,
                                tintColor: COLORS.white
                            }}
                        />

                    </TouchableOpacity>



                </View>
                {/*profile*/}

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress={() =>console.log("Profile")}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.doree,
                                ...FONTS.h3
                            }}
                        >TSYP Edition 9th</Text>
                        <Text
                            style={{
                                color: COLORS.doree,
                                ...FONTS.h5
                            }}
                        >Welcome dear attendee</Text>
                    </View>

                </TouchableOpacity>
                {/*drawer Items*/}
                <ScrollView>
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding
                    }}
                >
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        onPress={()=> {
                            navigation.navigate("home")
                        }}

                    />
                    <CustomDrawerItem
                        label={constants.screens.userProfile}
                        icon={icons.profile}
                        onPress={()=> {
                            navigation.navigate("userProfile")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                        onPress={()=>{
                            navigation.navigate("Notification")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.tsypPlan}
                        icon={icons.plan}
                        onPress={()=> {
                            navigation.navigate("TsypPlan")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.qrCodeScanner}
                        icon={icons.qrcode}
                        onPress={()=> {
                            navigation.navigate("QrCode")
                        }}
                    />

                    {/*divider*/}
                    <View
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            backgroundColor: COLORS.doree
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.workshops}
                        icon={icons.workshop}
                        onPress={()=> {
                            navigation.navigate("workshops")
                        }}

                    />
                    <CustomDrawerItem
                        label={constants.screens.speakers}
                        icon={icons.speaker}
                        onPress={()=> {
                            navigation.navigate("Speakers")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.trackingMap}
                        icon={icons.trackingMap}
                        onPress={()=> {
                            navigation.navigate("TrackingMap")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.checkIn}
                        icon={icons.checkIn}
                        onPress={()=> {
                            navigation.navigate("checkIn")
                        }}
                    />
                    <CustomDrawerItem
                        label="Feedback"
                        icon={icons.star}
                        onPress={()=> {
                            navigation.navigate("Feedback")
                        }}
                    />
                    <View
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            backgroundColor: COLORS.doree
                        }}
                    />

                {/*logout*/}
                <View
                    style={{
                        marginBottom: SIZES.padding,
                    }}
                >
                    <CustomDrawerItem
                        label="Logout"
                        icon={icons.logout}
                        onPress={()=> {
                            navigation.navigate("OnBoarding")
                        }}
                    />
                </View>

                </View>
                </ScrollView>

            </View>

        </DrawerContentScrollView>
    )
}
const CustomDrawer = ()=> {
    const [progress, setProgress] = React.useState(new Animated.Value(0))
    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    })
    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 40]
    })
    const animatedStyle = {borderRadius, transform: [{scale}]}
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={{
                    flex: 1,
                    width: '65%',
                    paddingRight: 20,
                    paddingLeft: 10,
                    backgroundColor: COLORS.black
                }}
                sceneContainerStyle={{
                    backgroundColor: COLORS.black
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)

                    return (
                        <CustomDrawerContent

                            navigation={props.navigation}


                        />
                    )
                }}
            >
                <Drawer.Screen name="Home">
                    {props => <MainLayout {...props}
                                          drawerAnimationStyle={animatedStyle}/>}
                </Drawer.Screen>
                <Drawer.Screen name="userProfile">
                    {props => <UserProfile {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="notifications">
                    {props => <Notifications {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="Tsyp Plan">
                    {props => <TsypPlan {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="workshops">
                    {props => <Workshops {...props}
                                         drawerAnimationStyle={animatedStyle}/>}
                </Drawer.Screen>
                <Drawer.Screen name="speakers">
                    {props => <Speakers {...props}
                                        drawerAnimationStyle={animatedStyle}/>}
                </Drawer.Screen>
                <Drawer.Screen name="tracking map">
                    {props => <MainLayout {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="News">
                    {props => <News {...props}
                                    drawerAnimationStyle={animatedStyle}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Qr Code Scanner">
                    {props => <QrCodeScanner {...props} />}
                </Drawer.Screen>
                <Drawer.Screen name="Feedback">
                    {props => <Feedback {...props} />}
                </Drawer.Screen>

            </Drawer.Navigator>

        </View>
    )
}

export default CustomDrawer;


