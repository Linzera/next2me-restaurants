import React from "react";
import { FlatList, Text, View, Dimensions } from "react-native";
import { Business } from "../../types/Business";
import HistoryItem from "../HistoryItem";
import { NavigationScreenProp } from "react-navigation";

interface IProps {
  data: [Business];
  navigation: NavigationScreenProp<{}>;
}

class HistoryList extends React.Component<IProps> {
  renderEmpty = () => {
    let { height } = Dimensions.get("window");

    return (
      <View
        style={{
          flex: 1,
          height: height / 2,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Ainda não visitou nenhum restaurante!</Text>
      </View>
    );
  };

  render() {
    const { data, navigation } = this.props;

    return (
      <FlatList<Business>
        keyExtractor={(item, index) => item.id + index}
        data={data}
        renderItem={({ item, index }) => (
          <HistoryItem navigation={navigation} index={index} item={item} />
        )}
        ListEmptyComponent={this.renderEmpty}
      />
    );
  }
}

export default HistoryList;
