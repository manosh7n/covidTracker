import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {Countries} from '../Components/Countries';
import {ScrollView} from 'react-native-gesture-handler';
import HomeScreenNumbers from '../Components/HomeScreenNumbers';
import Graphics from '../Components/Graphics';

export default class HomeScreen extends Component {
  state = {
    country: this.props.route.params.country,
    api: this.props.route.params.api,
    isUpdate: this.props.route.params.isUpdate,
  };

  async build() {
    await this.state.api.getData();
    this.setState({
      isUpdate: false,
    });
  }

  render() {
    if (this.state.isUpdate) {
      this.build();
    }

    return (
      <>
        <View style={styles.container}>
          <View style={styles.pickerView}>
            <Text style={styles.pickerText}>Select country:</Text>
            <Picker
              selectedValue={this.state.country}
              style={styles.picker}
              enabled={!this.state.isUpdate}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  country: itemValue,
                });
              }}>
              {Object.values(Countries).map(i => {
                return <Picker.Item label={i} value={i} key={i} />;
              })}
            </Picker>
          </View>

          {this.state.isUpdate !== true && (
            <ScrollView>
              <HomeScreenNumbers
                api={this.state.api.data}
                country={this.state.country}
              />
              <Text style={styles.textGraph}>
                The number of confirmed cases by day
              </Text>
              <ScrollView
                horizontal
                ref="scrollView2"
                onContentSizeChange={(width, height) =>
                  this.refs.scrollView2.scrollTo({x: width})
                }>
                <Graphics
                  api={this.state.api.data}
                  country={this.state.country}
                  type={'confirmed'}
                />
              </ScrollView>
              <Text style={styles.textGraph}>The number of deaths by day</Text>
              <ScrollView
                horizontal
                ref="scrollView"
                onContentSizeChange={(width, height) =>
                  this.refs.scrollView.scrollTo({x: width})
                }>
                <Graphics
                  api={this.state.api.data}
                  country={this.state.country}
                  type={'deaths'}
                />
              </ScrollView>
            </ScrollView>
          )}

          {this.state.isUpdate && (
            <ActivityIndicator
              animating={this.state.isUpdate}
              color={Colors.blue400}
              hidesWhenStopped={true}
              size={100}
              style={{flex: 1}}
            />
          )}
        </View>

        <View style={{backgroundColor: 'white'}}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={async () => {
              this.props.navigation.navigate('Details', {
                country: this.state.country,
                api: this.state.api.data,
              });
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
              }}>
              Details
            </Text>
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

  //text gtaph
  textGraph: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  //button detailed
  button: {
    alignItems: 'center',
    backgroundColor: '#2683c9',
    padding: 10,
    borderRadius: 20,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
  },
});
