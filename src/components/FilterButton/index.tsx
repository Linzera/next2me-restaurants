import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface IProps {
  onPress: (filter: string) => void;
  filter: string;
}

export default class FilterButton extends React.Component<IProps> {
  render() {
    const { filter, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(filter)}>
        <Text style={styles.text}>{filter}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    margin: 10
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  }
});
