import React from "react";
import style from "../style.module.scss";
import ArticleCard from "./articleCard";
import { Link } from "react-router-dom";
export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
    this.state = {
      observer: null,
    };
  }
  componentDidMount() {
    const observer = new IntersectionObserver(
      () => {
        // 这算在玩火吗qwq？
        this.props.father.fetchArticles();
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(this.loading.current);
  }
  addToHistory(articleInfo) {
    // 除了暴力去重没想到什么好的办法，先不写去重了qwq
    const history = localStorage.getItem('historyArticles');
    if (history) {
      const historyArticles = JSON.parse(history);
      historyArticles.unshift(articleInfo);
      localStorage.setItem('historyArticles', JSON.stringify(historyArticles));
    } else {
      localStorage.setItem('historyArticles', JSON.stringify([articleInfo]));
    }
  }
  render() {
    return (
      <div className={style['body']}>
        <ul>
          {this.props.articles.map((item, index) => (
            <Link
              style={{ textDecoration:'none', color: '#000' }}
              to={ '/article/' + item.article_id }
              key={ index }
            >
              <li
                onClick={ () => { this.addToHistory(item) } }
              ><ArticleCard
                title={ item.article_info.title }
                author={ item.author_user_info.user_name }
                createTime={ item.article_info.ctime }
                briefContent={ item.article_info.brief_content }
              /></li>
            </Link>
          ))}
        </ul>
        <span ref={this.loading} className={style['loading']}>
          { this.props.end ? '没有更多了嘤~' : '加载中...' }
        </span>
      </div>
    );
  }
}