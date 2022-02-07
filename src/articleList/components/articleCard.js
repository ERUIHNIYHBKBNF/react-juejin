import React from "react";
import style from "../style.module.scss";
export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    // id author title brief time
  }
  formatTime(time) {
    const date = new Date(parseInt(time) * 1000), now = new Date();
    if (now.getMonth() - date.getMonth()) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    } else if (now.getDate() - date.getDate()) {
      return now.getDate() - date.getDate() + "天前";
    } else if (now.getHours() - date.getHours()) {
      return now.getHours() - date.getHours() + "小时前";
    } else if (now.getMinutes() - date.getMinutes()) {
      return now.getMinutes() - date.getMinutes() + "分钟前";
    } else {
      return "刚刚";
    }
  }
  render() {
    return (
      <div className={ style['article-card'] }>
        <h3>{ this.props.title }</h3>
        <span>{ this.props.author }</span> | <span> { this.formatTime(this.props.createTime) } </span>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{ this.props.briefContent }</p>
      </div>
    );
  }
}