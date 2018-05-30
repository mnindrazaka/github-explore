import React, { Component } from "react"
import { Input, Row, Col, Icon, Pagination } from "antd"
import RepoCard from "./components/RepoCard"
import UserCard from "./components/UserCard"
import SelectKey from "./components/SelectKey"
import axios from "axios"
const { Search } = Input

export default class Explore extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: "",
			loading: false,
			items: [],
			currentPage: 1,
			itemPerPage: 12,
			key: "repositories",
		}
	}

	search() {
		this.setState({ loading: true }, () => {
			const { key, searchText } = this.state
			axios
				.get(`https://api.github.com/search/${key}?q=${searchText}`)
				.then(response => {
					this.setState({
						loading: false,
						items: response.data.items,
						currentPage: 1,
					})
				})
				.catch(err => {
					alert(err)
					this.setState({ loading: false })
				})
		})
	}

	renderResult() {
		if (this.state.loading) {
			return <Icon type="loading" style={styles.loading} />
		} else if (this.state.items.length === 0) {
			return <h1>Data Kosong</h1>
		} else {
			const { currentPage, itemPerPage, items, key } = this.state
			const offset = (currentPage - 1) * itemPerPage
			const filteredItem = items.slice(offset, offset + itemPerPage)

			return filteredItem.map((item, index) => (
				<Col span={4} key={index}>
					{key === "repositories" ? (
						<RepoCard item={item} />
					) : (
						<UserCard item={item} />
					)}
				</Col>
			))
		}
	}

	changeSearchText(text) {
		this.setState({ searchText: text })
	}

	changePage(page) {
		this.setState({ currentPage: page })
	}

	changeKey(key) {
		this.setState({ key, items: [] }, () => this.search())
	}

	render() {
		console.log("state", this.state)
		return (
			<div>
				<Search
					addonBefore={<SelectKey onChange={value => this.changeKey(value)} />}
					placeholder="Search Something"
					onSearch={() => this.search()}
					onChange={event => this.changeSearchText(event.target.value)}
					value={this.state.searchText}
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
