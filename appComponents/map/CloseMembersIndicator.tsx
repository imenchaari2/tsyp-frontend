import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CATEGORIES} from "../../constants/map";

const styles = StyleSheet.create({
	container: {
		borderColor: "#525252",
		borderWidth: 1.2,
		borderRadius: 100,
		position: "absolute",
		alignSelf: "flex-start",
		top: 190,
		marginLeft: 9,
	},
	button: {
		height: 45,
		width: 45,
		borderColor: "#525252",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTextFloor: {
		paddingVertical: 5,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "normal",
	},
});

const CloseMembersIndicator = (props: any) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, {backgroundColor: props.isCloseMembersNotLoaded ? "#EC3E0ECC" : "#006F9FCC"}]}
			>
				{props.isCloseMembersLoadingInProgress && (
					<ActivityIndicator size={30} color={"#FFFFFF"} />
				)}
				{!props.isCloseMembersLoadingInProgress && (
					<Text style={styles.buttonTextFloor}>
						<FontAwesomeIcon icon={CATEGORIES["MEMBER"].icon} size={30} color={"#FFFFFF"} />
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default CloseMembersIndicator;