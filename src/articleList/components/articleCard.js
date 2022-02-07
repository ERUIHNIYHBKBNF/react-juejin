import React from "react";
import style from "../style.module.scss";
export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    // id author title brief time
  }
  render() {
    return (
      <div className={style['article-card']}>
        <h2>{ this.props.title }</h2>
        <span>{ this.props.author }</span> | <span> { this.props.createTime } </span>
        <p>{ this.props.brief }</p>
      </div>
    );
  }
}