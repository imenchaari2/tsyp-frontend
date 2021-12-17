import React, {useEffect, useRef, useState} from "react";
import {
	ActivityIndicator, Animated,
	BackHandler,
	Keyboard,
	NativeEventSubscription,
	StyleSheet, ToastAndroid,
	View
} from "react-native";
import {
	Camera,
	LatLng,
	MapEvent,
	Marker,
	Overlay,
	Polygon,
	Polyline,
	Region,
	UrlTile
} from "react-native-maps";
import MapView from "react-native-map-clustering";
import SearchBar from "../map/SearchBar";
import FloorsSwitch from "../map/FloorsSwitch";
import ZoomControls from "../map/ZoomControls";
import MyPositionButton from "../map/MyPositionButton";
import SearchScreen from "../map/SearchScreen";
import BottomSheet from "../map/BottomSheet";
import {CATEGORIES, CLOSE_MEMBERS_REFRESH_RATE} from "../../constants/map";
import CurrentPositionMarker from "../map/CurrentPositionMarker";
import {
	fetchBuildingInfo,
	requestDirections,
	requestPermissions,
	startPositioning,
	stopPositioning
} from "../../api/Location";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {fetchCloseMembers} from "../../api/Backend";
import CloseMembersIndicator from "../map/CloseMembersIndicator";

const styles = StyleSheet.create({
	mapview: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		bottom: -25,
	},
	loader: {
		position: "absolute",
		alignSelf: 'center',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
});

const TrackingMap = () => {
	let backHandler: NativeEventSubscription | null = null;
	const mapRef: any = useRef(null);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [positioningTimer, setPositioningTimer] = useState<number>(1);
	const [isDirectionLoading, setIsDirectionLoading] = useState<boolean>(false); // checks if the direction loading indicator is visible
	const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false); // checks if the search is clicked
	const [isPositionInsideBuilding, setIsPositionInsideBuilding] = useState<boolean>(false); // checks if the user is outside building
	const [isCloseMembersLoadingInProgress, setIsCloseMembersLoadingInProgress] = useState<boolean>(false); // checks if loading close members is in progress
	const [isCloseMembersNotLoaded, setIsCloseMembersNotLoaded] = useState<boolean>(true); // checks if loading close members has error
	const [isCloseMembersActive, setIsCloseMembersActive] = useState<boolean>(true); // checks if close members are active
	const [isPositioningInProgress, setIsPositioningInProgress] = useState<boolean>(true); // checks if positioning is in progress
	const [isMapCentred, setIsMapCentred] = useState<boolean>(false); // checks if the map is centred to the current position
	const [isFollowUserLocationActive, setIsFollowUserLocationActive] = useState<boolean>(false); // checks if the map follows the current position
	const [searchPhrase, setSearchPhrase] = useState<string>(""); // search phrase
	const [lastValidCamera, setLastValidCamera] = useState<LatLng | null>(null); //
	const [building, setBuilding] = useState<any>(null); // the building object
	const [buildingPoints, setBuildingPoints] = useState<any>(null); // the building object
	const [floors, setFloors] = useState<any>([]); // array of floors
	const [pointsOfInterest, setPointsOfInterest] = useState<any>([]); // array of points of interest
	const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0); // the selected floor's index
	const [geofences, setGeofences] = useState<any>([]); // array of geofences
	const [closeMembersCoordinates, setCloseMembersCoordinates] = useState<any>([]); // array of close members coordinates
	const [selectedPointsOfInterest, setSelectedPointsOfInterest] = useState<any>(null); // the selected point of interest
	const [selectedGeofence, setSelectedGeofence] = useState<any>(null); // the selected geofence
	const [polylineLatlng, setPolylineLatlng] = useState<any>(null);
	const [userInGeofence, setUserInGeofence] = useState<any>(null); // the geofence where the user is
	const [currentPosition, setCurrentPosition] = useState<any>(null); // user's current position (coordinates)
	const getBuildingInfo: Function = (): void => {
		fetchBuildingInfo((buildingInfo: any) => {
			// console.log(JSON.stringify(buildingInfo)) TODO : remove this line
			setBuilding(buildingInfo.building); // setting building object
			setLastValidCamera(buildingInfo.building.center);
			if (0 < buildingInfo.floors.length) {
				setFloors(buildingInfo.floors);
				setSelectedFloorIndex(buildingInfo.floors[0].floor);
			} // setting floors array
			if (0 < buildingInfo.geofences.length) {
				const list = [];

				for (let geofence of buildingInfo.geofences) {
					geofence.points = [];
					for (let polygon of geofence.polygonPoints) {
						delete polygon.buildingIdentifier;
						delete polygon.cartesianCoordinate;
						delete polygon.floorIdentifier;
						delete polygon.isIndoor;
						delete polygon.isOutdoor;
						geofence.points.push({
							latitude: polygon.coordinate.latitude,
							longitude: polygon.coordinate.longitude,
						});
					}
					if ("BUILDING" === geofence.name) {
						setBuildingPoints(geofence.points);
					} else {
						list.push(geofence);
					}
				}
				setGeofences(list);
			}  // setting geofences array
			if (0 < buildingInfo.indoorPOIs.length) {
				for (let poi of buildingInfo.indoorPOIs) {
					poi.images = poi.customFields ? [poi.customFields.image1, poi.customFields.image2, poi.customFields.image3, poi.customFields.image4, poi.customFields.image5].filter(elem => null != elem) : []
					poi.description = poi.infoHtml.replace(/<[^>]*>?/gm, "");
					poi.category.poiCategoryName = poi.category.poiCategoryName.toUpperCase();
				}
				setPointsOfInterest(buildingInfo.indoorPOIs);
			} // setting pointsOfInterest array
		});
	};
	const subscribePositioning: Function = (): any => {
		setIsPositioningInProgress(true);

		const subscriptionId: number = startPositioning((location: any) => {
			// console.log(location.coordinate)
			setIsPositioningInProgress(false);
			setCurrentPosition(location);
		}, () => {
			unsubscribePositioning(subscriptionId);
			setIsPositioningInProgress(true);
		});

		return subscriptionId;
	};
	const unsubscribePositioning: Function = (subscriptionId: any): void => {
		stopPositioning(subscriptionId);
		setIsPositioningInProgress(false);
	};
	const getCloseMembers: Function = (coordinate: LatLng): void => {
		const timer = positioningTimer - 1;

		if (!isCloseMembersActive) {
			return;
		}
		setPositioningTimer(timer);
		if (0 === timer) {
			setPositioningTimer(CLOSE_MEMBERS_REFRESH_RATE);
			setIsCloseMembersLoadingInProgress(true);
			fetchCloseMembers(coordinate, (coordinates: any) => {
				if (Array.isArray(coordinates)) {
					console.log('membersCoordinates: ',coordinates.length); // TODO remove this line
					setCloseMembersCoordinates(coordinates);
				} else {
					setCloseMembersCoordinates([]);
				}
				setIsCloseMembersLoadingInProgress(false);
				setIsCloseMembersNotLoaded(false);
			}, () => {
				setCloseMembersCoordinates([]);
				setIsCloseMembersLoadingInProgress(false);
				setIsCloseMembersNotLoaded(true);
			});
		}
	};
	const getDirectionToPOI: Function = (id: string): void => {
		const coordinate = onPlaceSelected(id);

		setIsDirectionLoading(true);
		const points = [
			{
				floorIdentifier: floors[selectedFloorIndex].floorIdentifier,
				buildingIdentifier: building.buildingIdentifier,
				coordinate: currentPosition.coordinate,
			},
			{
				floorIdentifier: floors[selectedFloorIndex].floorIdentifier,
				buildingIdentifier: building.buildingIdentifier,
				coordinate: coordinate,
			}
		];

		requestDirections(
			[building, ...points],
			(route: any) => {
				let latlngs = [];

				for (let segment of route.segments) {
					for (let point of segment.points) {
						latlngs.push({
							latitude: point.coordinate.latitude,
							longitude: point.coordinate.longitude,
						});
					}
				}
				setIsDirectionLoading(false);
				setPolylineLatlng(latlngs);
				onSearchScreenVisibilityChange(false);
				centerToCurrentPosition(true);
			},
			() => {
				setIsDirectionLoading(false);
			}
		);
	}; // gets direction from current position to a selected destination
	const centerToCoordinate: Function = (coordinate: LatLng, heading: number | null = null, pitch: number | null = null, zoom: number | null = null): void => {
		const camera: any = {center: coordinate};

		if (null !== heading) {
			camera.heading = heading;
		}
		if (null !== pitch) {
			camera.pitch = pitch;
		}
		if (null !== zoom) {
			camera.zoom = zoom;
		}
		mapRef?.current?.animateCamera(camera);
	}; // centers the map on a given coordinates
	const centerToCurrentPosition: Function = (followPosition: boolean): void => {
		if (isPositionInsideBuilding && !isPositioningInProgress) {
			setIsFollowUserLocationActive(followPosition);
			centerToCoordinate(
				currentPosition.coordinate,
				followPosition ? currentPosition.bearing.degrees : 0,
				followPosition ? 40 : 0,
				followPosition ? 19 : 18,
			);
		}
	}; // centers the map to the current user position (if the position is inside the building)
	const isPointInsideGeofence: Function = (point: any, vs: any): boolean => {
		const x = point.latitude, y = point.longitude;
		let inside = false;

		for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			const xi = vs[i].latitude, yi = vs[i].longitude;
			const xj = vs[j].latitude, yj = vs[j].longitude;
			const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) inside = !inside;
		}

		return inside;
	}; // checks if a point on the map is inside a geofence
	const checkCurrentPositionInsideGeofence: Function = (coordinate: LatLng): void => {
		let userInside = null;

		if (buildingPoints) {
			if (!isPointInsideGeofence(coordinate, buildingPoints)) {
				setIsPositionInsideBuilding(false);
			} else {
				setIsPositionInsideBuilding(true);
				for (let geofence of geofences) {
					if (isPointInsideGeofence(coordinate, geofence.points)) {
						userInside = geofence;
						break;
					}
				}
			}
		}
		setUserInGeofence(userInside);
	}; // checks if the current position is inside geofence
	const onMapPress: Function = (event: MapEvent): void => {
		if (!polylineLatlng) {
			for (let geofence of geofences) {
				if (geofence.floorIdentifier === floors[selectedFloorIndex].floorIdentifier && isPointInsideGeofence((event as any).nativeEvent.coordinate, geofence.points)) {
					const pointOfInterest = pointsOfInterest.find((elem: any) => elem.poiName === geofence.name);

					if (pointOfInterest) {
						onPlaceSelected(pointOfInterest.identifier);
					}
					break;
				}
			}
		}
	}; // triggers when user press inside map to get information about geofence
	const onMapRegionChangeComplete: Function = (region: Region): void => {
		if (buildingPoints) {
			if (isPointInsideGeofence({latitude: region.latitude, longitude: region.longitude}, buildingPoints)) {
				setLastValidCamera({latitude: region.latitude, longitude: region.longitude});
				setIsMapCentred(
					null != currentPosition
					&& region.latitude.toFixed(5) === currentPosition.coordinate.latitude.toFixed(5)
					&& region.longitude.toFixed(5) === currentPosition.coordinate.longitude.toFixed(5)
				);
			} else
			if (lastValidCamera) {
				centerToCoordinate(lastValidCamera);
				ToastAndroid.show("Please stay on " + building.name + " map", ToastAndroid.SHORT);
			}
		}
	}; // triggers when user finish swiping on the map
	const onMapTouchStart: Function = (): void => {
		if (isFollowUserLocationActive) {
			setIsFollowUserLocationActive(false);
		}
	}; // triggers when user touch the map
	const onZoomPress: Function = (zoom: number): void => {
		mapRef?.current?.getCamera().then((cam: Camera) => {
			cam.zoom += zoom;
			mapRef?.current?.animateCamera(cam);
		});
	}; // triggers when user press zoom in or out
	const onSearchScreenVisibilityChange: Function = (visible: boolean): void => {
		if (visible) {
			setIsSearchClicked(true);
		}
		Animated.timing(fadeAnim, {
			useNativeDriver: true,
			toValue: visible ? 1 : 0,
			duration: 300,
		}).start(() => {
			if (!visible) {
				setIsSearchClicked(false);
			}
		});
	};
	const onPlaceSelected: Function = (id: string | null, closeMemberCoordinate: LatLng | null = null): any => {
		onSearchScreenVisibilityChange(false);
		setPolylineLatlng(null);
		Keyboard.dismiss();
		backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				onPlaceUnselected();

				return true;
			}
		);
		if (null !== id) {
			const pointOfInterest = pointsOfInterest.find((elem: any) => elem.identifier === id);
			let geofence = null;

			if (pointOfInterest.customFields.geofence) {
				geofence = geofences.find((elem: any) => pointOfInterest.customFields.geofence === elem.name);
			}
			setSearchPhrase(pointOfInterest.poiName);
			setSelectedPointsOfInterest(pointOfInterest);
			setSelectedGeofence(geofence);
			centerToCoordinate(pointOfInterest.coordinate, 0, 0, 19);

			return pointOfInterest.coordinate;
		} else {
			setSearchPhrase("");
			setSelectedPointsOfInterest(null);
			setSelectedGeofence(null);
			centerToCoordinate(closeMemberCoordinate, 0, 0, 19);

			return closeMemberCoordinate;
		}
	};
	const onPlaceUnselected: Function = (): void => {
		setSearchPhrase("");
		setSelectedPointsOfInterest(null);
		setSelectedGeofence(null);
		setPolylineLatlng(null);
		centerToCurrentPosition(false);
		if (backHandler) {
			backHandler.remove();
		}
	};

	useEffect(() => {
		let positioningSubscription: any = -1;

		requestPermissions().then((isPermissionsGranted: boolean) => {
			if (isPermissionsGranted) {
				positioningSubscription = subscribePositioning();
				console.log("subscribePositioning (subscriptionId=" + positioningSubscription + ")"); // TODO remove this line
				getBuildingInfo();
			}
		});

		return () => {
			if (-1 === [-1, null].indexOf(positioningSubscription)) {
				unsubscribePositioning(positioningSubscription);
				console.log("unsubscribePositioning (subscriptionId=" + positioningSubscription + ")"); // TODO remove this line
			}
		};
	}, []);
	useEffect(() => {
		if (currentPosition) {
			if (isFollowUserLocationActive) {
				centerToCurrentPosition(true);
			}
			checkCurrentPositionInsideGeofence(currentPosition.coordinate);
			getCloseMembers(currentPosition.coordinate);
		}
	}, [currentPosition]);

	return (
		<>
			{building && (
				<MapView
					ref={mapRef}
					style={styles.mapview}
					initialRegion={{...building.center, latitudeDelta: 0.005, longitudeDelta: 0.005}}
					provider={null}
					mapType="none"
					minZoomLevel={18} // TODO change to 18
					maxZoomLevel={20}
					pitchEnabled={true}
					toolbarEnabled={false}
					showsCompass={false}
					showsUserLocation={false}
					followsUserLocation={true}
					showsMyLocationButton={false}
					zoomEnabled={true}
					zoomControlEnabled={false}
					showsTraffic={false}
					showsBuildings={false}
					clusterColor={"rgba(0,111,159,0.53)"}
					onPress={(event: MapEvent) => onMapPress(event)}
					onRegionChangeComplete={(region: Region) => onMapRegionChangeComplete(region)}
					onTouchStart={() => onMapTouchStart()}
				>
					<UrlTile zIndex={-1} urlTemplate="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"/>
					{!isPositioningInProgress && null !== currentPosition && (
						<CurrentPositionMarker currentPosition={currentPosition}/>
					)}
					{floors[selectedFloorIndex] != undefined && (
						<Overlay
							// @ts-ignore
							zIndex={1000}
							image={[require("../../assets/floors/0.png")][selectedFloorIndex]} // TODO complete this line
							// image={{uri: floors[selectedFloorIndex].mapUrl, cache: "force-cache"}}
							bounds={[[building.bounds.southWest.latitude, building.bounds.southWest.longitude], [building.bounds.northEast.latitude, building.bounds.northEast.longitude],]}
							location={[building.center.latitude, building.center.longitude]}
							bearing={(building.rotation * 180) / Math.PI}
							anchor={[0.5, 0.5]}
							width={building.dimensions.width}
							height={building.dimensions.height}
							opacity={1}
						/>
					)}
					{polylineLatlng && (
						<>
							<Polyline
								coordinates={polylineLatlng}
								strokeWidth={9}
								strokeColor={"#368BCC"}
								zIndex={1001}
								style={{borderWidth: 2}}
							/>
							<Polyline
								coordinates={polylineLatlng}
								strokeWidth={6}
								strokeColor={"#67AED9"}
								zIndex={1001}
								style={{borderWidth: 2}}
							/>
						</>
					)}
					{selectedGeofence && selectedGeofence.floorIdentifier === floors[selectedFloorIndex].floorIdentifier && (
						<Polygon
							coordinates={selectedGeofence.points}
							strokeColor="#F00"
							strokeWidth={2}
							zIndex={1000}
						/>
					)}
					{!isPositioningInProgress && !selectedGeofence && userInGeofence && (
						<Polygon
							coordinates={userInGeofence.points}
							strokeWidth={3}
							strokeColor="#368BCC"
							zIndex={1000}
						/>
					)}
					<>
						{0 !== pointsOfInterest.length && pointsOfInterest.map((pointOfInterest: any) =>
							pointOfInterest.floorIdentifier === floors[selectedFloorIndex].floorIdentifier && (
								<Marker
									key={pointOfInterest.identifier}
									coordinate={pointOfInterest.coordinate}
									opacity={selectedPointsOfInterest === pointOfInterest ? 1 : 0.5}
									tracksViewChanges={false}
									onPress={() => onPlaceSelected(pointOfInterest.identifier)}
								>
									{CATEGORIES[pointOfInterest.category.poiCategoryName] && (
										<FontAwesomeIcon icon={selectedPointsOfInterest === pointOfInterest ? faMapMarkerAlt : CATEGORIES[pointOfInterest.category.poiCategoryName].icon} size={25} color={"#313131"} />
									)}
								</Marker>
							)
						)}
					</>
					{isCloseMembersActive && 0 !== closeMembersCoordinates.length && closeMembersCoordinates.map((closeMemberCoordinate: any, index: number) =>
						<Marker
							key={index}
							coordinate={closeMemberCoordinate}
							opacity={0.5}
							tracksViewChanges={false}
							onPress={() => onPlaceSelected(null, closeMemberCoordinate)}
						>
							<FontAwesomeIcon icon={CATEGORIES["MEMBER"].icon} size={30} color={"#006F9F"} />
						</Marker>
					)}
				</MapView>
			)}
			<ZoomControls onZoomPress={onZoomPress}/>
			{floors.length !== 0 && !selectedPointsOfInterest && (
				<FloorsSwitch floors={floors} selectedFloorIndex={selectedFloorIndex}
				              setSelectedFloorIndex={setSelectedFloorIndex}/>
			)}
			<CloseMembersIndicator isCloseMembersLoadingInProgress={isCloseMembersLoadingInProgress} isCloseMembersNotLoaded={isCloseMembersNotLoaded} isCloseMembersActive={isCloseMembersActive} setIsCloseMembersActive={setIsCloseMembersActive}/>
			{isPositionInsideBuilding && (
				<MyPositionButton centerToCurrentPosition={centerToCurrentPosition} isMapCentred={isMapCentred}
				                  isPositioningInProgress={isPositioningInProgress}/>
			)}
			<BottomSheet buildingName={building ? building.name : "the venue"} userInGeofence={userInGeofence}
			             polylineLatlng={polylineLatlng} selectedPointsOfInterest={selectedPointsOfInterest}
			             isPositionInsideBuilding={isPositionInsideBuilding}
			             isPositioningInProgress={isPositioningInProgress} isDirectionLoading={isDirectionLoading}
			             getDirectionToPOI={getDirectionToPOI} onPlaceUnselected={onPlaceUnselected}/>
			{isSearchClicked && (
				<SearchScreen opacity={fadeAnim} pointsOfInterest={pointsOfInterest} searchPhrase={searchPhrase}
				              polylineLatlng={polylineLatlng} setSearchPhrase={setSearchPhrase} selectedPointsOfInterest={selectedPointsOfInterest}
				              isSearchClicked={isSearchClicked} onSearchScreenVisibilityChange={onSearchScreenVisibilityChange}
				              onPlaceSelected={onPlaceSelected} isPositionInsideBuilding={isPositionInsideBuilding}
				              isPositioningInProgress={isPositioningInProgress} isDirectionLoading={isDirectionLoading}
				              getDirectionToPOI={getDirectionToPOI} onPlaceUnselected={onPlaceUnselected}/>
			)}
			<SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} isSearchClicked={isSearchClicked}
			           onSearchScreenVisibilityChange={onSearchScreenVisibilityChange}
			           setSelectedGeofence={setSelectedGeofence} onPlaceUnselected={onPlaceUnselected}/>
			{!building && (
				<View style={styles.loader}>
					<ActivityIndicator size={70} color="#93854A"/>
				</View>
			)}
		</>
	);
};

export default TrackingMap;