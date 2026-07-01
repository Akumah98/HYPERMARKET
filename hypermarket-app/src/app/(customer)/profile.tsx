import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { AppButton } from '../../components/AppButton';
import { getStyles } from '../../features/profile/styles/profileStyles';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { ProfileHeader } from '../../features/profile/components/ProfileHeader';
import { InfoSection } from '../../features/profile/components/InfoSection';
import { EditProfileModal } from '../../features/profile/components/EditProfileModal';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const { user, modalVisible, setModalVisible, handleSaveProfile } = useProfile();
  const logout = useAuthStore((state) => state.logout);

  if (!user) return null;

  const personalRows = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone || 'Not set' },
    { label: 'Role', value: user.role.toUpperCase() },
  ];

  const addressRows = [
    { label: 'Street', value: user.address?.street || 'Not set' },
    { label: 'City', value: user.address?.city || 'Not set' },
    { label: 'Region', value: user.address?.region || 'Not set' },
  ];

  const billingRows = [
    { label: 'Preferred Method', value: user.billing?.paymentMethod === 'mtn_momo' ? 'MTN MoMo' : user.billing?.paymentMethod === 'orange_money' ? 'Orange Money' : 'Not set' },
    { label: 'Payer Phone', value: user.billing?.phone || 'Not set' },
  ];

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ProfileHeader name={user.name} email={user.email} />
        <InfoSection title="Personal Information" rows={personalRows} onEditPress={() => setModalVisible(true)} />
        <InfoSection title="Delivery Address" rows={addressRows} onEditPress={() => setModalVisible(true)} />
        <InfoSection title="Billing Information" rows={billingRows} onEditPress={() => setModalVisible(true)} />
        <AppButton title="Logout" onPress={handleLogout} style={styles.logoutBtn} textStyle={{ color: '#FFFFFF' }} />
      </ScrollView>
      {modalVisible && (
        <EditProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} user={user} onSave={handleSaveProfile} />
      )}
    </SafeAreaView>
  );
}
