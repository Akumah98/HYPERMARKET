import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useWarehouseData, BatchItem } from '../hooks/useWarehouseData';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

interface WarehouseDashboardProps {
  role?: 'vendor' | 'admin';
}

export function WarehouseDashboard({ role = 'vendor' }: WarehouseDashboardProps) {
  const theme = useTheme();
  const { batches, sensors, loading } = useWarehouseData(role);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const getDaysLeft = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>IoT Sensor Readings</Text>
      <View style={styles.sensorRow}>
        <View style={[styles.card, { backgroundColor: '#f0f0f0', borderColor: theme.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="snow" size={22} color="#00a8ff" />
            <Text style={styles.cardTitle}>Cold Storage B</Text>
          </View>
          <Text style={styles.metric}>{sensors.cold.temp}°C</Text>
          <Text style={styles.subtext}>Humidity: {sensors.cold.humidity}%</Text>
          <Text style={[styles.status, { color: sensors.cold.status === 'OK' ? '#2ecc71' : '#e74c3c' }]}>
            ● {sensors.cold.status}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#f0f0f0', borderColor: theme.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="thermometer-outline" size={22} color="#d35400" />
            <Text style={styles.cardTitle}>General Zone A</Text>
          </View>
          <Text style={styles.metric}>{sensors.general.temp}°C</Text>
          <Text style={styles.subtext}>Humidity: {sensors.general.humidity}%</Text>
          <Text style={[styles.status, { color: '#2ecc71' }]}>● OK</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: theme.text, marginTop: verticalScale(20) }]}>
        FEFO Batch Dispatch Queue
      </Text>
      {batches.length === 0 ? (
        <Text style={[styles.noData, { color: theme.textMuted }]}>No batches recorded.</Text>
      ) : (
        batches.map((batch: BatchItem, idx) => {
          const daysLeft = getDaysLeft(batch.expiryDate);
          return (
            <View key={idx} style={[styles.batchCard, { backgroundColor: '#f0f0f0', borderColor: theme.border }]}>
              <View style={styles.batchInfo}>
                <Text style={styles.batchNumber}>{batch.batchNumber}</Text>
                <Text style={styles.productName}>{batch.productName}</Text>
                <Text style={styles.zoneText}>Zone: {batch.warehouseZone}</Text>
              </View>
              <View style={styles.batchExpiry}>
                <Text style={[styles.daysText, { color: daysLeft <= 12 ? '#e74c3c' : '#7f8c8d' }]}>
                  {daysLeft} days left
                </Text>
                <Text style={styles.qtyText}>Qty: {batch.quantity}</Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: scale(16) },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: moderateScale(16), fontWeight: '700', marginBottom: verticalScale(12) },
  sensorRow: { flexDirection: 'row', justifyContent: 'space-between', gap: scale(12) },
  card: { flex: 1, padding: scale(14), borderRadius: moderateScale(12), borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: scale(6), marginBottom: verticalScale(6) },
  cardTitle: { fontSize: moderateScale(13), fontWeight: '600', color: '#333' },
  metric: { fontSize: moderateScale(22), fontWeight: '800', color: '#111', marginVertical: verticalScale(4) },
  subtext: { fontSize: moderateScale(11), color: '#555' },
  status: { fontSize: moderateScale(12), fontWeight: '700', marginTop: verticalScale(6) },
  noData: { textAlign: 'center', marginVertical: verticalScale(20), fontSize: moderateScale(14) },
  batchCard: { flexDirection: 'row', justifyContent: 'space-between', padding: scale(12), borderRadius: moderateScale(10), borderWidth: 1, marginBottom: verticalScale(10) },
  batchInfo: { gap: verticalScale(2) },
  batchNumber: { fontSize: moderateScale(12), fontWeight: '700', color: '#2c3e50' },
  productName: { fontSize: moderateScale(14), fontWeight: '600', color: '#000' },
  zoneText: { fontSize: moderateScale(11), color: '#444' },
  batchExpiry: { alignItems: 'flex-end', justifyContent: 'center', gap: verticalScale(4) },
  daysText: { fontSize: moderateScale(12), fontWeight: '700' },
  qtyText: { fontSize: moderateScale(12), fontWeight: '600', color: '#111' },
});
