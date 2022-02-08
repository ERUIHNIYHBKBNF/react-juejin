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
      // 当前分类下总文章数
      totalArticles: 0,
    };
  }
  componentDidMount() {
    this.fetchCategories();
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
      const sortBy = this.state.activeBottomTab === 0 ? 'hot' : 'new';
      const offset = this.state.articleList.length;
      let response = await getArticles(categoryId, sortBy, offset);
      this.setState({
        articleList: this.state.articleList.concat(response.data.articles),
        totalArticles: response.total,
      });
    }
  }
  // 获取历史文章
  fetchHistoryArticles() {
    const history = localStorage.getItem('historyArticles');
    if (history) {
      const historyArticles = JSON.parse(history);
      this.setState({
        articleList: historyArticles,
        totalArticles: historyArticles.length,
      });
    } else {
      this.setState({
        articleList: [],
        totalArticles: 0,
      });
    }
  }
  changeHeaderTab = async (id) => {
    await this.setState({
      activeHeaderTab: id,
      activeSubTab: this.state.subHeaderTabs[id][0] ? this.state.subHeaderTabs[id][0].id : -1,
      articleList: [],
    });
    sessionStorage.removeItem('homeState');
    this.fetchArticles();
  }
  changeSubTab = async (id) => {
    await this.setState({
      activeSubTab: id,
      articleList: [],
    });
    sessionStorage.removeItem('homeState');
    this.fetchArticles();
  }
  changeBottomTab = async (index) => {
    await this.setState({
      activeBottomTab: index,
      articleList: [],
    });
    sessionStorage.removeItem('homeState');
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
          end= { this.state.articleList.length >= this.state.totalArticles }
          father={ this }
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