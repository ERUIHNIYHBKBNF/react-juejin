import React from "react";
import { getArticleById } from "../../fake-api";
export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      title: "",
    };
  }
  componentDidMount() {
    this.fetchArticle();
  }
  async fetchArticle() {
    const response = await getArticleById(this.props.id);
    console.log(response);
    this.setState({
      article: response.data.article.article_content,
      title: response.data.article.article_info.title,
    });
  };
  render() {
    return (
      <div>
        <h2> { this.state.title } </h2>
        <div
          className='editor-wrapper'
          dangerouslySetInnerHTML={{__html: this.state.article }}
        />
      </div>
    );
  }
}