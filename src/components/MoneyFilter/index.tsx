import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Business } from "../../types/Business";
import FilterButton from "../FilterButton";

interface IProps {
  restaurantListStateData: [Business];
  fullData: [Business];
  onPress: (filter: string) => void;
  onPressReset: () => void;
}

interface IState {}

export default class MoneyFilter extends React.Component<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <FilterButton
          filter="Reset"
          onPress={filter => this.props.onPressReset()}
        />
        <FilterButton
          filter="$"
          onPress={filter => this.props.onPress(filter)}
        />
        <FilterButton
          filter="$$"
          onPress={filter => this.props.onPress(filter)}
        />
        <FilterButton
          filter="$$$"
          onPress={filter => this.props.onPress(filter)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
