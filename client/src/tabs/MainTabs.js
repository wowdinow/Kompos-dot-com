import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import MainStacks from "../stacks/MainStacks";
import { Entypo, AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={MainStacks}
          options={{
            headerTintColor: "#403f3d",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
