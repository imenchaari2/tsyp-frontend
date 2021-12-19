import {
	faBath,
	faBed, faDoorOpen, faInfo, faMale,
	faMosque, faMugHot,
	faShoppingCart,
	faSwimmingPool, faToilet, faUniversity, faUsers,
	faUtensils
} from "@fortawesome/free-solid-svg-icons";
import {Permission, PermissionsAndroid} from "react-native";
import {GeoWatchOptions} from "react-native-geolocation-service";
import {LocationAccuracy} from "expo-location";
import {LocationOptions} from "expo-location/src/Location.types";
import * as building from './building.json';

export const CATEGORIES: any = {
	"ROOMS": {icon: faBed},
	"RESTAURANT": {icon: faUtensils},
	"COFFEE": {icon: faMugHot},
	"SHOP": {icon: faShoppingCart},
	"ENTRANCE": {icon: faDoorOpen},
	"MUSEUM": {icon: faUniversity},
	"POOL": {icon: faSwimmingPool},
	"SHOWER": {icon: faBath},
	"BANK": {icon: faUniversity},
	"MOSQUE": {icon: faMosque},
	"TOILETS": {icon: faToilet},
	"INFORMATION": {icon: faInfo},
	"CONFERENCE": {icon: faUsers},
	"MEMBER": {icon: faMale},
};
export const EXPO_LOCATION_OPTIONS: LocationOptions = {
	accuracy: LocationAccuracy.BestForNavigation,
};
export const LEGACY_LOCATION_OPTIONS: GeoWatchOptions = {
	accuracy: {
		android: 'high',
		ios: 'best',
	},
	enableHighAccuracy: true,
	distanceFilter: 0,
	interval: 5000,
	fastestInterval: 2000,
	forceRequestLocation: true,
	//forceLocationManager: useLocationManager,
	showLocationDialog: true,
	useSignificantChanges: false,
};
export const SITUM_LOCATION_OPTIONS: any = {
	// useWife: true,
	useGlobalLocation: true,
	/*useBle: true,
	useForegroundService: true,
	outdoorLocationOptions: {
		buildingDetector: "WIFI", // options: WIFI, BLE; default:
		// minimumOutdoorLocationAccuracy: 10
		averageSnrThreshold: 40
	},*/
};
export const REQUIRED_PERMISSIONS: Array<Permission> = [
	PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
];
export const SITUM_EMAIL: string = "timofeevanton@distraplo.com";
export const SITUM_API_KEY: string = "11729d14b34e24ecaf55782a0809ac81cd6de2caee201d3bc8976ad8b850b32c";
export const SITUM_CACHE_MAX_AGE: number = 604800;
export const BUILDING_IDENTIFIER: string = "9914";
export const BUILDING_INFO: any = building;
export const CLOSE_MEMBERS_REFRESH_RATE: number = 10;
export const SERVER_URL: string = "http://51.38.248.170/tsyp";
export const POSITIONING_PROVIDER: string = "EXPO"; // SITUM / EXPO / LEGACY
export const FETCH_BUILDING_FROM_CACHE: boolean = true;
export const USE_SITUM_DIRECTIONING: boolean = false;

export default {
	CATEGORIES,
	EXPO_LOCATION_OPTIONS,
	LEGACY_LOCATION_OPTIONS,
	SITUM_LOCATION_OPTIONS,
	REQUIRED_PERMISSIONS,
	SITUM_EMAIL,
	SITUM_API_KEY,
	SITUM_CACHE_MAX_AGE,
	BUILDING_IDENTIFIER,
	BUILDING_INFO,
	CLOSE_MEMBERS_REFRESH_RATE,
	SERVER_URL,
	POSITIONING_PROVIDER,
	FETCH_BUILDING_FROM_CACHE,
	USE_SITUM_DIRECTIONING,
}