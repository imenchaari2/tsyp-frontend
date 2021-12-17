import {LatLng} from "react-native-maps";
import {SERVER_URL} from "../constants/map";
import {useSelector} from "react-redux";

export const fetchCloseMembers: Function = (coordinate: LatLng, onSuccess: Function, onError: Function = () => null) => {
	// const userToken = useSelector((state: any) => state.profileSlice.profile.token);

	fetch(SERVER_URL + '/api/close_members', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: "Bearer " + userToken,
		},
		body: JSON.stringify({
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
		}),
	})
		.then((response: Response) => response.json())
		.then((json) => {
			onSuccess(json);
		})
		.catch((error) => {
			console.log('error: ', error);
			onError();
		});
};