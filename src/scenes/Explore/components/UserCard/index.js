import React, { Component } from "react"
import { Card } from "antd"
const { Meta } = Card

export default class UserCard extends Component {
	render() {
		const { item } = this.props
		return (
			<a href={item.html_url}>
				<Card hoverable cover={<img src={item.avatar_url} alt={item.login} />}>
					<Meta title={item.login} />
				</Card>
			</a>
		)
	}
}
