import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {Countries} from '../Components/Countries';
import {ScrollView} from 'react-native-gesture-handler';
import HomeScreenNumbers from '../Components/HomeScreenNumbers';
import Graphics from '../Components/Graphics';
import FlashMessage from 'react-native-flash-message';
export default class HomeScreen extends Component {
  state = {
    country: this.props.route.params.country,
    api: this.props.route.params.api,
    isUpdate: this.props.route.params.isUpdate,
    isLoad: this.props.route.params.isLoad,
  };

  async build() {
    await this.state.api.getData();
    this.setState({
      isUpdate: false,
      isLoad: false,
    });
  }

  render() {
    if (this.state.isUpdate) {
      this.build();
    }

    if (this.state.isLoad && this.state.isUpdate === false) {
      window.setTimeout(() => {
        this.setState({isLoad: false});
      }, 1);
    }

    return (
      <>
        <View style={styles.container}>
          <View style={styles.pickerView}>
            <Text style={styles.pickerText}>Select country:</Text>
            <Picker
              selectedValue={this.state.country}
              style={styles.picker}
              enabled={!this.state.isLoad}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  country: itemValue,
                  isLoad: true,
                });
              }}>
              {Object.values(Countries).map(i => {
                return <Picker.Item label={i} value={i} key={i} />;
              })}
            </Picker>
          </View>

          {this.state.isLoad !== true && (
            <>
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
                    this.refs.scrollView2.scrollTo({
                      x: width,
                    })
                  }>
                  <Graphics
                    data={this.state.api.confirmed.get(this.state.country)}
                    dates={this.state.api.date.get(this.state.country)}
                    type={'confirmed'}
                  />
                </ScrollView>
                <Text style={styles.textGraph}>
                  The number of deaths by day
                </Text>
                <ScrollView
                  horizontal
                  style={{marginBottom: 40}}
                  ref="scrollView"
                  onContentSizeChange={(width, height) =>
                    this.refs.scrollView.scrollTo({
                      x: width,
                    })
                  }>
                  <Graphics
                    data={this.state.api.deaths.get(this.state.country)}
                    dates={this.state.api.date.get(this.state.country)}
                    type={'deaths'}
                  />
                </ScrollView>
              </ScrollView>

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
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {this.state.isLoad && (
            <ActivityIndicator
              animating={this.state.isLoad}
              color={'#2683c9'}
              hidesWhenStopped={true}
              size={110}
              style={{flex: 1}}
            />
          )}
        </View>

        <FlashMessage
          position="bottom"
          style={{borderRadius: 20}}
          titleStyle={styles.textFlash}
          hideStatusBar={false}
        />
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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

  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  //flash message
  textFlash: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
