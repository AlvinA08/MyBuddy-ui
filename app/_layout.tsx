import { Slot, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function Layout() {
  const pathname = usePathname();

  // List of routes where sidebar should NOT appear
  const noSidebarRoutes = ['/', '/signup'];

  // Check if current route matches any in array
  const hideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <View style={styles.container}>
      {/* Render Sidebar only when NOT on login or signup */}
      {!hideSidebar && <Sidebar />}

      <View style={styles.main}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
  },
  main: {
    flex: 1,
  },
});
