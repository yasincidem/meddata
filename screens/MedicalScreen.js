import React from 'react';
import { StyleSheet } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import {
  View
} from 'react-native';
import fire from '../config/fire';
import window from '../constants/Layout';
var moment = require('moment');
export default class MedicalScreen extends React.Component {
  state = {
    labels: [],
    data: [],
    commitdata: []
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {
    fire.database().ref().child(`activities/123456`).on('value', (snap) => {
      const labels = Object.keys(snap.val()).reverse().map((value, index) => {
        switch(moment(value, 'MM/DD/YYYY').day()) {
          case 0: return 'Sunday'
          case 1: return 'Monday'
          case 2: return 'Tuesday'
          case 3: return 'Wednesday'
          case 4: return 'Thursday'
          case 5: return 'Friday'
          case 6: return 'Saturday'
        }
      })
      
      const percentage = Object.values(snap.val()).map((value, index) => {
				return(Object.values(value[0])[1] * 100);
      });
      const keys = Object.values(snap.val()).map((value, index) => {
				return(Object.keys(snap.val())[index] );
      });
      
      this.setState({labels: keys, data: percentage});
      
      // const www = Object.values(snap.val()).map((value, index) => {
			// 	console.log(Object.keys(snap.val())[index])
			// 	return(
			// 		{date: moment(Object.keys(snap.val())[index], 'YYYY-MM-DD').toString(), count: Object.values(value[0])[1] }
			// 	);
      // });
		});
  }
  
  render() {
    // each value represents a goal ring in Progress chart
    const commitsData = [
      { date: '2017-01-02', count: 1 },
      { date: '2017-01-03', count: 2 },
      { date: '2017-01-04', count: 3 },
      { date: '2017-01-05', count: 4 },
      { date: '2017-01-06', count: 5 },
      { date: '2017-01-30', count: 2 },
      { date: '2017-01-31', count: 3 },
      { date: '2017-03-01', count: 2 },
      { date: '2017-04-02', count: 4 },
      { date: '2017-03-05', count: 2 },
      { date: '2017-02-30', count: 4 }
    ]

    const chartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(27,94,32, ${opacity})`
    }
    
    return (
      <View style={{marginTop: 32}}>
      <ContributionGraph
        values={commitsData}
        endDate={moment(moment(moment(), 'YYYY-MM-DD'), 'YYYY-MM-DD').toDate()}
        numDays={105}
        width={window.window.width}
        height={220}
        chartConfig={chartConfig}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
