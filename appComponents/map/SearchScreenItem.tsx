import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {CATEGORIES, USE_SITUM_DIRECTIONING} from "../../constants/map";
import {faDirections} from "@fortawesome/free-solid-svg-icons";
import React, {memo} from "react";

const styles = StyleSheet.create({
	placeContainer: {
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 7,
		borderBottomColor: "#F5F5F5",
		padding: 9,
	},
	placeImagesContainer: {
		width: "100%",
		height: 100,
		marginBottom: 10,
	},
	placeImage: {
		height: 100,
		width: 150,
		borderRadius: 10,
		marginRight: 5,
	},
	placeTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 7,
		color: "#655a5a",
		width: "85%",
	},
	placeDescription: {
		color: "#8b3a3a",
	},
	placeIcon: {
		borderWidth: 1,
		borderRadius: 100,
		borderColor: "#E7E7E7",
		padding: 10,
	},
	placeDirectionButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#E7E7E7",
		borderWidth: 1,
		borderRadius: 100,
		marginTop: 10,
		paddingHorizontal: 15,
		height: 40,
	},
});

const SearchScreenItem: any = (props: any) => {
	return (<View style={styles.placeContainer}>
		{0 != props.item.images.length && (
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.placeImagesContainer}>
				{props.item.images.map((image: string, index: number) => (
					<Image key={index} style={styles.placeImage} resizeMode={"cover"} source={-1 === ["", null, undefined].indexOf(image) ? {uri: image} : require("./../../assets/images/placeholder-image.jpg")} loadingIndicatorSource={undefined} fadeDuration={700}/>
				))}
			</ScrollView>
		)}
		<TouchableOpacity onPress={() => props.onPlaceSelected(props.item.identifier)}>
			<View style={{
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between"
			}}>
				<Text style={styles.placeTitle} numberOfLines={1} ellipsizeMode="tail">{props.item.poiName}</Text>
				<View style={styles.placeIcon}>
					<FontAwesomeIcon icon={CATEGORIES[props.item.category.poiCategoryName].icon} color={"#D0BB6D"}/>
				</View>
			</View>
			{-1 === ["", null].indexOf(props.item.description) && (
				<Text style={styles.placeDescription}>{props.item.description}</Text>
			)}
			{USE_SITUM_DIRECTIONING && (<TouchableOpacity
				disabled={props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading}
				style={[styles.placeDirectionButton, {opacity: props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading ? 0.3 : 1}]}
				onPress={() => props.getDirectionToPOI(props.item.identifier)}>
				{props.isDirectionLoading && (
					<ActivityIndicator size={27}/>
				)}
				{!props.isDirectionLoading && (
					<>
						<FontAwesomeIcon icon={faDirections} color={"#D0BB6D"} style={{marginRight: 5}}/>
						<Text>Get direction</Text>
					</>
				)}
			</TouchableOpacity>)}
		</TouchableOpacity>
	</View>);
};

export default memo(SearchScreenItem);
