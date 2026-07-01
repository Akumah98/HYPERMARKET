import React from 'react';
import { SafeAreaView, FlatList, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from '../../features/cart/styles/cartStyles';
import { useCart } from '../../features/cart/hooks/useCart';
import { CartItem } from '../../features/cart/components/CartItem';
import { CartSummary } from '../../features/cart/components/CartSummary';
import { EmptyCart } from '../../features/cart/components/EmptyCart';

export default function CartScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const {
    items,
    subtotal,
    deliveryFee,
    total,
    loading,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const handleCheckout = () => {
    router.push('/(customer)/checkout');
  };

  const handleGoShopping = () => {
    router.replace('/(customer)');
  };

  if (loading && items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (items.length === 0) {
    return <EmptyCart onShopPress={handleGoShopping} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            disabled={loading}
          />
        )}
      />

      <CartSummary
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        onCheckout={handleCheckout}
        disabled={loading}
      />
    </SafeAreaView>
  );
}
