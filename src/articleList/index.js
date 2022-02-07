import React from "react";
// import style from "./style.module.scss";
import Header from "./components/header";
import Bottom from "./components/bottom";
export default class ArticleList extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Bottom/>
      </div>
    );
  }
}