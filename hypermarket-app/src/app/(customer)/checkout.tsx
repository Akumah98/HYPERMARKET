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
import { OrderSummary } from '../../features/checkout/components/OrderSummary';
import { checkoutService } from '../../features/checkout/services/checkoutService';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { eventBus } from '../../utils/eventBus';
import { formatXAF } from '../../utils/formatCurrency';
import { AppButton } from '../../components/AppButton';

export default function CheckoutScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const { subtotal } = useCartStore();
  const { user, updateUser } = useAuthStore();
  const checkout = useCheckout();
  const payment = usePaymentStatus();
  const [payerPhone, setPayerPhone] = useState(user?.billing?.phone || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const deliveryFee = checkout.fulfillmentType === 'delivery' ? 1500 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handlePay = async () => {
    setPayError(null);
    if (!payerPhone || payerPhone.length < 9 || !payerPhone.startsWith('6')) {
      return setPayError('Please enter a valid Cameroon phone number starting with 6.');
    }
    const order = await checkout.placeOrder();
    if (!order) return;
    eventBus.emit('order.placed', order);
    try {
      setModalVisible(true);
      const transId = await checkoutService.initiatePayment(order._id, payerPhone);
      if (user) {
        updateUser({
          ...user,
          billing: { paymentMethod: checkout.paymentMethod, phone: payerPhone },
        });
      }
      payment.startPolling(transId);
    } catch (err: any) {
      setPayError(err.response?.data?.error || err.response?.data?.message || 'Payment initiation failed.');
      setModalVisible(false);
    }
  };

  if (payment.status === 'SUCCESSFUL' && checkout.placedOrder) {
    return <OrderConfirmation orderId={checkout.placedOrder._id} onHomePress={() => router.replace('/(customer)')} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={theme.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <DeliveryToggle value={checkout.fulfillmentType} onChange={checkout.setFulfillmentType} />
        <AddressForm
          fullName={checkout.fullName} onChangeFullName={checkout.setFullName}
          phone={checkout.shippingPhone} onChangePhone={checkout.setShippingPhone}
          street={checkout.street} onChangeStreet={checkout.setStreet}
          city={checkout.city} onChangeCity={checkout.setCity}
          region={checkout.region} onChangeRegion={checkout.setRegion}
          notes={checkout.notes} onChangeNotes={checkout.setNotes}
          isPickup={checkout.fulfillmentType === 'pickup'}
        />
        <MomoPaymentForm phone={payerPhone} onChangePhone={setPayerPhone} paymentMethod={checkout.paymentMethod} onChangePaymentMethod={checkout.setPaymentMethod} />
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        {(checkout.error || payError) && <Text style={styles.errorText}>{checkout.error || payError}</Text>}
        <AppButton title={`Pay ${formatXAF(totalAmount)}`} onPress={handlePay} loading={checkout.loading} />
      </ScrollView>
      <PaymentStatusModal visible={modalVisible} status={payment.status} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}
