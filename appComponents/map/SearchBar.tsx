import React, {LegacyRef, useEffect, useRef} from "react";
import {Keyboard, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faBars, faSearch, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "absolute",
		top: 0,
	},
	searchBar: {
		marginTop: 10,
		marginHorizontal: 9,
		paddingHorizontal: 10,
		height: 50,
		backgroundColor: "white",
		borderColor: "gold",
		borderWidth:1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		elevation: 10,
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
		fontSize: 15,
		marginLeft: 5,
		marginRight: 5,
		color: "#4d565f",
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
		borderRadius: 10,
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
			<View style={[styles.searchBar, {backgroundColor: props.isSearchClicked ? "light" : "white"}]}>
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
						<FontAwesomeIcon icon={faBars} color={"#ECCA57"} size={25}/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default SearchBar;
