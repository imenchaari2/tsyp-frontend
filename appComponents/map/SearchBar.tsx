import React, {LegacyRef, useEffect, useRef} from "react";
import {Keyboard, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faBars, faSearch, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "absolute",
		top: 0,
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		height: 62,
		padding: 3,
		borderColor: "#272D37",
		borderWidth: 1.5,
		borderRadius: 3,
		margin: 9,
	},
	searchButton: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: "auto",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		height: "100%",
	},
	input: {
		fontSize: 20,
		marginLeft: 5,
		marginRight: 5,
		color: "white",
		paddingLeft: 5,
		flex: 1,
	},
	menuButton: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: "auto",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 5,
		paddingRight: 3,
		backgroundColor: "#3E4857",
		height: "100%",
		width: 50,
	},
	clearButton: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: "auto",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		height: "100%",
	},
});

const SearchBar = (props: any) => {
	const searchRef: LegacyRef<TextInput> = useRef(null);
	const setSearchScreenVisibility = (visible: boolean, openKeyboardWhenVisible: boolean): void => {
		props.onSearchScreenVisibilityChange(visible);
		if (searchRef.current) {
			if (visible) {
				if (openKeyboardWhenVisible) {
					searchRef.current.focus();
				}
			} else {
				searchRef.current.blur();
			}
		}
	};

	useEffect(() => {
		Keyboard.addListener("keyboardDidHide", () => {
			if (searchRef.current) {
				searchRef.current.blur();
			}
		});
	});

	return (
		<View style={styles.container}>
			<View style={[styles.searchBar, {backgroundColor: props.isSearchClicked ? "#FFFFFF" : "#272D37CC"}]}>
				<TouchableOpacity style={styles.searchButton} onPress={() => setSearchScreenVisibility(!props.isSearchClicked, true)}>
					<FontAwesomeIcon icon={props.isSearchClicked ? faArrowLeft : faSearch} color={props.isSearchClicked ? "#272D37" : "#CCCCCC"} size={20}/>
				</TouchableOpacity>
				<TextInput
					ref={searchRef}
					style={[styles.input, props.isSearchClicked ? {color: "black",} : {}]}
					placeholder="Search..."
					placeholderTextColor={"#8F8F8F"}
					value={props.searchPhrase}
					onFocus={() => setSearchScreenVisibility(true, true)}
					onChangeText={props.setSearchPhrase}
				/>
				{0 < props.searchPhrase.length && (
					<TouchableOpacity style={styles.clearButton} onPress={props.onPlaceUnselected}>
						<FontAwesomeIcon icon={faTimesCircle} color={props.isSearchClicked ? "#272D37" : "#CCCCCC"} size={20}/>
					</TouchableOpacity>
				)}
				{!props.isSearchClicked && (
					<TouchableOpacity style={styles.menuButton} onPress={() => setSearchScreenVisibility(true, false)}>
						<FontAwesomeIcon icon={faBars} color={"#FFFFFF"} size={25}/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default SearchBar;