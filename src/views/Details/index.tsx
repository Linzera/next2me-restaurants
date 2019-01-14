import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  GeolocationReturnType
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Business } from "../../types/Business";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { getRegion } from "../../util/locations";

interface IProps {
  navigation: NavigationScreenProp<Business>;
}

interface IState {
  isLoading: boolean;
  position: GeolocationReturnType;
}

class Details extends React.Component<IProps, IState> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: true,
      position: {}
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({ isLoading: false, position: pos });
    });
  }

  render() {
    const { navigation } = this.props;
    const { isLoading, position } = this.state;

    const item = navigation.getParam("item") as Business;

    //TODAS INFOS AQUI
    const {
      name,
      location,
      categories,
      phone,
      rating,
      alias,
      is_closed,
      transactions,
      coordinates,
      distance
    } = item;

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <MapView
              style={styles.mapContainer}
              region={getRegion(
                position.coords.latitude,
                position.coords.longitude,
                distance
              )}
            >
              <Marker
                coordinate={position.coords}
                title="You"
                description="Você está aqui!"
              />
              <Marker
                coordinate={getRegion(
                  coordinates.latitude,
                  coordinates.longitude,
                  distance
                )}
                title={name}
                description={alias}
              />
            </MapView>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text>Informacoes: </Text>
          <Text>{name}</Text>
          <Text>{alias}</Text>
          <Text>{phone}</Text>
          <Text>{rating}</Text>
          <Text>{is_closed}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  }
});

export default Details;
