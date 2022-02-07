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
      // headerTabs: ['推荐', '前端', '后端', 'Android', 'iOS'],
      // activeHeaderTab: 0,
      // subHeaderTabs: [
      //   [],
      //   ['Js', 'React', 'Vue'],
      //   ['Go', 'Java', 'Python'],
      //   ['Flutter', 'Java', 'Kotlin'],
      //   ['Flutter', 'Objective-C', 'Swift']
      // ],
      // activeSubTab: 0,
      // bottomTabs: ['热门', '最新', '历史'],
      // activeBottomTab: 0,'
      headerTabs: [],
      activeHeaderTab: 0,
      subHeaderTabs: [[]],
      activeSubTab: 0,
      bottomTabs: [],
      activeBottomTab: 0,
    }
    getCategories().then(response => {
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
    });
  }
  async changeArticleList() {
    
  }
  changeHeaderTab = (id) => {
    this.setState({
      activeHeaderTab: id,
      activeSubTab: this.state.subHeaderTabs[id][0] ? this.state.subHeaderTabs[id][0].id : -1,
    });
    this.changeArticleList();
  }
  changeSubTab = (id) => {
    this.setState({
      activeSubTab: id,
    });
    this.changeArticleList();
  }
  changeBottomTab = (index) => {
    this.setState({
      activeBottomTab: index,
    });
    this.changeArticleList();
  }
  render() {
    return (
      <div className={style['container']}>
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
        <Body/>
        <Bottom
          tabs={ this.state.bottomTabs }
          activeTab={ this.state.activeBottomTab }
          changeTab={ this.changeBottomTab }
        />
      </div>
    );
  }
}