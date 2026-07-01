import React from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAdminUsers } from '../../features/admin/hooks/useAdminUsers';
import { UserCard } from '../../features/admin/components/UserList';
import { adminStyles as styles } from '../../features/admin/styles/adminStyles';
import { scale, verticalScale } from '../../utils/responsive';

const FILTERS = ['all', 'customer', 'vendor', 'admin'];

export default function AdminUsers() {
  const theme = useTheme();
  const { users, loading, refreshing, error, roleFilter, setRoleFilter, searchQuery, setSearchQuery, refresh } = useAdminUsers();

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text, marginBottom: 12 }}>Users Directory</Text>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name or email..."
        placeholderTextColor={theme.textMuted}
        style={{
          borderWidth: 1,
          borderRadius: scale(8),
          paddingHorizontal: scale(12),
          paddingVertical: verticalScale(10),
          color: theme.text,
          borderColor: theme.border,
          backgroundColor: theme.surface,
          marginBottom: 12,
        }}
      />

      <View style={{ height: 42, marginBottom: 12 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((role) => (
            <TouchableOpacity
              key={role}
              onPress={() => setRoleFilter(role)}
              style={[
                styles.filterBtn,
                { borderColor: theme.border, backgroundColor: roleFilter === role ? theme.primary : theme.surface },
              ]}
            >
              <Text style={[styles.filterText, { color: roleFilter === role ? '#FFFFFF' : theme.textMuted }]}>
                {role.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {error && <Text style={{ color: theme.error, marginBottom: 12 }}>{error}</Text>}

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primary]} />}
        renderItem={({ item }) => <UserCard user={item} />}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: theme.textMuted }}>No users found matching query</Text>
          </View>
        }
      />
    </View>
  );
}
