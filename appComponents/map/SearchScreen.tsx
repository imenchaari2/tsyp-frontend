import React, {useEffect} from "react";
import {
	Animated,
	BackHandler,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {CATEGORIES} from "../../constants/map";
import SearchScreenItem from "./SearchScreenItem";

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
	const renderItem: any = ({item}: any) => {
		if (
			"" === props.searchPhrase // when no input, show all
			|| item.category.poiCategoryName.includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, "")) // filter of the category
			|| item.poiName.toUpperCase().trim().includes(props.searchPhrase.toUpperCase().trim()) // filter of the name
		) {
			return (
				<SearchScreenItem item={item} onPlaceSelected={props.onPlaceSelected} isPositioningInProgress={props.isPositioningInProgress} isPositionInsideBuilding={props.isPositionInsideBuilding} isDirectionLoading={props.isDirectionLoading} getDirectionToPOI={props.getDirectionToPOI} />
			);
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
							{Object.keys(CATEGORIES).map((category: any, index: number) => -1 === ["MEMBER"].indexOf(category) && (
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
				<SearchScreenItem item={props.selectedPointsOfInterest} onPlaceSelected={props.onPlaceSelected} isPositioningInProgress={props.isPositioningInProgress} isPositionInsideBuilding={props.isPositionInsideBuilding} isDirectionLoading={props.isDirectionLoading} getDirectionToPOI={props.getDirectionToPOI} />
			)}
			{!props.selectedPointsOfInterest && (
				<FlatList
					removeClippedSubviews={true}
					keyboardShouldPersistTaps={"handled"}
					data={props.pointsOfInterest}
					keyExtractor={(item) => item.identifier}
					renderItem={renderItem}
				/>
			)}
		</Animated.View>
	);
};

export default SearchScreen;