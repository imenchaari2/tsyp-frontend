import React from 'react';
import {
    View,
    Text, Image
} from 'react-native';
import {COLORS, FONTS, images, SIZES} from "../../constants";

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const AuthenLayout = ({title, subtitle, titleContainerStyle, children}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: SIZES.padding,

            }}
        >
            <KeyboardAwareScrollView
                onKeyboardDismissMode="on-Drag"
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/*{App icon}*/}
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <View style={{flexDirection:'row'}}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{
                            height:100,
                            width: "30%"
                        }}
                    />
                    <Image
                        source={images.nasyp}
                        resizeMode="cover"
                        style={{
                            height: 120,
                            width: '70%'
                        }}
                    />
                    </View>
                </View>
                {/*{title }*/}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        ...titleContainerStyle
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.h2,
                            fontWeight: "600"
                        }}
                    >
                        {title}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.darkGray,
                            marginTop: SIZES.base,
                            ...FONTS.body3
                        }}
                    >
                        {subtitle}
                    </Text>

                </View>
                {/*{content }*/}
                {children}
            </KeyboardAwareScrollView>


        </View>
    )
}

export default AuthenLayout;
