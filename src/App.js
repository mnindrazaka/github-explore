import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import Scenes from './scenes'

const { Header, Content } = Layout

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Header style={styles.header}>
            <h2 style={styles.logo}>Github Explorer</h2>
            <Navigation />
          </Header>
          <Layout>
            <Content style={styles.content}>
              <Scenes />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

const styles = {
  header: {
    background: '#fff'
  },
  logo: {
    float: 'left',
    marginRight: 25
  },
  content: {
    background: '#fff',
    padding: 50
  }
}

export default App
