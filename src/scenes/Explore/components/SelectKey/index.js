import React, { Component } from "react"
import { Select } from "antd"
const { Option } = Select

class SelectKey extends Component {
	render() {
		return (
			<Select
				defaultValue="repositories"
				style={{ width: 120 }}
				onChange={value => this.props.onChange(value)}>
				<Option value="repositories">repositories</Option>
				<Option value="users">users</Option>
			</Select>
		)
	}
}

export default SelectKey
