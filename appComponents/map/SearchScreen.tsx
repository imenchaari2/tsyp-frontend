import React, {useEffect} from "react";
import {
	ActivityIndicator,
	Animated,
	BackHandler,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faDirections, faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {CATEGORIES, USE_SITUM_DIRECTIONING} from "../../constants/map";

const styles = StyleSheet.create({
	list: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "#F5F5F5",
		paddingTop: 70,
	},
	categoryButtonsContainer: {
		marginVertical: 9,
		height: 50
	},
	categoryButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#D0BB6D",
		borderRadius: 100,
		height: 50,
		paddingHorizontal: 15,
		marginLeft: 8,
		marginRight: 3,
	},
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
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 7,
		color: "#2D2D2D",
		width: "85%",
	},
	placeDescription: {
		color: "#2D2D2D",
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
	noPlaceContainer: {
		position: "absolute",
		alignSelf: "center",
		alignItems: "center",
		top: 150,
	},
	noPlaceTitle: {
		fontSize: 20,
		marginTop: 10,
		color: "#727272",
	},
});

const SearchScreen = (props: any) => {
	const Item = ({id, name, category, description, images}: any) => (
		<View style={styles.placeContainer}>
			{0 != images.length && (
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
				            style={styles.placeImagesContainer}>
					{images.map((image: string, index: number) => (
						<Image key={index} style={styles.placeImage} resizeMode={"cover"} source={{uri: image}}
						       loadingIndicatorSource={undefined} fadeDuration={700}/>
					))}
				</ScrollView>
			)}
			<TouchableOpacity onPress={() => props.onPlaceSelected(id)}>
				<View style={{
					width: "100%",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between"
				}}>
					<Text style={styles.placeTitle} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
					<View style={styles.placeIcon}>
						<FontAwesomeIcon icon={CATEGORIES[category].icon} color={"#D0BB6D"}/>
					</View>
				</View>
				{-1 === ["", null].indexOf(description) && (
					<Text style={styles.placeDescription}>{description}</Text>
				)}
				{USE_SITUM_DIRECTIONING && (<TouchableOpacity
					disabled={props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading}
					style={[styles.placeDirectionButton, {opacity: props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading ? 0.3 : 1}]}
					onPress={() => {
						props.getDirectionToPOI(id)
					}}>
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
		</View>
	);
	const renderItem: any = ({item}: any) => {
		if (
			"" === props.searchPhrase // when no input, show all
			|| item.category.poiCategoryName.includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, "")) // filter of the category
			|| item.poiName.toUpperCase().trim().includes(props.searchPhrase.toUpperCase().trim()) // filter of the name
			|| item.infoHtml.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, "")) // filter of the description
		) {
			return <Item id={item.identifier} name={item.poiName} description={item.description} category={item.category.poiCategoryName} images={item.images}/>;
		}
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				props.onSearchScreenVisibilityChange(false);

				return true;
			}
		);

		return () => {
			backHandler.remove();
		};
	}, []);

	return (
		<Animated.View style={[styles.list, {opacity: props.opacity}]}>
			{0 === props.searchPhrase.length && (
				<>
					<View style={styles.categoryButtonsContainer}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
							{Object.keys(CATEGORIES).map((category: any, index: number) => (
								<TouchableOpacity key={index} style={styles.categoryButton} onPress={() => props.setSearchPhrase(category)}>
									<FontAwesomeIcon icon={CATEGORIES[category].icon} color={"black"} style={{marginRight: 5}}/>
									<Text>{category}</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</>
			)}
			<View style={styles.noPlaceContainer}>
				<FontAwesomeIcon icon={faMapMarkedAlt} size={50} color={"#727272"} />
				<Text style={styles.noPlaceTitle}>No point of interest found !</Text>
			</View>
			{props.selectedPointsOfInterest && (
				<Item id={props.selectedPointsOfInterest.identifier} name={props.selectedPointsOfInterest.poiName} description={props.selectedPointsOfInterest.description} category={props.selectedPointsOfInterest.category.poiCategoryName} images={props.selectedPointsOfInterest.images}/>
			)}
			{!props.selectedPointsOfInterest && (
				<FlatList
					data={props.pointsOfInterest}
					renderItem={renderItem}
					keyExtractor={(item) => item.identifier}
					keyboardShouldPersistTaps={"handled"}
				/>
			)}
		</Animated.View>
	);
};

export default SearchScreen;