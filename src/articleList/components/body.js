import React from "react";
import style from "../style.module.scss";
export default class Body extends React.Component {
  render() {
    return (
      <div className={style['body']}>
        <div className={style['block']}/>
        <div className={style['block']}/>
        <div className={style['block']}/>
      </div>
    );
  }
}