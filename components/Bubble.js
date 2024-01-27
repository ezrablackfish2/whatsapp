import React, {useRef} from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../constants/colors";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import uuid from "react-native-uuid";
import * as Clipboard from "expo-clipboard";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

function formatAmPm(dateString) {
	const date = new Date(dateString);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	return hours + ':' + minutes + ' ' + ampm;
}

import { starMessage } from "../utils/actions/chatActions";

const MenuItem = props => {

	const Icon = props.iconPack ?? Feather;

	return <MenuOption onSelect={props.onSelect}>
		<View style={styles.menuItemContainer}>
			<Text style={styles.menuText}>
			{props.text}
			</Text>
	
			<Icon 
				name={props.icon} 
				size={18}
				/>
		</View>
		</MenuOption>
	
}


const Bubble = props => {
	const { text, type, messageId, chatId, userId, date, setReply, replyingTo, name } = props;


	const starredMessages = useSelector(state => state.messages.starredMessages[chatId] ?? {});
	const storedUsers = useSelector(state => state.users.storedUsers);


	const bubbleStyle = {  ...styles.container };
	const textStyle = { ...styles.text };
	const wrapperStyle = { ...styles.wrapperStyle };

	const menuRef = useRef(null);
	const id = useRef(uuid.v4());

	let Container = View;
	let isUserMessage = false;
	const dateString = date && formatAmPm(date);


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
			isUserMessage = true;
			break;
		case "thierMessage":
			wrapperStyle.justifyContent = "flex-start";
			bubbleStyle.maxWidth = "90%";
			Container = TouchableWithoutFeedback;
			isUserMessage = true;
			break;
		case "reply":
			bubbleStyle.backgroundColor = "#F2F2F2";
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


	const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
	const replyingToUser = replyingTo && storedUsers[replyingTo.sentBy];



	return (
		<View style={wrapperStyle}>
			<Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{ width: "100%" }}>
			<View style={bubbleStyle}>
				
				{
					name &&
					<Text style={styles.name}>{name}</Text>
				}

				{
					replyingToUser && 
					<Bubble
					type="reply"
					text={replyingTo.text}
					name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}

					/>
				}
				

				<Text style={textStyle}>
					{text}
				</Text>

			{
			dateString && <View style={styles.timeContainer}>
				{isStarred && <FontAwesome name="star" size={14} color={colors.grey} style={{ marginRight: 5 }} />}
				<Text style={styles.time}>{dateString}</Text>
			</View>
		}

			<Menu name={id.current} ref={menuRef}>
				<MenuTrigger />
				<MenuOptions>
					<MenuItem text="copy to clipboard" icon={"copy"}  onSelect={() => copyToClipboard(text)}/>
					<MenuItem text={`${isStarred ? "Unstar" : "Star"} message`} icon={isStarred ? "star-o" : "star"} iconPack={FontAwesome} onSelect={() => starMessage(messageId, chatId, userId)}/>
					<MenuItem text="Reply" icon="reply" iconPack={FontAwesome} onSelect={setReply}/>
					
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
		fontFamily: "Rajdhani",
		letterSpacing: 0.3,
		padding: 0,
		fontSize: 18,
	},
	menuItemContainer: {
		flexDirection: "row",
		padding: 5,
	},
	menuText: {
		flex: 1,
		fontFamily: "Rajdhani",
		letterSpacing: 0.3,
		fontSize: 16,

	},
	timeContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",

	},
	time: {
		fontFamily: "Rajdhani",
		letterSpacing: 0.3,
		color: colors.grey,
		fontSize: 14,
	},
	name: {
		fontFamily: "Rajdhani",
		letterSpacing: 0.3,
	},
})

export default Bubble;
