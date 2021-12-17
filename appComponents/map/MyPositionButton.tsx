import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCompass, faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		alignSelf: "flex-end",
		bottom: 70,
		zIndex: 0,
	},
	positionButton: {
		width: 65,
		height: 65,
		marginRight: 9,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,
		elevation: 8,
	},
});

const MyPositionButton = (props: any) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.positionButton, {backgroundColor: props.isPositioningInProgress ? "#8C8C8C" : "#93854A"}]}
				disabled={props.isPositioningInProgress}
				onPress={() => props.centerToCurrentPosition(props.isMapCentred)}>
				{props.isPositioningInProgress && (
					<ActivityIndicator size={30} color="#FFFFFF"/>
				)}
				{!props.isPositioningInProgress && (
					<FontAwesomeIcon icon={props.isMapCentred ? faCompass : faLocationArrow} color={"white"} size={25}/>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default MyPositionButton;