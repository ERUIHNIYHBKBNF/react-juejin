import React from "react";
import style from "../style.module.scss";
export default class Header extends React.Component {
  render() {
    return (
      <div className={style['header']}>
        <ul>
          <li>推荐</li>
          <li>前端</li>
          <li>后端</li>
        </ul>
      </div>
    );
  }
}