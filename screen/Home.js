import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logoQuiz from "../assets/logoQuiz.jpg";

export default function Home({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Image source={logoQuiz} style={styles.image} />
      <TouchableOpacity onPress={() => navigate("Quiz")}>
        <Text style={styles.button}>LET'S START</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Text>
          The questions in this quiz are random and from various domains, and
          depending on the difficulty, the colors change.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    objectFit: "contain",
    width: 300,
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
});
