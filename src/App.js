import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ExploreScene from './scenes/Explore'
import AboutScene from './scenes/About'
const { Header, Content } = Layout

const SideMenu = () => (
	<Menu mode="horizontal" style={{ lineHeight: '64px' }}>
		<Menu.Item key="1">
			<Link to="/">
				<Icon type="github" />
				Explore
			</Link>
		</Menu.Item>

		<Menu.Item key="2">
			<Link to="/about">
				<Icon type="info-circle-o" />
				About
			</Link>
		</Menu.Item>
	</Menu>
)

const Router = () => (
	<div>
		<Route exact path="/" component={ExploreScene} />
		<Route path="/about" component={AboutScene} />
	</div>
)

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Layout>
						<Header style={styles.header}>
							<div style={styles.logo}>
								<h2>Github Explorer</h2>
							</div>
							<SideMenu />
						</Header>
						<Layout>
							<Content style={styles.content}>
								<Router />
							</Content>
						</Layout>
					</Layout>
				</div>
			</BrowserRouter>
		)
	}
}

const styles = {
	header: {
		background: '#fff',
	},
	logo: {
		float: 'left',
		marginRight: 25,
	},
	content: {
		background: '#fff',
	},
}

export default App
