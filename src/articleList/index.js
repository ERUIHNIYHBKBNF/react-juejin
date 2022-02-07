import React from "react";
import style from "./style.module.scss";
import Header from "./components/header";
import Bottom from "./components/bottom";
import Body from "./components/body";
import SubHeader from "./components/subHeader";
import { getCategories, getArticles } from "../fake-api";
export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 顶部导航
      headerTabs: [],
      activeHeaderTab: 0,
      // 二级导航
      subHeaderTabs: [[]],
      activeSubTab: 0,
      // 底部导航
      bottomTabs: [],
      activeBottomTab: 0,
      // 要展示的文章列表
      articleList: [],
    };
  }
  componentDidMount() {
    this.fetchCategories();
    this.fetchArticles();
  }
  // 获取分类
  async fetchCategories() {
    let response = await getCategories();
    const categories = response.data.categories;
    let headerTabs = categories.map(item => {
      return {
        name: item.category_name,
        id: item.category_id,
      }
    });
    let subHeaderTabs = categories.map(item => {
      return item.children ? item.children.map(item => {
        return {
            name: item.category_name,
            id: item.category_id,
          }
        }) : [];
    });
    let bottomTabs = ['热门', '最新', '历史'];
    this.setState({
      headerTabs: headerTabs,
      subHeaderTabs: subHeaderTabs,
      bottomTabs: bottomTabs,
      activeHeaderTab: headerTabs[0].id,
      activeSubTab: subHeaderTabs[0][0] ? subHeaderTabs[0][0].id : -1,
      activeBottomTab: 0,
    });
  }
  // 获取更多文章
  async fetchArticles() {
    if (this.state.activeBottomTab === 2) {
      this.fetchHistoryArticles();
    } else {
      const categoryId = this.state.activeSubTab === -1 ? this.state.activeHeaderTab : this.state.activeSubTab;
      const sortBy = this.state.activeBottomTab == 0 ? 'hot' : 'new';
      const offset = this.state.articleList.length;
      let response = await getArticles(categoryId, sortBy, offset);
      this.setState({
        articleList: this.state.articleList.concat(response.data.articles),
      });
    }
  }
  // 获取历史文章
  fetchHistoryArticles() {

  }
  changeHeaderTab = (id) => {
    this.setState({
      activeHeaderTab: id,
      activeSubTab: this.state.subHeaderTabs[id][0] ? this.state.subHeaderTabs[id][0].id : -1,
      articleList: [],
    });
    this.fetchArticles();
  }
  changeSubTab = (id) => {
    this.setState({
      activeSubTab: id,
      articleList: [],
    });
    this.fetchArticles();
  }
  changeBottomTab = (index) => {
    this.setState({
      activeBottomTab: index,
      articleList: [],
    });
    this.fetchArticles();
  }
  render() {
    return (
      <div className={ style['container'] }>
        <Header
          tabs={ this.state.headerTabs }
          activeTab={ this.state.activeHeaderTab }
          changeTab={ this.changeHeaderTab }
        />
        {
          this.state.subHeaderTabs[this.state.activeHeaderTab].length > 0 &&
          <SubHeader
            tabs={ this.state.subHeaderTabs[this.state.activeHeaderTab] }
            activeTab={ this.state.activeSubTab }
            changeTab={ this.changeSubTab }
          />
        }
        <Body
          articles={ this.state.articleList }
          fetchArticles={ this.fetchArticles }
        />
        <Bottom
          tabs={ this.state.bottomTabs }
          activeTab={ this.state.activeBottomTab }
          changeTab={ this.changeBottomTab }
        />
      </div>
    );
  }
}