# 开始做一个React项目叭——历程记录

有几次vue项目经历，尝试写个react小项目（~~比着跟官方教程写的tictactoe抄抄就行了~~），在此做点记录。

## 初始化

按官方文档来，创建一个新的单页应用。

```bash
npx create-react-app react-juejin
cd react-juejin
npm start
```

然后一堆奇奇怪怪看不懂的文件全删掉（逃），最后留一点变成这样就好了叭：

![](https://cdn.jsdelivr.net/gh/ERUIHNIYHBKBNF/picapica@main/frontend/2022020702.webp)

## 添加路由

**看文档之前一定先看好版本QAQ**

最后参考了这篇文章：[React Router v6 使用指南](https://zhuanlan.zhihu.com/p/191419879)

抄一下官方的demo：[Basic Example](https://reactrouter.com/docs/en/v6/examples/basic)

看起来只有 文章列表 和 文章 两个页面，不是很麻烦的样子qwq

```bash
npm install -s react-router-dom@6
```

然后用Router就相当于一个组件一样方便使用，具体去翻文档就好了唔。

index.js：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

```

App.js：

```jsx
import { Routes, Route } from 'react-router-dom';
import ArticleList from './articleList';
import Article from './article';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/article" element={<Article />} />
    </Routes>
  );
}
```

然后写写articleList和article两个组件的初始化：

```jsx
import React from "react";
export default class ArticleList extends React.Component {
  render() {
    return (
      <div>ArticleList</div>
    );
  }
}
```

可以正常访问，然后开始撸页面就好了唔。

顺带现在长这个样子：

![](https://cdn.jsdelivr.net/gh/ERUIHNIYHBKBNF/picapica@main/frontend/2022020703.webp)