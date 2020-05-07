import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import GetApi from '../Components/GetApi';

export default class Details extends React.Component {
  api = new GetApi();

  render() {
    this.api.flat(this.props.route.params.country);

    return (
      <View style={styles.container}>
        <Button
          title="Get data"
          style={styles.button}
          onPress={async () => {
            await this.api.getData();
            this.forceUpdate();
          }}
        />
        <View style={styles.containerScroll}>
          <ScrollView>
            {this.api.flatDate.map(i => {
              if (i !== undefined) {
                return (
                  <Text key={i.date_value}>
                    {i.date_value} {i.confirmed}
                  </Text>
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
