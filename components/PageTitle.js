import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";


export default PageTitle = props => {
	return <View style={styles.container}>
		<Text style={styles.text}>
		{props.text}
		</Text>
		</View>
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	text: {
		fontSize: 38,
		color: colors.textColor,
		fontFamily: "BlackOps",
		letterSpacing: 0.3,
	
	},
})
