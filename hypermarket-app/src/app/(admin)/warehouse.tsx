import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { WarehouseDashboard } from '../../features/vendor/components/WarehouseDashboard';
import { scale, verticalScale } from '../../utils/responsive';

export default function AdminWarehouseScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Admin Warehouse & IoT</Text>
      </View>
      <WarehouseDashboard role="admin" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', height: verticalScale(56), paddingHorizontal: scale(16), borderBottomWidth: 1, gap: scale(16) },
  headerTitle: { fontSize: scale(18), fontWeight: '700' },
});
