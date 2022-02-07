import React from "react";
import style from "../style.module.scss";
export default class Bottom extends React.Component {
  render() {
    return (
      <div className={ style['sub-header'] }>
        <ul>
          {this.props.tabs.map((item) => (
            <li
              onClick={ () => this.props.changeTab(item.id) }
              className={ this.props.activeTab === item.id ? style['active-tab'] : '' }
              key={ item.id }
            >
              { item.name }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}