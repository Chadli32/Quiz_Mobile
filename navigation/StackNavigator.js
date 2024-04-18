import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";
import Quiz from "../screen/Quiz";
import Score from "../screen/Score";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Score"
        component={Score}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
