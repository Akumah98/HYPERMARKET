import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getStyles } from '../styles/filterModalStyles';
import { Category } from '../services/catalogService';
import { PriceFacet } from './facets/PriceFacet';
import { CategoryFacet } from './facets/CategoryFacet';
import { RatingFacet } from './facets/RatingFacet';
import { BadgeFacet } from './facets/BadgeFacet';
import { StockFacet } from './facets/StockFacet';

interface FilterModalProps {
  visible: boolean; categories: Category[]; onClose: () => void;
  initialMinPrice?: number; initialMaxPrice?: number; initialCategories?: string[];
  initialInStockOnly?: boolean; initialRating?: number; initialBadges?: string[];
  onApplyFilters: (filters: { minPrice?: number; maxPrice?: number; categories?: string[]; inStockOnly?: boolean; rating?: number; badges?: string[]; }) => void;
}

export const FilterModal = ({
  visible, categories, onClose, initialMinPrice, initialMaxPrice, initialCategories, initialInStockOnly, initialRating, initialBadges, onApplyFilters,
}: FilterModalProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [minPrice, setMinPrice] = useState(initialMinPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice?.toString() || '');
  const [selectedCats, setSelectedCats] = useState<string[]>(initialCategories || []);
  const [inStockOnly, setInStockOnly] = useState(initialInStockOnly || false);
  const [rating, setRating] = useState<number | undefined>(initialRating);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(initialBadges || []);

  useEffect(() => {
    if (visible) {
      setMinPrice(initialMinPrice?.toString() || ''); setMaxPrice(initialMaxPrice?.toString() || ''); setSelectedCats(initialCategories || []);
      setInStockOnly(initialInStockOnly || false); setRating(initialRating); setSelectedBadges(initialBadges || []);
    }
  }, [visible]);

  const toggleCat = (id: string) => setSelectedCats((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleBadge = (bg: string) => setSelectedBadges((p) => p.includes(bg) ? p.filter((x) => x !== bg) : [...p, bg]);

  const handleApply = () => {
    onApplyFilters({
      minPrice: minPrice ? parseFloat(minPrice) : undefined, maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      categories: selectedCats, inStockOnly, rating, badges: selectedBadges,
    });
    onClose();
  };

  const handleReset = () => {
    setMinPrice(''); setMaxPrice(''); setSelectedCats([]); setInStockOnly(false); setRating(undefined); setSelectedBadges([]);
    onApplyFilters({}); onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.title}>Filter Products</Text>
              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <PriceFacet theme={theme} styles={styles} minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
                <CategoryFacet categories={categories} selectedCategories={selectedCats} onToggleCategory={toggleCat} styles={styles} />
                <RatingFacet selectedRating={rating} onSelectRating={setRating} styles={styles} />
                <BadgeFacet selectedBadges={selectedBadges} onToggleBadge={toggleBadge} styles={styles} />
                <StockFacet inStockOnly={inStockOnly} onToggleStock={setInStockOnly} styles={styles} />
              </ScrollView>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleReset} style={styles.resetButton}><Text style={styles.resetText}>Reset</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleApply} style={styles.applyButton}><Text style={styles.applyText}>Apply Filters</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
