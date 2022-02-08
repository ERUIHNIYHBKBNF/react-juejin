import { Routes, Route } from 'react-router-dom';
import ArticleList from './articleList';
import Article from './article';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  );
}
