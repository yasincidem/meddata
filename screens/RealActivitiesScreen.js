import React, { Component } from 'react'
import {
	Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import fire from '../config/fire';
import Timeline from 'react-native-timeline-listview';
import { MaterialDialog } from 'react-native-material-dialog';
var moment = require('moment');

export default class RealActivitiesScreen extends Component {
	
	state = {
		data: [],
		openDialog: false,
	}

	constructor(props) {
		super(props);
		this.data = [
			{title: moment().format('L'), description: 'Headache'},
			{title: 'Event 2', description: 'Event 2 Description'},
			{title: 'Event 3', description: 'Event 3 Description'},
			{title: 'Event 4', description: 'Event 4 Description'},
			{title: 'Event 5', description: 'Event 5 Description'}
		]
	}

	static navigationOptions = {
    header: null,
	};

	componentDidMount = () => {
		console.log(moment().format('L').split(new RegExp('/', 'g')).join('-'))
		fire.database().ref().child(`activities/123456/${moment().format('L').split(new RegExp('/', 'g')).join('-')}/data`).on('value', (snap) => {
			console.log(snap.val());

			// this.setState({arr: snap.val()});

			const items = snap.val().map((value, index) => {
				return (
					{title: moment().format('L'), description: value}
				);
			});

			console.log(items);
			this.setState({data: items});
		});
	}
	
  render() {
		// const dates = this.state.arr.map((value, index) => {
		// 	return (
		// 		<Text>{value}</Text>
		// 	);
		// });

    return (
			<View style={{flex: 1}}>
				<MaterialDialog
			  title="Use Google's Location Service?"
			  visible={this.state.openDialog}
			  onOk={() => this.setState({ openDialog: false })}
			  onCancel={() => this.setState({ openDialog: false })}>
			  <Text>
			    Let Google help apps determine location. This means sending anonymous
			    location data to Google, even when no apps are running.
			  </Text>
				</MaterialDialog>
				<View style={{marginTop: 48,marginLeft: 16, marginRight: 16, flex: 0.5}}> 
					<Button
						style={{marginTop: 48}}
						onClick={() => {
							this.setState({openDialog: true});
						}}
  					title={'Headache'}
					/>
				</View>
				<Timeline
					innerCircle='dot'
					style={{marginTop: 16}}
					data={this.state.data}
					showTime={false}
					separator
					renderFullLine
        />
			</View>
    )
  }
}
