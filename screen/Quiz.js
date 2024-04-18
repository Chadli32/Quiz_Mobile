import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logoQuiz from "../assets/logoQuiz.jpg";
import { useEffect, useState } from "react";
import getRandom20Question from "../api/getRandom20Question";

export default function Quiz({ navigation: { navigate } }) {
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ajout d'un état de chargement
  const degreeOrder = { Easy: 1, Medium: 2, Hard: 3 };

  useEffect(() => {
    setScore(0);
    setIndexQuestion(0);
    const getQuestion = async () => {
      try {
        const newQuestion = await getRandom20Question();
        newQuestion.sort((a, b) => {
          return (
            degreeOrder[a.difficulty.degree] - degreeOrder[b.difficulty.degree]
          );
        });
        setQuestion(newQuestion);
      } catch (error) {
        Alert.alert("Error API", error.message);
      } finally {
        setIsLoading(false); // Les données ont été chargées ou une erreur s'est produite
      }
    };
    getQuestion();
  }, []);

  const handleScore = (isCorrect) => {
    if (indexQuestion < question.length - 1) {
      // Modification ici pour éviter de dépasser la longueur du tableau
      setIndexQuestion(indexQuestion + 1);
      if (isCorrect) {
        setScore(score + 1);
      }
    } else {
      navigate("Score", { score: score });
    }
  };

  if (isLoading) {
    // Affichage pendant le chargement des données
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading questions...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logoQuiz} style={styles.image} />
      </View>
      <View>
        <View style={styles.questionContainer}>
          <Text
            style={[
              styles.category,
              {
                color:
                  question[indexQuestion].difficulty.degree == "Easy"
                    ? "#0EFA9B"
                    : question[indexQuestion].difficulty.degree == "Medium"
                    ? "#E9F815"
                    : "#FFB2A6",
              },
            ]}
          >
            {question[indexQuestion].category.name}
          </Text>
        </View>
        <View style={styles.choicesContainer}>
          <Text style={styles.question}>{question[indexQuestion].text}</Text>
          <FlatList
            data={question[indexQuestion].options}
            renderItem={(itemData) => {
              const choice = itemData.item;
              return (
                <TouchableOpacity
                  onPress={() => handleScore(choice.isCorrect)}
                  style={{
                    backgroundColor: "#c7c7c7",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    marginHorizontal: 10,
                  }}
                  key={itemData.index}
                >
                  <Text style={{ color: "black", textAlign: "center" }}>
                    {choice.option}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    width: 100,
    height: 100,
    overflow: "hidden",
    backgroundColor: "red",
  },
  image: {
    objectFit: "cover",
    width: 100,
    height: 100,
  },
  questionContainer: {
    display: "flex",
    alignItems: "center",
  },
  category: {
    backgroundColor: "#c55bfb",
    paddingTop: 15,
    paddingBottom: 5,
    width: 200,
    paddingHorizontal: 5,
    textAlign: "center",
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    marginHorizontal: 20,
    fontWeight: "900",
    color: "#65017d",
    letterSpacing: 0.7,
  },
  question: {
    padding: 10,
    textAlign: "center",
    color: "black",
    letterSpacing: 0.7,
    marginBottom: 30,
  },
  choicesContainer: {
    backgroundColor: "#c55bfb",
    borderRadius: 10,
    width: 300,
    height: 300,
    display: "flex",
    justifyContent: "space-between",
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
