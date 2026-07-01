import { useState, useCallback, useEffect } from 'react';
import { adminService, AdminUser } from '../services/adminService';

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchUsers = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const activeRole = roleFilter === 'all' ? undefined : roleFilter;
      const data = await adminService.fetchAdminUsers(1, activeRole);
      setUsers(data.users);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load user directory');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    users: filteredUsers,
    loading,
    refreshing,
    error,
    roleFilter,
    setRoleFilter,
    searchQuery,
    setSearchQuery,
    refresh: () => fetchUsers(true),
  };
}
