import React from "react";
import { useParams, Link } from "react-router-dom";
import style from "./style.module.scss";
import Body from "./components/body";
import Comments from "./components/comments";
export default function Article() {
  let { id } = useParams();
  return (
    <div className={ style['article-container'] }>
      <div className={ style['back'] }>
        <Link
          style={{ textDecoration:'none', color: '#000' }}
          to="/"
        >
          &nbsp;&nbsp;&lt;返回
        </Link>
      </div>
      <div className={ style['content'] }>
        <Body
          id={ id }
        />
        <Comments
          id={ id }
        />
      </div>
    </div>
  );
}