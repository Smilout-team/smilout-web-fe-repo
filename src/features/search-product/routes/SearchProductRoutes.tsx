import { Routes, Route } from 'react-router-dom';
import StoreSelectionPage from '../pages/StoreSelectionPage';
import SearchProductPage from '../pages/SearchProductPage';
export default function SearchProductRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StoreSelectionPage />} />
      <Route path="/:storeId" element={<SearchProductPage />} />
    </Routes>
  );
}
