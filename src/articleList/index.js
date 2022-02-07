import React from "react";
import style from "./style.module.scss";
import Header from "./components/header";
import Bottom from "./components/bottom";
import Body from "./components/body";
export default class ArticleList extends React.Component {
  render() {
    return (
      <div className={style['container']}>
        <Header/>
        <Body/>
        <Bottom/>
      </div>
    );
  }
}