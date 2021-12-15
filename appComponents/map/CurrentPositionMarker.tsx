import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {Circle, MarkerAnimated} from "react-native-maps";

const CurrentPositionMarker = (props: any) => {
	return (
		<>
			<Circle
				style={{position: "absolute"}}
				key={(props.currentPosition.coordinate.latitude + props.currentPosition.coordinate.longitude).toString()}
				center={props.currentPosition.coordinate}
				radius={15}
				strokeWidth={0}
				fillColor={"#006F9F80"}
				zIndex={1001}
			/>
			<MarkerAnimated
				coordinate={props.currentPosition.coordinate}
				rotation={props.currentPosition.bearing.degrees - 43}
				flat={true}
				anchor={{x: .6, y: .41}}
				style={{zIndex: 1002}}
			>
				<FontAwesomeIcon icon={faLocationArrow} color={"#FFFFFF"} size={30}/>
			</MarkerAnimated>
			<MarkerAnimated
				coordinate={props.currentPosition.coordinate}
				rotation={props.currentPosition.bearing.degrees - 43}
				flat={true}
				anchor={{x: .6, y: .41}}
				style={{zIndex: 1002}}
			>
				<FontAwesomeIcon icon={faLocationArrow} color={"#006F9F"} size={23}/>
			</MarkerAnimated>
		</>
	);
};

export default CurrentPositionMarker;