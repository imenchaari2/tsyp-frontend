import React from 'react';
import {
    View,
    Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from "../../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CustomButton, ProfileValue, TextButton} from "../../utils";


const UserProfile = ({navigation}) => {
     function renderProfileCard(){
         return(
             <View style={{
                 borderRadius: SIZES.radius,
                 backgroundColor: COLORS.black
             }}>
                 {/*profile image*/}
                 <TouchableOpacity
                    style={{
                        paddingVertical:10
                    }}
                 />
                 <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                 <Image
                    source={images.profile}
                    style={{
                        width:60,
                        height:60,
                        borderRadius: 40,
                        borderWidth: 1,

                    }}
                    resizeMode="contain"
                 />
                 {/*details*/}
                 <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        alignItems: 'flex-start'
                    }}
                 >
                     <Text
                        style={{
                            color: COLORS.doree,
                            ...FONTS.h3,
                            fontWeight: 'bold'
                        }}
                     >
                         TSYP 9TH
                     </Text>
                     <Text
                         style={{
                             color: COLORS.white,
                             ...FONTS.body5
                         }}
                     >
                         Please fill your profile content
                     </Text>
                     <CustomButton
                         buttonText="+ Fill in your details"
                         buttonContainerStyle={{
                             height:35,
                             marginTop: 10,
                             paddingHorizontal: SIZES.radius,
                             borderRadius: 20,
                             marginBottom:20,
                             backgroundColor: COLORS.white
                         }}
                         colors={ [COLORS.white2 , COLORS.doree]}
                         onPress={()=>navigation.navigate("ProfileContent")}
                     />
                 </View>

                 </View>

             </View>
         )
     }
     function renderProfileSection1(){
         return(
             <View
                style={style.profileSectionContainer}
             >
                 <ProfileValue
                 icon={icons.profile}
                 label="Full Name"
                 value="Imen Chaari"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.email}
                     label="Email"
                     value="imen.chaari@enis.tn"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.phone}
                     label="Phone number"
                     value="50586370"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.email}
                     label="User Id"
                     value="11127396"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.email}
                     label="Student Branch"
                     value="Enis student branch"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.email}
                     label="Occupation"
                     value="IT coordinator"
                 />

             </View>
         )
     }
     function renderProfileSection2(){
         return(
             <View
                 style={style.profileSectionContainer}
             >
                 <ProfileValue
                     icon={icons.checkIn}
                     label="Hotel"
                     value="Diar lemdina"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.home}
                     label="Room number"
                     value="1496"
                 />
                 <View
                     style={{
                         height: 2,
                         backgroundColor: COLORS.lightGray1,
                     }}
                 />
                 <ProfileValue
                     icon={icons.email}
                     label="Room shared with"
                     value="Nessrine Aloulou && Yosr ben yahia"
                 />


             </View>
         )
     }


    return (
        <View
            style={{

                flex: 1,
                backgroundColor: COLORS.white


            }}
        >
            <View style={{flexDirection: 'row',
                padding: 20,
                marginTop: 20,
                justifyContent: 'space-between',
                backgroundColor: COLORS.white}}>

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
                        padding : 5
                    }}

                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight:'bold',
                        flex:1,
                        color: COLORS.gold,
                        fontSize: 18,
                        marginTop: 10,


                    }}
                >Profile content</Text>
                <TouchableOpacity
                    style = {{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}
                >
                    <Image
                        source ={images.user}
                        style={{
                            width: 49,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}

                    />
                </TouchableOpacity>

            </View>
            <ScrollView  showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 150
                }}
                >
            {renderProfileCard()}
                {/*profile section*/}
                {renderProfileSection1()}
                {renderProfileSection2()}

            </ScrollView>
        </View>

    )
}
const style = StyleSheet.create({

    profileSectionContainer: {
        marginTop: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray2,
        /*backgroundColor: COLORS.white2,*/
        paddingHorizontal: SIZES.padding,
        color: COLORS.gray,
        fontSize: 15,
        fontWeight:'bold',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white
    }

});
export default UserProfile;
