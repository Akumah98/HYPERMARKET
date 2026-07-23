import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationTabOptions } from '../../hooks/useNavigationTabOptions';

export default function VendorLayout() {
  const tabOptions = useNavigationTabOptions();

  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="warehouse"
        options={{
          title: 'Warehouse',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cube' : 'cube-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-product"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="edit-product/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
