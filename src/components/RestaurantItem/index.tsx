import React from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "../Avatar";
import { NavigationScreenProp } from "react-navigation";
import { Business } from "../../types/Business";
import { connect, DispatchProp } from "react-redux";
import { Dispatch } from "redux";
import { AppActions, addToHistory } from "../../actions";

interface IProps {
  item: Business;
  index: number;
  navigation: NavigationScreenProp<{}>;
  dispatch: Dispatch<AppActions>;
}
interface IState {}

class RestaurantItem extends React.Component<IProps, IState> {
  handlePress = () => {
    const { navigation, item, dispatch } = this.props;

    dispatch(addToHistory(item));
    navigation.navigate("Details", { item });
  };

  render() {
    const { name, image_url } = this.props.item;

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => this.handlePress()}
      >
        <Animated.View style={styles.container}>
          <View style={styles.restaurantInfoContainer}>
            <View style={styles.avatarContainer}>
              <Avatar image_url={image_url} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon size={30} color="#000" name="chevron-right" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    height: 100,
    flexDirection: "row"
  },
  restaurantInfoContainer: {
    flex: 0.8,
    flexDirection: "row"
  },
  title: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18
  },
  avatarContainer: {
    flex: 0.8,
    justifyContent: "center"
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center"
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect()(RestaurantItem);
