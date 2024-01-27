import React, {useRef} from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../constants/colors";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import uuid from "react-native-uuid";
import * as Clipboard from "expo-clipboard";


const Bubble = props => {
	const { text, type } = props;

	const bubbleStyle = {  ...styles.container };
	const textStyle = { ...styles.text };
	const wrapperStyle = { ...styles.wrapperStyle };

	const menuRef = useRef(null);
	const id = useRef(uuid.v4());

	let Container = View;

	switch (type) {
		case "system":
			textStyle.color = "#656448";
			bubbleStyle.backgroundColor = colors.beige;
			bubbleStyle.alignItems = "center";
			bubbleStyle.marginTop = 10;
			break;
		case "error":
			bubbleStyle.backgroundColor = colors.red;
			textStyle.color = "white";
			bubbleStyle.marginTop = 10;
			break;
		case "myMessage":
			wrapperStyle.justifyContent = "flex-end";
			bubbleStyle.backgroundColor = "#E7FED6";
			bubbleStyle.maxWidth = "90%";
			Container = TouchableWithoutFeedback;
			break;
		case "thierMessage":
			wrapperStyle.justifyContent = "flex-start";
			bubbleStyle.maxWidth = "90%";
			Container = TouchableWithoutFeedback;

			break;

		default:
			break;
	}

	const copyToClipboard = async text => {
		try {
		await Clipboard.setStringAsync(text);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View style={wrapperStyle}>
			<Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{ width: "100%" }}>
			<View style={bubbleStyle}>
				<Text style={textStyle}>
					{text}
				</Text>

			<Menu name={id.current} ref={menuRef}>
				<MenuTrigger />
				<MenuOptions>
					<MenuOption text="copy to clipboard"  onSelect={() => copyToClipboard(text)}/>
					<MenuOption text="Option 2" />
					<MenuOption text="Option 3" />
				</MenuOptions>
			</Menu>

			</View>
			</Container>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapperStyle: {
		flexDirection: "row",
		justifyContent: "center",
	},
	container: {
		backgroundColor: "white",
		borderRadius: 6,
		padding: 5,
		marginBottom: 10,
		borderColor: "#E2DACC",
		borderWidth: 1,


	},

	text: {
		fontFamily: "Hammer",
		fontFamily: "Rajdhani",
		letterSpacing: 0.3,
		padding: 0,
		fontSize: 18,
	},
})

export default Bubble;
