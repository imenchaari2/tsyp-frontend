// @ts-ignore
// import SitumPlugin from "react-native-situm-plugin";
import {
	BUILDING_IDENTIFIER,
	BUILDING_INFO,
	SITUM_API_KEY,
	SITUM_CACHE_MAX_AGE,
	SITUM_EMAIL,
	SITUM_LOCATION_OPTIONS,
	USE_SITUM_DIRECTIONING,
	POSITIONING_PROVIDER,
	FETCH_BUILDING_FROM_CACHE,
	LEGACY_LOCATION_OPTIONS,
	EXPO_LOCATION_OPTIONS,
	REQUIRED_PERMISSIONS
} from "../constants/map";
import {PermissionsAndroid, Platform, ToastAndroid} from "react-native";
import Geolocation, {GeoError, GeoPosition} from "react-native-geolocation-service";
import {requestForegroundPermissionsAsync, watchPositionAsync} from 'expo-location';
import {LocationObject, LocationPermissionResponse} from "expo-location/src/Location.types";

const handle_error: Function = (error: any): void => {
	ToastAndroid.show(error, ToastAndroid.SHORT);
	console.log('Error: ', error);
}

export const initSitumSdk: Function = (): void => {
	if (USE_SITUM_DIRECTIONING || !FETCH_BUILDING_FROM_CACHE || "SITUM" === POSITIONING_PROVIDER) {
		SitumPlugin.initSitumSDK();
		SitumPlugin.setApiKey(SITUM_EMAIL, SITUM_API_KEY, () => {});
		SitumPlugin.setCacheMaxAge(SITUM_CACHE_MAX_AGE, () => {});
	}
}

export const fetchBuildingInfo: Function = (onSuccess: Function = () => null, onError: Function = () => null): void => {
	if (FETCH_BUILDING_FROM_CACHE) {
		onSuccess(BUILDING_INFO);
	} else {
		SitumPlugin.fetchBuildingInfo(
			{
				buildingIdentifier: BUILDING_IDENTIFIER,
				address: null,
				center: {latitude: 0, longitude: 0},
				createdAt: "Mon Dec 01 12:21:43 +0100 2021",
				customFields: {},
				dimensions: {height: 0, width: 0},
				infoHtml: null,
				name: null,
				rotation: 0,
				updatedAt: "Mon Dec 01 12:27:41 +0100 2021",
				userIdentifier: null
			},
			(buildingInfo: any) => onSuccess(buildingInfo),
			(error: string) => {
				onError();
				handle_error(error);
			}
		);
	}
};

export const requestPermissions: Function = async (): Promise<boolean> => {
	switch (POSITIONING_PROVIDER) {
		case "EXPO":
			const status: LocationPermissionResponse = await requestForegroundPermissionsAsync();

			if (
				"android" === Platform.OS && "none" === (status as any).android.accuracy
				|| "ios" === Platform.OS && "none" === (status as any).ios.accuracy
			) {
				return false;
			}
			break;
		case "LEGACY":
		case "SITUM":
			if (Platform.OS === "android") {
				const status: any = await PermissionsAndroid.requestMultiple(REQUIRED_PERMISSIONS);

				for (let permission of REQUIRED_PERMISSIONS) {
					if (status[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
						return false;
					}
				}
			}
			break;
	}

	return true;
}

export const startPositioning: Function = async (onSuccess: Function = () => null, onError: Function = () => null): Promise<any> => {
	switch (POSITIONING_PROVIDER) {
		case "EXPO":
			return await watchPositionAsync(EXPO_LOCATION_OPTIONS, (position: LocationObject) => {
				onSuccess({
					accuracy: position.coords.accuracy,
					bearing: {degrees: position.coords.heading},
					coordinate: {latitude: position.coords.latitude, longitude: position.coords.longitude},
				});
			})/*.catch((error: any) => {
				onError();
				handle_error(error);
			})*/;
		case "LEGACY":
			return Geolocation.watchPosition(
				(position: GeoPosition) => {
					onSuccess({
						accuracy: position.coords.accuracy,
						bearing: {degrees: position.coords.heading},
						coordinate: {latitude: position.coords.latitude, longitude: position.coords.longitude},
						provider: position.provider,
					});
				},
				(error: GeoError) => {
					onError();
					handle_error(error);
				},
				LEGACY_LOCATION_OPTIONS,
			);
		case "SITUM":
			return SitumPlugin.startPositioning(
				(location: any) => onSuccess(location),
				() => {
				},
				(error: string) => {
					onError();
					handle_error(error);
				},
				SITUM_LOCATION_OPTIONS,
			);
	}
};

export const stopPositioning: Function = (subscriptionId: any, onSuccess: Function = () => null, onError: Function = () => null): void => {
	switch (POSITIONING_PROVIDER) {
		case "EXPO":
			(subscriptionId as Promise<any>).then((t: any) => {
				t.remove();
				onSuccess();
			})
			break;
		case "LEGACY":
			Geolocation.clearWatch(subscriptionId);
			onSuccess();
			break;
		case "SITUM":
			SitumPlugin.stopPositioning(
				subscriptionId,
				() => onSuccess(),
				(error: string) => {
					onError();
					handle_error(error);
				},
			);
			break;
	}
};

export const requestDirections: Function = (directionParams: any[], onSuccess: Function = () => null, onError: Function = () => null): void => {
	if (USE_SITUM_DIRECTIONING) {
		SitumPlugin.requestDirections(
			directionParams,
			(route: any) => onSuccess(route),
			(error: string) => {
				onError();
				handle_error(error);
			},
		);
	}
};

initSitumSdk();