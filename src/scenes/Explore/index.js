import React, { Component } from "react"
import { Input, Card, Row, Col, Icon } from "antd"
import axios from "axios"
const { Search } = Input
const { Meta } = Card

export default class Explore extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			items: [],
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
				})
			})
			.catch(err => {
				alert("Error Happen !")
				this.setState({ loading: false })
			})
	}

	render() {
		console.log(this.state.items)
		return (
			<div>
				<Search
					placeholder="Search Repository"
					onSearch={value => this.search(value)}
					enterButton
					size="large"
					style={styles.search}
				/>

				<Row gutter={15}>
					{this.state.loading ? (
						<Icon type="loading" style={styles.loading} />
					) : (
						this.state.items.map(item => (
							<Col span={4}>
								<a href={item.html_url}>
									<Card
										hoverable
										cover={
											<img src={item.owner.avatar_url} style={styles.card} />
										}>
										<Meta title={item.name} description={item.owner.login} />
									</Card>
								</a>
							</Col>
						))
					)}
				</Row>
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
}
