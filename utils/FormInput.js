import React from 'react';
import {
    View,
    Text, TextInput
} from 'react-native';
import {COLORS, FONTS, SIZES} from "../constants";
const FormInput= ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onchange,
    secureTextEntry,
    keyboardType = "defaut",
    autoCompleteType ="off",
    autocapitalize ="none",
    errorMsg ="",
    ...other
}) =>{
    return(
        <View
            style={{
                ...containerStyle
            }}>
            {/*{label & error msg}*/}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,

                        ...FONTS.body4
                    }}
                >
                    {label}
                </Text>
                <Text
                    style={{
                        color: COLORS.red,
                        ...FONTS.body4
                    }} >
                    {errorMsg}
                </Text>
            </View>
            {/*{text input}*/}
            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
borderColor:COLORS.brown1,
                    backgroundColor:COLORS.light,
                    borderWidth:0.7
                }} >
                {prependComponent}
                <TextInput
                    style={{
                        flex:1,
                        ...inputStyle
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autocapitalize}
                    onChangeText={(text)=> onchange(text)}
                    {...other}
               />
                {appendComponent}

            </View>
        </View>
    )
}
export default FormInput;
