import React, {Component} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {View} from 'react-native';

export default class Graphics extends Component {
  dates = [];
  value = [];

  get() {
    this.dates = [];
    this.value = [];
    if (this.props.type === 'deaths') {
      this.props.api.json[this.props.country].forEach(i => {
        this.dates.push(i.date);
        this.value.push(i.deaths);
      });
    } else {
      this.props.api.json[this.props.country].forEach(i => {
        this.dates.push(i.date);
        this.value.push(i.confirmed);
      });
    }
  }

  render() {
    this.get();
    return (
      <View>
        <LineChart
          data={{
            labels: this.dates,
            datasets: [
              {
                data: this.value,
              },
            ],
          }}
          width={5500}
          height={300}
          onDataPointClick={({value, labels, getColor}) => snack}
          verticalLabelRotation={55}
          segments={7}
          xLabelsOffset={-15}
          yLabelsOffset={-5430}
          formatYLabel={s => {
            return parseInt(s, 10).toString();
          }}
          chartConfig={{
            withOuterLines: false,
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 1,
            propsForDots: {
              r: '5',
            },
            propsForLabels: {
              fontSize: 11,
              fontWeight: 'bold',
            },

            color: (opacity = 1) =>
              this.props.type === 'deaths'
                ? `rgba(217, 15, 51, ${opacity})`
                : `rgba(15, 115, 222, ${opacity})`,
            labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
            propsForBackgroundLines: {
              strokeDasharray: '5',
              strokeWidth: 0.3,
              stroke: `rgba(0, 0, 0, .50)`,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
}
