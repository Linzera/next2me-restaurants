import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import RestaurantList from "../../components/RestaurantList";
import { Loading } from "../../components/Loading";
import { fetchBusiness, AppActions } from "../../actions";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { BusinessFetchData } from "../../types/Business";
import { Dispatch } from "redux";

interface IProps {
  navigation: NavigationScreenProp<{}>;
  data: BusinessFetchData;
  isLoading: boolean;
  dispatch: Dispatch<AppActions>;
  error: Error;
}

interface IGeolocation {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface IGeolocationData {
  timestamp: number;
  coords: IGeolocation;
}

class Home extends React.Component<IProps> {
  static navigationOptions = ({ navigation }) => ({
    title: "Restaurants",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  componentDidMount() {
    const { dispatch } = this.props;

    navigator.geolocation.getCurrentPosition(position => {
      dispatch(
        fetchBusiness(position.coords.latitude, position.coords.longitude)
      );
    });
  }

  render() {
    const { navigation, data, isLoading, error } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loading />
            <Text style={{ textAlign: "center" }}>{error.toString()}</Text>
          </View>
        ) : (
          <RestaurantList data={data} navigation={navigation} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = (store: AppState) => ({
  isLoading: store.mainReducer.home.loading,
  data: store.mainReducer.home.restaurantPayload,
  error: store.mainReducer.home.errorMessage
});

export default connect(mapStateToProps)(Home);
