import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {Countries} from '../Components/Countries';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
  state = {
    country: this.props.route.params.country,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              country: this.state.country,
            });
          }}
        />
        <Picker
          selectedValue={Object.keys(Countries).find(
            key => Countries[key] === this.state.country,
          )}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({country: Countries[itemValue]});
          }}>
          {Object.keys(Countries).map(i => {
            return <Picker.Item label={i} value={i} key={i} />;
          })}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
});
