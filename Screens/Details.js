import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export default class Details extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.viewHead}>
            <Text style={styles.textHeader}>Date</Text>
            <Text style={styles.textHeader}>Confirmed</Text>
            <Text style={styles.textHeader}>Deaths</Text>
            <Text style={styles.textHeader}>Recovered</Text>
            <Text style={styles.textHeader}>Active</Text>
          </View>
          <FlatList
            data={this.props.route.params.api.json[
              this.props.route.params.country
            ]
              .slice()
              .reverse()}
            renderItem={({item, index}) => (
              <View style={styles.scroll}>
                <Text style={styles.textList}>{item.date}</Text>
                <Text style={styles.textList}>{item.confirmed}</Text>
                <Text style={styles.textList}>{item.deaths}</Text>
                <Text style={styles.textList}>{item.recovered}</Text>
                <Text style={styles.textList}>
                  {item.confirmed - item.deaths - item.recovered}
                </Text>
              </View>
            )}
            keyExtractor={i => i.date}
            initialNumToRender={120}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerScroll: {
    flex: 1,
    backgroundColor: 'white',
  },

  viewHead: {
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },

  scroll: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textList: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});
