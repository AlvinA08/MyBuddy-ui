import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

// --- Icons ---
const Icons = {
  Activity: ({ color = "white" }: { color?: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </Svg>
  ),
  Menu: ({ color = "#6B7280" }: { color?: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Line x1="3" y1="12" x2="21" y2="12"/>
      <Line x1="3" y1="6" x2="21" y2="6"/>
      <Line x1="3" y1="18" x2="21" y2="18"/>
    </Svg>
  ),
  X: ({ color = "#6B7280" }: { color?: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18"/>
      <Line x1="6" y1="6" x2="18" y2="18"/>
    </Svg>
  ),
  Home: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <Polyline points="9 22 9 12 15 12 15 22"/>
    </Svg>
  ),
  Tasks: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="9 11 12 14 22 4"/>
      <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </Svg>
  ),
  Journal: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </Svg>
  ),
  Heart: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </Svg>
  ),
  User: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <Circle cx="12" cy="7" r="4"/>
    </Svg>
  ),
  Info: ({ color = "#6B7280", strokeWidth = 2 }: { color?: string; strokeWidth?: number }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10"/>
      <Line x1="12" y1="16" x2="12" y2="12"/>
      <Line x1="12" y1="8" x2="12.01" y2="8"/>
    </Svg>
  ),
};

interface NavItemProps {
  icon: React.ComponentType<{ color?: string; strokeWidth?: number }>;
  label: string;
  href: string;
  isActive: boolean;
  onPress: () => void;
  collapsed: boolean;
}

const NavItem = ({ icon: Icon, label, isActive, onPress, collapsed }: NavItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.navItem, isActive && styles.navItemActive, collapsed && styles.navItemCollapsed]}
    >
      <Icon 
        color={isActive ? "#3B82F6" : "#6B7280"} 
        strokeWidth={isActive ? 2.5 : 2} 
      />
      {!collapsed && (
        <Text style={[styles.navText, isActive && styles.navTextActive]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Icons.Home, label: 'Home', href: '/home' },
    { icon: Icons.Tasks, label: 'Tasks', href: '/todo' },
    { icon: Icons.Journal, label: 'Journal', href: '/journal' },
    { icon: Icons.Heart, label: 'Affirmations', href: '/affirmations' },
    { icon: Icons.Info, label: 'About Us', href: '/about' },
    { icon: Icons.User, label: 'Account', href: '/account' },
  ];

  return (
    <View style={[styles.container, collapsed && styles.containerCollapsed]}>
      {/* Header */}
      <View style={[styles.header, collapsed && styles.headerCollapsed]}>
        {!collapsed ? (
          <>
            <View style={styles.logoContainer}>
              <Icons.Activity color="white" />
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoTitle}>MyBuddy</Text>
              <Text style={styles.logoSubtitle}>Health & Wellness</Text>
            </View>
          </>
        ) : (
          <View style={styles.logoContainer}>
            <Icons.Activity color="white" />
          </View>
        )}
        
        {/* Toggle Button */}
        <TouchableOpacity 
          onPress={() => setCollapsed(!collapsed)}
          style={styles.toggleButton}
        >
          {collapsed ? <Icons.Menu /> : <Icons.X />}
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <ScrollView style={styles.nav} showsVerticalScrollIndicator={false}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isActive}
              collapsed={collapsed}
              onPress={() => router.push(item.href as any)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 256,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
    height: '100%',
  },
  containerCollapsed: {
    width: 80,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerCollapsed: {
    flexDirection: 'column',
    gap: 12,
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoTextContainer: {
    flex: 1,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 20,
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  toggleButton: {
    padding: 4,
  },
  nav: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  navItemActive: {
    backgroundColor: '#EFF6FF',
  },
  navText: {
    fontSize: 15,
    color: '#6B7280',
  },
  navTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});