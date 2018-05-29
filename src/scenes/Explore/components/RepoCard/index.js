import React, { Component } from "react"
import { Card } from "antd"
const { Meta } = Card

export default class RepoCard extends Component {
	render() {
		const { item } = this.props
		return (
			<a href={item.html_url}>
				<Card
					hoverable
					cover={
						<img src={item.owner.avatar_url} alt={item.owner.avatar_url} />
					}>
					<Meta title={item.name} description={item.owner.login} />
				</Card>
			</a>
		)
	}
}
