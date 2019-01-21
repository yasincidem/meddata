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
import Slider from "react-native-slider";
var moment = require('moment');

export default class RealActivitiesScreen extends Component {
	
	state = {
		data: [],
		openDialog: false,
		painPercentage: 0.5,
		diseases: [],
		symptoms: [],
		clickedButtonTitle: ''
	}

	static navigationOptions = {
    header: null,
	};

	componentDidMount = () => {
		fire.database().ref().child(`info/123456/diseases`).on('value', (snap) => {
			this.setState({diseases: snap.val()})
		});

		fire.database().ref().child(`Symptoms/Asthma`).on('value', (snap) => {
			this.setState({symptoms: snap.val()})
			// console.log(snap.val())
		});

		fire.database().ref().child(`activities/123456`).on('value', (snap) => {
			// console.log(Object.values(snap.val()));
			// const items = snap.val().map((value, index) => {s
			// 	return (
			// 		{title: moment().format('L'), description: value}
			// 	);
			// });

			const www = Object.values(snap.val()).map((value, index) => {
				console.log(value[0])
				return(
					{title: Object.keys(snap.val())[index], description: `${Object.values(value[0])[0]}, ${Object.values(value[0])[1]}  ` }
				);
			});

			this.setState({data: www.reverse()});

			// console.log(items);
			// this.setState({data: items});
		});
	}
	
  render() {
		
		const symptomsButton = this.state.symptoms.map((value, index) => {
			return (
				<View style={{marginTop: 8}}>
				<Button
						onPress={() => {
							this.setState({openDialog: true, clickedButtonTitle: value});
						}}
  					title={value}
				/>
				</View>
			);
		});

    return (
			<View style={{flex: 1}}>
				<MaterialDialog
			  	title="How is your abdominal pain now?"
			  	visible={this.state.openDialog}
			  	onOk={() => {
						this.setState({ openDialog: false });
						const favkey = fire.database().ref().child(`activities/123456/${moment().format().replace(new RegExp('/', 'g'), '-')}`).push().key
        		const updates = {}
        		updates[`activities/123456/${moment().format('L').replace(new RegExp('/', 'g'), '-')}`] = {0: this.state.clickedButtonTitle}
        		fire.database().ref().update(updates)
					}}
			  	onCancel={() => this.setState({ openDialog: false })}>
						<Slider
          		value={this.state.painPercentage}
          		onValueChange={painPercentage => this.setState({ painPercentage })}
        		/>
				</MaterialDialog>
				<Text style={{marginTop: 48,marginLeft: 16, fontWeight: 'bold'}}>{moment().format('L')}</Text>
				<View style={{marginTop: 8,marginLeft: 16, marginRight: 16, flex: 0.5}}>
					{symptomsButton}
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
