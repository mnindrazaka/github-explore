import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

class Navigation extends Component {
  render() {
    return (
      <Menu mode="horizontal" defaultSelectedKeys={'explore'}>
        <Menu.Item key="explore">
          <Link to="/">
            <Icon type="github" />
            Explore
          </Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link to="/about">
            <Icon type="info-circle-o" />
            About
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navigation
