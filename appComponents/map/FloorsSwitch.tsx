import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(215,215,215,0.7)",
		borderColor: "#525252",
		borderWidth: 1.2,
		borderRadius: 100,
		position: "absolute",
		alignSelf: "flex-start",
		bottom: 70,
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

const FloorsSwitch = (props: { floors: any[]; selectedFloorIndex: any; setSelectedFloorIndex: (arg0: any) => void; }) => {
	return (
		<View style={styles.container}>
			{props.floors.map((floor: any, index: number) => (
				<TouchableOpacity
					key={index}
					style={[styles.button, floor.floor === props.selectedFloorIndex ? {backgroundColor: "rgba(255,255,255,0.8)"} : {}]}
					onPress={() => props.setSelectedFloorIndex(floor.floor)}
				>
					<Text style={{
						...styles.buttonTextFloor,
						color: floor.floor === props.selectedFloorIndex ? "#000" : "#9a9a9a"
					}}>{floor.name}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default FloorsSwitch;