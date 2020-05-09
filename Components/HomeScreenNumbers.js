import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function HomeScreenNumbers(props) {
  return (
    <View style={styles.homeStats}>
      <View style={styles.numbers}>
        <Text style={styles.textNum}>
          {
            props.api.json[props.country][
              props.api.json[props.country].length - 1
            ].confirmed
          }
        </Text>
        <Text style={styles.textNum}>
          {
            props.api.json[props.country][
              props.api.json[props.country].length - 1
            ].deaths
          }
        </Text>
      </View>
      <View style={styles.numbers}>
        <Text style={styles.textStats}>Infected</Text>
        <Text style={styles.textStats}>Deaths</Text>
      </View>
      <Text style={{textAlign: 'center'}}>
        Last update:
        {
          props.api.json[props.country][
            props.api.json[props.country].length - 1
          ].date
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeStats: {
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textNum: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },

  textStats: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold',
  },
});

export default HomeScreenNumbers;
