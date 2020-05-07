import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default class HomeScreen extends Component {
  country = this.props.route.params.country;

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Подробно"
          onPress={() => {
            this.props.navigation.navigate('Details', {country: this.country});
          }}
        />
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
