import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import GetApi from '../Components/GetApi';
import {ActivityIndicator, Colors} from 'react-native-paper';

export default class Details extends React.Component {
  api = new GetApi();
  isEnter = true;

  async buildList() {
    await this.api.getData();
    await this.api.flat(this.props.route.params.country);
    this.isEnter = false;
    this.forceUpdate();
  }

  render() {
    if (this.isEnter) {
      this.buildList();
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerScroll}>
          <View style={styles.viewHead}>
            <Text style={styles.textHeader}>Date</Text>
            <Text style={styles.textHeader}>Confirmed</Text>
            <Text style={styles.textHeader}>Deaths</Text>
          </View>

          <ActivityIndicator
            animating={this.isEnter}
            color={Colors.red800}
            hidesWhenStopped={true}
            size={55}
            style={{flex: 1}}
          />

          <ScrollView>
            {this.api.flatDate
              .slice(0)
              .reverse()
              .map(i => {
                if (i !== undefined) {
                  return (
                    <View style={styles.scroll}>
                      <Text style={styles.textList} key={i.date_value}>
                        {i.date_value}
                      </Text>
                      <Text style={styles.textList} key={i.date_value}>
                        {i.confirmed}
                      </Text>
                      <Text style={styles.textList} key={i.date_value}>
                        {i.deaths}
                      </Text>
                    </View>
                  );
                }
              })}
          </ScrollView>
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
    fontSize: 22,
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
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
});
