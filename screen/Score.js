import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logoQuiz from "../assets/logoQuiz.jpg";
import backgroundScore from "../assets/backgoundScore.jpg";

export default function Score({ route, navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Image source={logoQuiz} style={styles.image} />
      <View source={backgroundScore} style={styles.textContainer}>
        <Text style={styles.text}>Your score is</Text>
        <Text style={styles.text}>{route ? route.params.score : " ? "}/20</Text>
      </View>

      <TouchableOpacity
        style={{ marginBottom: 50 }}
        onPress={() => navigate("Home")}
      >
        <Text style={styles.button}>Return home</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 150,
  },
  button: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: "#9f23ed",
    borderRadius: 20,
    color: "white",
    letterSpacing: 1,
    fontWeight: "900",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  textContainer: {
    height: 100,
    width: 200,
    display: "flex",
    backgroundColor: "#9f23ed",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
