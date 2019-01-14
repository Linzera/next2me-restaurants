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
import { Business } from "../../types/Business";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  item: Business;
  index: number;
  navigation: NavigationScreenProp<{}>;
}
interface IState {
  animatedValue: Animated.Value;
}

class HistoryItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    //Caso queira adicionar animacao basta trocar de 1 para 0 XD Lin esteve aqui!
    this.state = {
      animatedValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.handleAnimation();
  }

  handleAnimation = () => {
    const { index } = this.props;
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: index * 300,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { navigation, item } = this.props;
    const { name, image_url } = item;
    const { animatedValue } = this.state;

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Details", { item })}
      >
        <Animated.View style={[styles.container, { opacity: animatedValue }]}>
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

export default HistoryItem;
