import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Business } from "../../types/Business";
import { AppState } from "../../reducers";
import HistoryList from "../../components/HistoryList";

interface IProps {
  navigation: NavigationScreenProp<{}>;
  data: [Business];
}

class Historic extends React.Component<IProps> {
  static navigationOptions = ({ navigation }) => ({
    title: "History",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  render() {
    const { data, navigation } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HistoryList data={data} navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  data: store.mainReducer.history.historic
});

export default connect(mapStateToProps)(Historic);
