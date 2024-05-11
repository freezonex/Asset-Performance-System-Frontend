import React, { Component } from 'react';
import styles from './index.module.scss';

import { ComboChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

import { withConsumer } from '../context';
import { allList, queryChartData } from '@/api/common';
import {
	Select,
	SelectItem,
} from '@carbon/react';

@withConsumer
class Comp extends Component {
	state = {
		selectList: [],
		value: '',

		data: [],
		data2: [
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
				// "right": {
				// 	// "title": "Temperature (°C)",
				// 	"mapsTo": "temp",
				// 	"correspondingDatasets": [
				// 		"Quantity"
				// 	]
				// }
			},
			"comboChartTypes": [
				{
					"type": "area",
					"options": {},
					"correspondingDatasets": [
						"ExpectedQuantity"
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
						"Quantity"
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
		this.allList()
	}

	// 获取列表
	allList = async (params = {}) => {
		var reqData = {};
		reqData = { ...reqData, ...params };
		var rs = await allList(reqData);
		if (rs.data.code == 200) {
			this.setState({
				selectList: rs.data.data,
				value: rs.data.data[0].id || '',
			}, () => {
				this.initChart()
			})
		}
	};

	initChart = async (params = {}) => {
		var reqData = {
			"assetTypeId": this.state.value,
		};
		reqData = { ...reqData, ...params };
		var rs = await queryChartData(reqData);
		if (rs.data.code == 200) {
			console.log(rs.data.data)
			var data = rs.data.data

			var list = []

			data.dataList.forEach((item, i) => {
				list.push({
					"group": "ExpectedQuantity",
					"key": item.date,
					"value": item.expectedQuantity || 0
				})
			})

			data.dataList.forEach((item, i) => {
				list.push({
					"group": "Quantity",
					"key": item.date,
					"value": item.quantity || 0
				})
			})

			this.setState({ data: list })
		}
	}

	render() {
		const { selectList, value } = this.state
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.title}>Trend chart</div>
					<div className={styles.options}>
						<Select
							labelText=""
							value={value}
							required
							size={'sm'}
							onChange={(v) => {
								this.setState({ value: v.target.value })
								this.initChart({
									"assetTypeId": v.target.value,
								})
							}}
						>
							{
								selectList.map((item, i) => {
									return <SelectItem value={item.id} text={item.assetType} />
								})
							}
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