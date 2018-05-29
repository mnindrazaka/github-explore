import React, { Component } from "react"
import { Input, Card, Row, Col, Icon, Pagination } from "antd"
import RepoCard from "./components/RepoCard"
import axios from "axios"
const { Search } = Input
const { Meta } = Card

export default class Explore extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			items: [],
			currentPage: 1,
			itemPerPage: 12,
		}
	}

	search(value) {
		this.setState({ loading: true })
		axios
			.get(`https://api.github.com/search/repositories?q=${value}`)
			.then(response => {
				this.setState({
					loading: false,
					items: response.data.items,
					currentPage: 1,
				})
			})
			.catch(err => {
				alert("Error Happen !")
				this.setState({ loading: false })
			})
	}

	renderResult() {
		if (this.state.loading) {
			return <Icon type="loading" style={styles.loading} />
		} else if (this.state.items.length === 0) {
			return <h1>Data Kosong</h1>
		} else {
			const { currentPage, itemPerPage, items } = this.state
			const offset = (currentPage - 1) * itemPerPage
			const filteredItem = items.slice(offset, offset + itemPerPage)
			return filteredItem.map((item, index) => (
				<Col span={4} key={index}>
					<RepoCard item={item} />
				</Col>
			))
		}
	}

	changePage(page) {
		this.setState({ currentPage: page })
		this.renderResult()
	}

	render() {
		console.log("state", this.state)
		return (
			<div>
				<Search
					placeholder="Search Repository"
					onSearch={value => this.search(value)}
					enterButton
					size="large"
					style={styles.search}
				/>

				<Row gutter={15}>{this.renderResult()}</Row>

				<Pagination
					style={styles.pagination}
					current={this.state.currentPage}
					total={this.state.items.length}
					pageSize={this.state.itemPerPage}
					onChange={page => this.changePage(page)}
					hideOnSinglePage={true}
				/>
			</div>
		)
	}
}

const styles = {
	search: {
		marginBottom: 15,
	},
	loading: {
		fontSize: 30,
	},
	pagination: {
		marginTop: 20,
	},
}
