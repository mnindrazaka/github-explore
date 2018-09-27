import React, { Component } from 'react'
import { Input, Row, Col, Icon, Pagination } from 'antd'
import { RepoCard, SelectKey, UserCard } from './components'
import { getData } from './services/github'
const { Search } = Input

export default class Explore extends Component {
  state = {
    searchText: '',
    loading: false,
    items: [],
    currentPage: 1,
    itemPerPage: 12,
    key: 'repositories'
  }

  search() {
    const { key, searchText } = this.state
    this.setLoading(true)
    getData(key, searchText).then(data => {
      this.setLoading(false)
      this.setItems(data)
      this.resetPage()
    })
  }

  renderResult() {
    if (this.isLoading()) return <Icon type="loading" style={styles.loading} />
    else if (this.isItemsEmpty()) return <h1>Data Kosong</h1>
    else return this.renderItems()
  }

  renderItems() {
    return this.getFilteredItems().map((item, index) => (
      <Col span={4} key={index}>
        {this.renderCard(item)}
      </Col>
    ))
  }

  getFilteredItems() {
    const { itemPerPage, items, currentPage } = this.state
    const offset = (currentPage - 1) * itemPerPage
    return items.slice(offset, offset + itemPerPage)
  }

  renderCard(item) {
    return this.state.key === 'repositories' ? (
      <RepoCard item={item} />
    ) : (
      <UserCard item={item} />
    )
  }

  setItems(items) {
    this.setState({ items })
  }

  isItemsEmpty() {
    return this.state.items.length === 0
  }

  setLoading(isLoading) {
    this.setState({ loading: isLoading })
  }

  isLoading() {
    return this.state.loading
  }

  changeSearchText(text) {
    this.setState({ searchText: text })
  }

  resetPage() {
    this.setState({ currentPage: 1 })
  }

  changePage(page) {
    this.setState({ currentPage: page })
  }

  changeKey(key) {
    this.setState({ key, items: [] }, () => this.search())
  }

  render() {
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
    marginBottom: 15
  },
  loading: {
    fontSize: 30
  }
}
