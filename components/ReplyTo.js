import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { AntDesign } from '@expo/vector-icons';

const ReplyTo = props => {
	const { text, user, onCancel } = props;
	const name = `${user.firstName} ${user.lastName}`;

	return <View style={styles.container}>
			<View style={styles.textContainer}>
				<Text 
					style={styles.name}
					numberOfLines={1}>
					{name}
				</Text>
				<Text
					style={styles.text}
					numberOfLines={1}>
					{text}
				</Text>

			</View>

			<TouchableOpacity onPress={onCancel}>
				<AntDesign name="close" size={24} color={colors.blue} />
			</TouchableOpacity>
		</View>
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.extraLightGrey,
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
		borderLeftColor: colors.blue,
		borderLeftWidth: 4,
	},
	textContainer: {
		flex: 1,
		marginRight: 5,
	},
	name: {
		color: colors.blue,
		fontFamily: "Rajdhani",
		fontSize: 18,
		letterSpacing: 0.3,
	},
	text: {
		fontFamily: "Rajdhani",
		fontSize: 16,
	},
});

export default ReplyTo;
