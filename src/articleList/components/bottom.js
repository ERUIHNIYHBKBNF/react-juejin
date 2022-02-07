import React from "react";
import style from "../style.module.scss";
export default class Bottom extends React.Component {
  render() {
    return (
      <div className={style['bottom']}>
        <ul>
          <li>热门</li>
          <li>最新</li>
          <li>历史</li>
        </ul>
      </div>
    );
  }
}