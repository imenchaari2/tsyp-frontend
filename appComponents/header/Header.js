import React from "react";
import {
    View,
    Text, ImageBackground
} from 'react-native';
import {COLORS, FONTS, images} from "../../constants";
const Header = ({containerStyle, title, leftComponent, rightComponent})=>{
    return(
        <View
            style = {{
                flexDirection: 'row',
/*
                backgroundColor:COLORS.black,
*/
                ...containerStyle
            }}
        >
            {/* Left */}
            {leftComponent}
            {/* Title */}
            <View
                style = {{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style = {{
                        ...FONTS.h3
                    }}
                >
                    {title}
                </Text>

            </View>
            {/* Right */}
            {rightComponent}

        </View>
    )

}
export default Header;
