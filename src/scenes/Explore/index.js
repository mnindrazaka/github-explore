import React, { Component } from 'react'
import { Input } from 'antd'
import axios from 'axios'
const { Search } = Input

export default class Explore extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
		}
	}

	search(value) {
		axios
			.get(`https://api.github.com/search/repositories?q=${value}`)
			.then(response => {
				this.setState({
					items: response.data.items,
				})
			})
	}

	render() {
		console.log(this.state.items)
		return (
			<div>
				<Search
					placeholder="Search something"
					onSearch={value => this.search(value)}
					enterButton
					size="large"
				/>
			</div>
		)
	}
}
