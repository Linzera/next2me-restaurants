import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Icons from "react-native-vector-icons/FontAwesome";

import Home from "../views/Home";
import Historic from "../views/Historic";
import Details from "../views/Details";

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Details: { screen: Details }
  },
  {
    initialRouteName: "Home"
  }
);

const HistoricNavigator = createStackNavigator(
  {
    History: Historic,
    Details: Details
  },
  { initialRouteName: "History" }
);

const TabNavigatior = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Historic: HistoricNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        switch (routeName) {
          case "Home":
            return <Icons name="home" size={25} color={tintColor} />;
          case "Historic":
            return <Icons name="clock-o" size={25} color={tintColor} />;
          default:
            return <Icons name="lost" size={25} color={tintColor} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    },
    initialRouteName: "Home"
  }
);

export default createAppContainer(TabNavigatior);
