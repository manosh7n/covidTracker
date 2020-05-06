import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class Details extends React.Component {
  url = '';
  state = {json: null};
  flatDate = [];

  constructor() {
    super();
    this.url = `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-01-01/${this.getCurrentDate()}`;
  }

  getCurrentDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  async getData() {
    console.log('getData(init)');
    var response = await fetch(this.url);
    var json = await response.json();
    this.setState({json: json.data});
  }
  async flat() {
    if (this.state.json !== null) {
      var keys = Object.keys(this.state.json);
      keys.forEach(i => {
        var temp = this.state.json[i].RUS;
        this.flatDate.push(temp);
      });
    }
  }

  render() {
    this.flat();

    return (
      <View style={styles.container}>
        <Button
          title="sadad"
          style={styles.button}
          onPress={() => {
            this.getData();
          }}
        />
        <View style={styles.containerScroll}>
          <ScrollView>
            {this.flatDate.map(i => (
              <Text key={i.date_value}>
                {i.date_value} {i.confirmed}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
  containerScroll: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 32,
  },
  button: {
    flex: 1,
  },
});
