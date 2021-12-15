import React, {LegacyRef, useRef} from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faDirections, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import {CATEGORIES, USE_SITUM_DIRECTIONING} from "../../constants/map";

const styles = StyleSheet.create({
	bottomBar: {
		position: "absolute",
		height: 60,
		bottom: 0,
		width: "100%",
		padding: 10,
		alignItems: "center",
	},
	bottomBarContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		height: "100%",
	},
	bottomBarText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 15,
		marginLeft: 12,
		width: "90%",
	},
	placeDirectionButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		backgroundColor: "#93854A",
		marginLeft: "auto",
		paddingHorizontal: 15,
		width: 140,
		height: 40,
	},
	exitNavigationButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		marginLeft: "auto",
		paddingHorizontal: 15,
		backgroundColor: "#E70000",
		borderColor: "#FFFFFF",
		borderWidth: 1,
		width: 140,
		height: 40,
	},
	placeContainer: {
		backgroundColor: "#FFFFFF",
		padding: 9,
	},
	placeImagesContainer: {
		width: "100%",
		height: 100,
	},
	placeImage: {
		height: 100,
		width: 150,
		borderRadius: 10,
		marginRight: 5,
	},
	placeDescription: {
		color: "#2D2D2D",
		marginBottom: 10,
	},
	bottomSheetContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	draggableIconContainer: {
		padding: 30,
		paddingTop: 8,
		position: "absolute",
		backgroundColor: "transparent",
		zIndex: 1,
	},
	draggableIcon: {
		width: 35,
		height: 5,
		borderRadius: 3,
		backgroundColor: "#FFFFFF",
		alignSelf: "center",
	},
});

const BottomSheet = (props: any) => {
	const RBSheetRef: LegacyRef<RBSheet> = useRef(null);

	return (
		<>
			<View style={[styles.bottomBar, {backgroundColor: !props.isPositionInsideBuilding ? "#EC3E0ECC" : "#D0BB6DCC"}]}>
				{props.selectedPointsOfInterest && (
					<View style={styles.draggableIconContainer} onTouchStart={() => {
						if (props.selectedPointsOfInterest) (RBSheetRef.current as any).open()
					}}>
						<View style={styles.draggableIcon}/>
					</View>
				)}
				<View style={styles.bottomBarContent}>
					{props.isPositioningInProgress && !props.selectedPointsOfInterest && (
						<>
							<ActivityIndicator size={27} color="#FFFFFF"/>
							<Text style={styles.bottomBarText}>Obtaining position...</Text>
						</>
					)}
					{props.selectedPointsOfInterest && (
						<>
							<FontAwesomeIcon
								icon={CATEGORIES[props.selectedPointsOfInterest.category.poiCategoryName].icon}
								color={"#FFFFFF"} size={25}/>
							<Text style={[styles.bottomBarText, {width: "50%"}]} numberOfLines={1} ellipsizeMode="tail">{props.selectedPointsOfInterest.poiName}</Text>
							{USE_SITUM_DIRECTIONING && !props.polylineLatlng && (
								<TouchableOpacity
									disabled={props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading}
									style={[styles.placeDirectionButton, {opacity: props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading ? 0.3 : 1}]}
									onPress={() => {
										props.getDirectionToPOI(props.selectedPointsOfInterest.identifier)
									}}>
									{props.isDirectionLoading && (
										<ActivityIndicator size={27} color="#FFFFFF"/>
									)}
									{!props.isDirectionLoading && (
										<>
											<FontAwesomeIcon icon={faDirections} color={"#FFFFFF"}
											                 style={{marginRight: 5}}/>
											<Text style={{color: "#FFFFFF"}}>Get direction</Text>
										</>
									)}
								</TouchableOpacity>
							)}
							{props.polylineLatlng && (
								<TouchableOpacity style={styles.exitNavigationButton} onPress={() => {
									props.onPlaceUnselected()
								}}>
									<Text style={{color: "#FFFFFF"}}>Exit navigation</Text>
								</TouchableOpacity>
							)}
						</>
					)}
					{!props.isPositioningInProgress && !props.selectedPointsOfInterest && (
						<>
							<FontAwesomeIcon icon={faInfoCircle} color={"#FFFFFF"} size={25}/>
							<Text style={styles.bottomBarText} numberOfLines={2} ellipsizeMode="tail">{props.isPositionInsideBuilding ?
								props.userInGeofence ? "You're inside «" + props.userInGeofence.name + "»" : " You're inside «" + props.buildingName + "»"
								: "You're outside «" + props.buildingName + "» !"
							}</Text>
						</>
					)}
				</View>
			</View>
			{props.selectedPointsOfInterest && (
				<RBSheet
					ref={RBSheetRef}
					height={300}
					openDuration={250}
					closeOnDragDown={true}
					dragFromTopOnly={true}
					closeOnPressMask={true}
					customStyles={{
						draggableIcon: {
							backgroundColor: "#D0BB6D",
						}
					}}
				>
					<View style={styles.bottomSheetContainer}>
						<FontAwesomeIcon icon={CATEGORIES[props.selectedPointsOfInterest.category.poiCategoryName].icon}
						                 color={"#D0BB6D"} size={25}/>
						<Text style={[styles.bottomBarText, {
							fontSize: 20,
							color: "#D0BB6D"
						}]}>{props.selectedPointsOfInterest.poiName}</Text>
						{USE_SITUM_DIRECTIONING && !props.polylineLatlng && (
							<TouchableOpacity
								disabled={props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading}
								style={[styles.placeDirectionButton, {opacity: props.isPositioningInProgress || !props.isPositionInsideBuilding || props.isDirectionLoading ? 0.3 : 1}]}
								onPress={() => {
									(RBSheetRef.current as any).close();
									props.getDirectionToPOI(props.selectedPointsOfInterest.identifier)
								}}>
								{props.isDirectionLoading && (
									<ActivityIndicator size={27} color="#FFFFFF"/>
								)}
								{!props.isDirectionLoading && (
									<>
										<FontAwesomeIcon icon={faDirections} color={"#FFFFFF"}
										                 style={{marginRight: 5}}/>
										<Text style={{color: "#FFFFFF"}}>Get direction</Text>
									</>
								)}
							</TouchableOpacity>
						)}
						{props.polylineLatlng && (
							<TouchableOpacity style={styles.exitNavigationButton} onPress={() => {
								props.onPlaceUnselected()
							}}>
								<Text style={{color: "#FFFFFF"}}>Exit navigation</Text>
							</TouchableOpacity>
						)}
					</View>
					<View style={styles.placeContainer}>
						{-1 === ["", null].indexOf(props.selectedPointsOfInterest.description) && (
							<Text style={styles.placeDescription}>{props.selectedPointsOfInterest.description}</Text>
						)}
						{0 != props.selectedPointsOfInterest.images.length && (
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
							            style={styles.placeImagesContainer}>
								{props.selectedPointsOfInterest.images.map((image: string, index: number) => (
									<Image key={index} style={styles.placeImage} resizeMode={"cover"}
									       source={{uri: image}} loadingIndicatorSource={undefined} fadeDuration={700}/>
								))}
							</ScrollView>
						)}
					</View>
				</RBSheet>
			)}
		</>
	);
}

export default BottomSheet;