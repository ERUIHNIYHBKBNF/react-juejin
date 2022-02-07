import React from "react";
import style from "../style.module.scss";
import ArticleCard from "./articleCard";
export default class Body extends React.Component {
  render() {
    return (
      <div className={style['body']}>
        <ul>
          <li><ArticleCard
            title="title"
            author="author"
            createTime="time"
            brief="brief"
          /></li>
          <li><ArticleCard/></li>
          <li><ArticleCard/></li>
          <li><ArticleCard/></li>
          <li><ArticleCard/></li>
          <li><ArticleCard/></li>
          <li><ArticleCard/></li>
        </ul>
        <span className={style['loading']}>加载中...</span>
      </div>
    );
  }
}