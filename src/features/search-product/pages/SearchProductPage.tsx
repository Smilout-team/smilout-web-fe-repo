import React, { useState, useEffect } from 'react';
import AppHeader from '@/shared/components/common/Header';
import { ShoppingBag, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/shared/constants';
import { storeHubService } from '@/shared/services/storeHubService';
import { type Product } from '../types/search';
import Tag from '@/shared/components/common/Tag';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreProducts } from '../hooks/useStoreProducts';

function getCategories(products: Product[]) {
  const map = new Map<string, string>();
  for (const p of products) {
    if (typeof p.category === 'object' && p.category !== null) {
      const cat = p.category as { id: string; name: string };
      map.set(cat.id, cat.name || cat.id);
    } else if (typeof p.category === 'string') {
      map.set(p.category, p.category);
    }
  }
  return ['Tất cả', ...Array.from(map.values())];
}

function removeVietnameseTones(str: string) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export default function SearchProductPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: storeProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useStoreProducts(storeId || '');

  useEffect(() => {
    if (productsLoading) {
      setLoading(true);
      return;
    }
    setLoading(false);
    if (productsError) {
      setError((productsError as Error).message || 'Lỗi khi tải sản phẩm');
      setAllProducts([]);
      setFilteredProducts([]);
      return;
    }
    if (storeProducts) {
      setAllProducts(storeProducts);
      setFilteredProducts(storeProducts);
    }
  }, [storeProducts, productsLoading, productsError]);

  useEffect(() => {
    let result = allProducts;
    if (activeCategory !== 'Tất cả') {
      result = result.filter((p) => {
        let catName = '';
        if (typeof p.category === 'object' && p.category !== null) {
          const cat = p.category as { id: string; name: string };
          catName = cat.name || cat.id;
        } else if (typeof p.category === 'string') catName = p.category;
        return catName === activeCategory;
      });
    }
    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase();
      const lowerNoSign = removeVietnameseTones(lower);
      result = result.filter((p) => {
        const name = p.name.toLowerCase();
        const nameNoSign = removeVietnameseTones(name);
        return name.includes(lower) || nameNoSign.includes(lowerNoSign);
      });
    }
    setFilteredProducts(result);
  }, [allProducts, activeCategory, searchTerm]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    try {
      const rawSession = localStorage.getItem(
        STORAGE_KEYS.ACTIVE_STORE_SESSION
      );
      if (!rawSession) throw new Error('Vui lòng quét cửa hàng trước');
      const { orderId } = JSON.parse(rawSession);
      if (!orderId) throw new Error('Không tìm thấy giỏ hàng');
      await storeHubService.addToCart(orderId, product.id, 1);
      toast.success('Đã thêm vào giỏ hàng');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Không thể thêm vào giỏ');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)]">
        <span>Đang tải sản phẩm...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-page)] text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] pb-20">
      <AppHeader
        title="Mua sắm"
        showBack={true}
        rightElement={
          <ShoppingBag
            size={24}
            className="cursor-pointer text-[var(--text-primary)]"
            onClick={() => navigate('/cart')}
          />
        }
      />
      <main className="flex-1 p-4">
        <div className="mb-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full rounded-[var(--radius-button)] bg-[var(--bg-muted)] py-3 pr-4 pl-11 text-[length:var(--text-md)] text-[var(--text-primary)] focus:outline-none"
            />
          </div>
        </div>
        <div className="no-scrollbar mb-4 flex items-center gap-2 overflow-x-auto pb-4">
          {getCategories(allProducts).map((cat) => (
            <Tag
              key={cat}
              tone={activeCategory === cat ? 'primary' : 'gray'}
              variant={activeCategory === cat ? 'solid' : 'light'}
              rounded="full"
              size="md"
              className="cursor-pointer !px-4 whitespace-nowrap"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </Tag>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetail={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-[var(--text-secondary)]">
            <Search size={48} className="mb-4 text-[var(--text-muted)]" />
            <p className="text-[length:var(--text-md)] font-[var(--font-medium)]">
              Không tìm thấy sản phẩm phù hợp
            </p>
          </div>
        )}
      </main>
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartSuccess={() => setSelectedProduct(null)}
      />
    </div>
  );
}
