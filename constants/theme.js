import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    doree: "#f6e480",
    doree1: "#eada68",
    doree2: "rgba(250,224,136,0.36)",
    gold: "rgba(236,202,87,0.9)",
    gold1: "rgba(168,133,45,0.95)",
    primary: "#fae98f", //orange
    transparentPrimray: 'rgba(229,162,0,0.62)',
    brown: 'rgba(29,23,5,0.89)',
    brown1: 'rgba(23,22,21,0.94)',
    brown2: 'rgba(108,66,16,0.87)',
    orange: "#FFA133",
    light:"rgba(210,193,174,0.13)",
    light1:"rgba(255,238,219,0.36)",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: "rgba(153,82,51,0.96)",
    red: "#FF1717",
    red1: "rgba(170,19,19,0.81)",
    blue: '#0064C0',
    blue1: '#043d74',
    blue2: 'rgba(142,179,198,0.34)',
    darkBlue: "#111A2C",
    darkGray: "#4d565f",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: 'rgba(239,224,171,0.37)',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    white2: "#FBFBFB",
    white4: "rgba(255,251,251,0.94)",
    white3: "rgba(251,251,251,0.62)",
    white: '#FFFFFF',
    black: "#000000",
    purple: "rgba(224,122,151,0.98)",

    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)"

};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 10,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle },
    h1: {  fontSize: SIZES.h1, lineHeight: 36 },
    h2: {  fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: {  fontSize: SIZES.h4, lineHeight: 22 },
    h5: {  fontSize: SIZES.h5, lineHeight: 22 },
    body1: {  fontSize: SIZES.body1, lineHeight: 36 },
    body2: {  fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: {  fontSize: SIZES.body4, lineHeight: 22 },
    body5: {  fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
