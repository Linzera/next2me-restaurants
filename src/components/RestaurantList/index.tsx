import React from "react";
import { FlatList } from "react-native";
import { BusinessFetchData, Business } from "../../types/Business";
import RestaurantItem from "../RestaurantItem";
import { NavigationScreenProp } from "react-navigation";
import MoneyFilter from "../MoneyFilter";
import { organizeByDistance } from "../../util/locations";

interface IProps {
  data: BusinessFetchData;
  navigation: NavigationScreenProp<{}>;
}

interface IState {
  businesses: [Business];
}

class RestaurantList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { data } = this.props;

    this.state = {
      businesses: data.businesses
    };
  }

  handleFilter = (filter: string) => {
    const { data } = this.props;

    const dataWithFilter = data.businesses.filter(
      item => item.price === filter
    );

    const sortedData = dataWithFilter.sort(
      (a: Business, b: Business) => a.distance - b.distance
    );

    this.setState(prevState => ({
      businesses: sortedData
    }));
  };

  handleReset = () => {
    const { data } = this.props;

    const sortedData = organizeByDistance(data);

    this.setState({ businesses: sortedData.businesses });
  };

  render() {
    const { navigation, data } = this.props;
    const { businesses } = this.state;

    return (
      <FlatList<Business>
        keyExtractor={(item, index) => item.id + index}
        data={businesses}
        renderItem={({ item, index }) => (
          <RestaurantItem navigation={navigation} item={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <MoneyFilter
            fullData={data.businesses}
            restaurantListStateData={businesses}
            onPress={filter => this.handleFilter(filter)}
            onPressReset={() => this.handleReset()}
          />
        )}
      />
    );
  }
}

export default RestaurantList;
