import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// --- Icons ---
const Sparkles = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </Svg>
);

// --- Data ---
const affirmationsList = [
  { id: 1, text: "I am worthy of love, happiness, and success." },
  { id: 2, text: "Every day, I am becoming a better version of myself." },
  { id: 3, text: "I choose to focus on what I can control and let go of what I cannot." },
  { id: 4, text: "My thoughts are powerful, and I choose positive ones." },
  { id: 5, text: "I am grateful for all the blessings in my life." },
  { id: 6, text: "I trust in my ability to overcome any challenge." },
  { id: 7, text: "I am deserving of rest and self-care." },
  { id: 8, text: "My mental health is just as important as my physical health." },
  { id: 9, text: "I am proud of myself for how far I've come." },
  { id: 10, text: "Today, I choose joy and peace." },
  { id: 11, text: "I am enough, exactly as I am." },
  { id: 12, text: "I attract positive energy and good things into my life." },
  { id: 13, text: "I am resilient, strong, and brave." },
  { id: 14, text: "My feelings are valid, and I accept them." },
  { id: 15, text: "I release all negative thoughts and embrace positivity." }
];

export default function AffirmationsPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Affirmations</Text>
          <Text style={styles.subtitle}>Daily positive affirmations</Text>
        </View>

        {/* Hero Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Sparkles />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Daily Affirmations</Text>
            <Text style={styles.bannerSubtitle}>Read these positive affirmations to start your day with intention and positivity</Text>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.grid}>
          {affirmationsList.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.id}</Text>
              </View>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  banner: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bannerIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#F3F4F6',
    borderRightColor: '#F3F4F6',
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  cardText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    paddingTop: 4,
  },
});