import React, { Component } from 'react';
import styles from './index.module.scss';

import { ComboChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

import { withConsumer } from '../context';

import {
	Select,
	SelectItem,
} from '@carbon/react';

@withConsumer
class Comp extends Component {
	state = {
		data: [
			{
				"group": "Health",
				"key": "2018-12-29T16:00:00.000Z",
				"value": 312
			},
			{
				"group": "Health",
				"key": "2019-01-05T16:00:00.000Z",
				"value": 232
			},
			{
				"group": "Health",
				"key": "2019-01-07T16:00:00.000Z",
				"value": 432
			},
			{
				"group": "Health",
				"key": "2019-01-14T16:00:00.000Z",
				"value": 712
			},
			{
				"group": "Health",
				"key": "2019-01-18T16:00:00.000Z",
				"value": 834
			},
			{
				"group": "Health",
				"key": "2019-01-31T16:00:00.000Z",
				"value": 800
			},
			{
				"group": "Health",
				"key": "2019-02-04T16:00:00.000Z",
				"value": 612
			},
			{
				"group": "Health",
				"key": "2019-02-12T16:00:00.000Z",
				"value": 442
			},
			{
				"group": "Temperature",
				"key": "2018-12-31T16:00:00.000Z",
				"temp": -20
			},
			{
				"group": "Temperature",
				"key": "2019-01-04T16:00:00.000Z",
				"temp": -12
			},
			{
				"group": "Temperature",
				"key": "2019-01-07T16:00:00.000Z",
				"temp": 3
			},
			{
				"group": "Temperature",
				"key": "2019-01-12T16:00:00.000Z",
				"temp": 18
			},
			{
				"group": "Temperature",
				"key": "2019-01-18T16:00:00.000Z",
				"temp": 24
			},
			{
				"group": "Temperature",
				"key": "2019-02-01T16:00:00.000Z",
				"temp": 34
			},
			{
				"group": "Temperature",
				"key": "2019-02-06T16:00:00.000Z",
				"temp": 37
			},
			{
				"group": "Temperature",
				"key": "2019-02-08T16:00:00.000Z",
				"temp": 30
			}
		],
		options: {
			// "title": "Combo (Line + Area) Time series",
			"points": {
				"enabled": false
			},
			"axes": {
				"left": {
					// "title": "Score",
					"mapsTo": "value"
				},
				"bottom": {
					"scaleType": "time",
					"mapsTo": "key"
				},
				"right": {
					// "title": "Temperature (°C)",
					"mapsTo": "temp",
					"correspondingDatasets": [
						"Temperature"
					]
				}
			},
			"comboChartTypes": [
				{
					"type": "area",
					"options": {},
					"correspondingDatasets": [
						"Health"
					]
				},
				{
					"type": "line",
					"options": {
						"points": {
							"enabled": true
						}
					},
					"correspondingDatasets": [
						"Temperature"
					]
				}
			],
			"curve": "curveNatural",
			"timeScale": {
				"addSpaceOnEdges": 0
			},
			"height": "300px"
		}
	};

	componentDidMount = () => {
		this.props.init?.(this)
	}

	render() {

		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.title}>Trend chart</div>
					<div className={styles.options}>
						<Select
							labelText=""
							value={'Done'}
							onChange={() => { }}
							required
							size={'sm'}
						>
							<SelectItem value="Done" text="Select an Option" />
						</Select>
					</div>
				</div>
				<div className={styles.chart}>
					<div style={{ position: 'relative', top: '0px' }}>
						<ComboChart
							data={this.state.data}
							options={this.state.options}>
						</ComboChart>
					</div>
				</div>
			</div>
		);
	}
}

export default Comp;