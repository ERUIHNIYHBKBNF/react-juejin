import React from "react";
import style from "../style.module.scss";
import { getCommentsByArticleId } from "../../fake-api";
export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
    this.state = {
      comments: [],
      observer: null,
      total: 0,
    }
  }
  componentDidMount() {
    const observer = new IntersectionObserver(
      () => {
        this.fetchComments();
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(this.loading.current);
    this.fetchComments();
  }
  async fetchComments() {
    const response = await getCommentsByArticleId(this.props.id, this.state.comments.length);
    let comments = this.state.comments;
    comments = comments.concat(response.data.comments);
    this.setState({
      comments,
      total: response.total,
    });
  }
  renderCommentCard(comment) {
    return (
      <li
        key={ comment.comment_id }
      >
        <div className={ style['card-header'] }>
          <img
            className={ style['avatar'] }
            src={ comment.user_info.avatar_large }
            alt=""
          />
          <span className={ style['username'] }> { comment.user_info.user_name } </span>
        </div>
        <p className={ style['content'] }>
          { comment.comment_info.comment_content }
        </p>
      </li>
    );
  }
  render() {
    return (
      <div className={style['comments']}>
        <ul>
          {this.state.comments.map(this.renderCommentCard)}
        </ul>
          <span ref={this.loading} className={ style['loading'] }>
            { this.state.total === this.state.comments.length ? '没有更多了嘤~' : '加载中...' }
          </span>
      </div>
    );
  }
}