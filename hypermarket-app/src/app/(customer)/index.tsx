import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from '../../features/catalog/styles/catalogStyles';
import { SearchBar } from '../../features/catalog/components/SearchBar';
import { CategoryBar } from '../../features/catalog/components/CategoryBar';
import { ProductList } from '../../features/catalog/components/ProductList';
import { FilterModal } from '../../features/catalog/components/FilterModal';
import { useCategories } from '../../features/catalog/hooks/useCategories';
import { useProducts } from '../../features/catalog/hooks/useProducts';
import { useProductSearch } from '../../features/catalog/hooks/useProductSearch';
import { Product } from '../../features/catalog/services/catalogService';
import { useCartStore } from '../../store/cartStore';

export default function HomeScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [inStock, setInStock] = useState<boolean>(false);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const { searchQuery, setSearchQuery, debouncedQuery } = useProductSearch();
  const { categories, loading: categoriesLoading } = useCategories();
  const addToCart = useCartStore((state) => state.addToCart);

  const { products, loading: productsLoading, loadingMore, loadMore } = useProducts({
    categories: selectedCats,
    search: debouncedQuery || undefined,
    minPrice,
    maxPrice,
    inStock: inStock || undefined,
    rating,
    badges: selectedBadges,
  });

  const handleSelectCat = (id: string | null) => setSelectedCats(id ? [id] : []);
  const handleProductPress = (id: string) => router.push(`/product/${id}`);
  const handleAddToCart = async (p: Product) => {
    try { await addToCart(p._id, 1); } catch (e) { console.error('Cart error:', e); }
  };

  const currentCatId = selectedCats.length === 1 ? selectedCats[0] : null;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} onFilterPress={() => setFilterVisible(true)} />
      <CategoryBar categories={categories} selectedCategoryId={currentCatId} onSelectCategory={handleSelectCat} />
      <ProductList products={products} loading={productsLoading || categoriesLoading} loadingMore={loadingMore} onLoadMore={loadMore} onProductPress={handleProductPress} onAddToCart={handleAddToCart} />
      <FilterModal
        visible={filterVisible}
        categories={categories}
        onClose={() => setFilterVisible(false)}
        initialMinPrice={minPrice}
        initialMaxPrice={maxPrice}
        initialCategories={selectedCats}
        initialInStockOnly={inStock}
        initialRating={rating}
        initialBadges={selectedBadges}
        onApplyFilters={(f) => {
          setMinPrice(f.minPrice); setMaxPrice(f.maxPrice); setSelectedCats(f.categories || []);
          setInStock(!!f.inStockOnly); setRating(f.rating); setSelectedBadges(f.badges || []);
        }}
      />
    </SafeAreaView>
  );
}
