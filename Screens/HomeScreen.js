import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {Countries} from '../Components/Countries';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
  state = {
    country: this.props.route.params.country,
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.pickerView}>
            <Text style={styles.pickerText}>Select country:</Text>
            <Picker
              selectedValue={Object.keys(Countries).find(
                key => Countries[key] === this.state.country,
              )}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({country: Countries[itemValue]});
              }}>
              {Object.keys(Countries).map(i => {
                return <Picker.Item label={i} value={i} key={i} />;
              })}
            </Picker>
          </View>

          <View style={styles.homeStats}>
            <Text style={styles.textStats}>Infected</Text>
            <Text style={styles.textStats}>Death</Text>
          </View>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate('Details', {
                country: this.state.country,
              });
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Details</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  //picker
  pickerView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 15,
  },
  picker: {
    flex: 2,
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  pickerText: {
    flex: 3,
    textAlign: 'center',
    fontSize: 18,
  },

  //stats
  homeStats: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStats: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },

  //button detailed
  button: {
    alignItems: 'center',
    backgroundColor: '#2964df',
    padding: 10,
    borderRadius: 20,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
  },
});
