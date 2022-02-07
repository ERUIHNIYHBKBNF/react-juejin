import React from "react";
import style from "../style.module.scss";
export default class Bottom extends React.Component {
  render() {
    return (
      <div className={style['sub-header']}>
        <ul>
          <li>Js</li>
          <li>React</li>
          <li>Vue</li>
        </ul>
      </div>
    );
  }
}