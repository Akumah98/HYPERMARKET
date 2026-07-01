import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from '../../features/checkout/styles/checkoutStyles';
import { useCheckout } from '../../features/checkout/hooks/useCheckout';
import { usePaymentStatus } from '../../features/checkout/hooks/usePaymentStatus';
import { DeliveryToggle } from '../../features/checkout/components/DeliveryToggle';
import { AddressForm } from '../../features/checkout/components/AddressForm';
import { MomoPaymentForm } from '../../features/checkout/components/MomoPaymentForm';
import { PaymentStatusModal } from '../../features/checkout/components/PaymentStatusModal';
import { OrderConfirmation } from '../../features/checkout/components/OrderConfirmation';
import { checkoutService } from '../../features/checkout/services/checkoutService';
import { useCartStore } from '../../store/cartStore';
import { formatXAF } from '../../utils/formatCurrency';
import { AppButton } from '../../components/AppButton';
import { scale } from '../../utils/responsive';

export default function CheckoutScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const { subtotal } = useCartStore();

  const checkout = useCheckout();
  const payment = usePaymentStatus();

  const [payerPhone, setPayerPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const deliveryFee = checkout.fulfillmentType === 'delivery' ? 1500 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handlePay = async () => {
    setPayError(null);

    if (!payerPhone || payerPhone.length < 9 || !payerPhone.startsWith('6')) {
      setPayError('Please enter a valid Cameroon phone number starting with 6.');
      return;
    }

    const order = await checkout.placeOrder();
    if (!order) return;

    try {
      setModalVisible(true);
      const transId = await checkoutService.initiatePayment(order._id, payerPhone);
      payment.startPolling(transId);
    } catch (err: any) {
      setPayError(err.response?.data?.error || err.response?.data?.message || 'Payment initiation failed.');
      setModalVisible(false);
    }
  };

  if (payment.status === 'SUCCESSFUL' && checkout.placedOrder) {
    return (
      <OrderConfirmation
        orderId={checkout.placedOrder._id}
        onHomePress={() => router.replace('/(customer)')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyles.container(theme)}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={headerStyles.title(theme)}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DeliveryToggle
          value={checkout.fulfillmentType}
          onChange={checkout.setFulfillmentType}
        />

        {checkout.fulfillmentType === 'delivery' && (
          <AddressForm
            fullName={checkout.fullName}
            onChangeFullName={checkout.setFullName}
            phone={checkout.shippingPhone}
            onChangePhone={checkout.setShippingPhone}
            street={checkout.street}
            onChangeStreet={checkout.setStreet}
            city={checkout.city}
            onChangeCity={checkout.setCity}
            region={checkout.region}
            onChangeRegion={checkout.setRegion}
            notes={checkout.notes}
            onChangeNotes={checkout.setNotes}
          />
        )}

        <MomoPaymentForm
          phone={payerPhone}
          onChangePhone={setPayerPhone}
          paymentMethod={checkout.paymentMethod}
          onChangePaymentMethod={checkout.setPaymentMethod}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Items Subtotal</Text>
            <Text style={styles.priceVal}>{formatXAF(subtotal)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceVal}>{formatXAF(deliveryFee)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>{formatXAF(totalAmount)}</Text>
          </View>
        </View>

        {(checkout.error || payError) && (
          <Text style={styles.errorText}>{checkout.error || payError}</Text>
        )}

        <AppButton
          title={`Pay ${formatXAF(totalAmount)}`}
          onPress={handlePay}
          loading={checkout.loading}
        />
      </ScrollView>

      <PaymentStatusModal
        visible={modalVisible}
        status={payment.status}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

// Header helper styles (keeps inline styles out of JSX)
const headerStyles = {
  container: (theme: any) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    height: 50,
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    gap: scale(16),
  }),
  title: (theme: any) => ({
    fontSize: scale(18),
    fontWeight: '700' as const,
    color: theme.text,
  }),
};
