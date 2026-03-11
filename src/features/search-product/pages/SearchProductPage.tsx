import React, { useState } from 'react';
import AppHeader from '@/shared/components/common/Header';
import { ShoppingBag, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { type Product } from '../types/search';
import Tag from '@/shared/components/common/Tag';
const allMockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Chip Chip',
    price: 20000,
    imageUrl: 'https://loremflickr.com/80/80/street-food',
    category: 'Snack',
    description: 'Đã quá chip chip ơi',
  },
  {
    id: 'p3',
    name: 'Pento',
    price: 32000,
    imageUrl: 'https://loremflickr.com/80/80/food',
    category: 'Snack',
    description: 'Cay quá Pemto ơi.',
  },
  {
    id: 'p4',
    name: 'Pepsi',
    price: 12000,
    imageUrl: 'https://loremflickr.com/80/80/dessert',
    category: 'Nước giải khát',
    description: 'Giải khát cực đã.',
  },
  {
    id: 'p5',
    name: 'Bánh tráng trộn',
    price: 12000,
    imageUrl: 'https://loremflickr.com/80/80/cake',
    category: 'Bánh',
    description: 'Đã Quáaaa.',
  },
  {
    id: 'p6',
    name: 'Coca Cola 330ml',
    price: 12000,
    imageUrl: 'https://loremflickr.com/80/80/drink',
    category: 'Nước giải khát',
    description: 'Giải khát cực đã.',
  },
  {
    id: 'p2',
    name: 'Snack Lays Original 52g',
    price: 15000,
    imageUrl: 'https://loremflickr.com/80/80/street-food',
    category: 'Snack',
    description: 'Khoai tây chiên giòn rụm.',
  },
];
const categories = ['Tất cả', 'Nước giải khát', 'Snack', 'Sữa', 'Bánh'];
export default function SearchProductPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allMockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isCheckedIn = false;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allMockProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setActiveCategory('Tất cả');
  };
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    console.log('Thêm vào giỏ:', product.name);
  };
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] pb-20">
      <AppHeader
        title="Mua sắm"
        showBack={true}
        rightElement={
          <ShoppingBag size={24} className="text-[var(--text-primary)]" />
        }
      />
      <main className="flex-1 p-4">
        <form onSubmit={handleSearch} className="mb-4">
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
        </form>
        <div className="no-scrollbar mb-4 flex items-center gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <Tag
              key={cat}
              tone={activeCategory === cat ? 'red' : 'gray'}
              variant={activeCategory === cat ? 'solid' : 'light'}
              rounded="full"
              size="md"
              className="cursor-pointer !px-4 whitespace-nowrap"
              onClick={() => {
                setActiveCategory(cat);
                setSearchTerm('');
                setFilteredProducts(
                  cat === 'Tất cả'
                    ? allMockProducts
                    : allMockProducts.filter((p) => p.category === cat)
                );
              }}
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
        isCheckedIn={isCheckedIn}
      />
    </div>
  );
}
