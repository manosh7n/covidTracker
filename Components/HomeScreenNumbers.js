import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function HomeScreenNumbers(props) {
  return (
    <View style={styles.numbers}>
      <View style={styles.homeStats}>
        <View style={styles.homeStats}>
          <Text style={styles.textNum}>
            {
              props.api.json[props.country][
                props.api.json[props.country].length - 1
              ].confirmed
            }
          </Text>
          <Text style={styles.textStats}>Confirmed</Text>
        </View>
        <View style={styles.homeStats}>
          <Text style={[styles.textNum, {color: '#D90F27'}]}>
            {
              props.api.json[props.country][
                props.api.json[props.country].length - 1
              ].deaths
            }
          </Text>
          <Text style={styles.textStats}>Deaths</Text>
        </View>
      </View>

      <View style={styles.homeStats}>
        <Text style={styles.textNum}>
          {props.api.json[props.country][
            props.api.json[props.country].length - 1
          ].confirmed -
            props.api.json[props.country][
              props.api.json[props.country].length - 1
            ].deaths -
            props.api.json[props.country][
              props.api.json[props.country].length - 1
            ].recovered}
        </Text>
        <Text style={styles.textStats}>Infected</Text>
        <View style={styles.homeStats}>
          <Text style={[styles.textNum, {color: '#53D594'}]}>
            {
              props.api.json[props.country][
                props.api.json[props.country].length - 1
              ].recovered
            }
          </Text>
          <Text style={styles.textStats}>Recovered</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeStats: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  textNum: {
    fontSize: 34,
    color: 'black',
    fontWeight: 'bold',
  },

  textStats: {
    fontSize: 26,
    color: 'grey',
    fontWeight: 'bold',
  },
});

export default HomeScreenNumbers;
