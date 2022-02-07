import React from "react";
import style from "./style.module.scss";
import Header from "./components/header";
import Bottom from "./components/bottom";
import Body from "./components/body";
import SubHeader from "./components/subHeader";
export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTabs: ['推荐', '前端', '后端'],
      activeHeaderTab: 0,
      subHeaderTabs: [
        [],
        ['Js', 'React', 'Vue'],
        ['Node', 'Java', 'MongoDB'],
      ],
      activeSubTab: 0,
      bottomTabs: ['热门', '最新', '历史'],
      activeBottomTab: 0,
    }
  }
  changeHeaderTab = (index) => {
    this.setState({
      activeHeaderTab: index,
      activeSubTab: 0,
    });
  }
  changeSubTab = (index) => {
    this.setState({
      activeSubTab: index,
    });
  }
  changeBottomTab = (index) => {
    this.setState({
      activeBottomTab: index,
    });
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