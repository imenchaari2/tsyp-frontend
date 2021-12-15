import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
	container: {
		borderColor: "#525252",
		borderWidth: 1.2,
		borderRadius: 3,
		position: "absolute",
		alignSelf: "flex-start",
		top: 80,
		marginLeft: 9,
	},
	button: {
		height: 45,
		width: 45,
		backgroundColor: "#ffffffb3",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTextZoom: {
		textAlign: "center",
		fontSize: 27,
		fontWeight: "bold",
		fontFamily: "monospace",
	},
});

const ZoomControls = (props: any) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{...styles.button, marginBottom: 2}} onPress={() => props.onZoomPress(1)}>
				<Text style={styles.buttonTextZoom}>+</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => props.onZoomPress(-1)}>
				<Text style={styles.buttonTextZoom}>-</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ZoomControls;