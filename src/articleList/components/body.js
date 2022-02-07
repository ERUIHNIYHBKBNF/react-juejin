import React from "react";
import style from "../style.module.scss";
import ArticleCard from "./articleCard";
import { Link } from "react-router-dom";
export default class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style['body']}>
        <ul>
          {this.props.articles.map((item) => (
            <Link
              style={{ textDecoration:'none', color: '#000' }}
              to={ '/article/' + item.article_id }
              key={ item.article_id }
            >
              <li><ArticleCard
                title={ item.article_info.title }
                author={ item.author_user_info.user_name }
                createTime={ item.article_info.ctime }
                briefContent={ item.article_info.brief_content }
              /></li>
            </Link>
          ))}
        </ul>
        <span className={style['loading']}>加载中...</span>
      </div>
    );
  }
}