import React from "react";
import style from "../style.module.scss";
export default class Bottom extends React.Component {
  render() {
    return (
      <div className={style['bottom']}>
        <ul>
          {this.props.tabs.map((item, index) => (
            <li
              onClick={ () => this.props.changeTab(index) }
              className={ this.props.activeTab === index ? style['active-tab'] : '' }
              key={ index }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}