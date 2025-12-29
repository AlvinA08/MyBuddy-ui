import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// --- Icons ---
const Icons = {
  Github: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <Path d="M9 18c-4.51 2-5-2-7-2"/>
    </Svg>
  ),
  Linkedin: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <Rect width="4" height="12" x="2" y="9"/>
      <Circle cx="4" cy="4" r="2"/>
    </Svg>
  ),
};

const teamMembers = [
  {
    id: 1,
    name: "Oluwatosin ALADESE",
    role: "Frontend Engineer",
    bio: "Passionate about building scalable web applications and solving complex problems.",
     image: require('../assets/images/tosin.jpeg'), 
  },
  {
    id: 2,
    name: "Alvin AKUWUDIKE",
    role: "Backend Engineer",
    bio: "Creating intuitive and beautiful user experiences that make digital products a joy to use.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 3,
    name: "Boluwatife ADEYEMI",
    role: "Backend Engineer",
    bio: "Bridging the gap between user needs and technical feasibility to deliver value.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 4,
    name: "Motunrayo",
    role: "UI/UX Specialist",
    bio: "Turning designs into pixel-perfect code with a focus on performance and accessibility.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400",
  },
  {
    id: 5,
    name: "Achazie Ugonna",
    role: "Frontend Engineer",
    bio: "Architecting robust APIs and database structures to power seamless applications.",
  },
  {
    id: 6,
    name: "Abiodun",
    role: "UI/UX Specialist",
    bio: "Ensuring the highest quality standards through rigorous testing and attention to detail.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400",
  }
];

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.subtitle}>Meet the team behind MyBuddy</Text>
        </View>

        {/* Team Grid */}
        <View style={styles.grid}>
          {teamMembers.map((member) => (
            <View key={member.id} style={styles.card}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
              <Text style={styles.memberBio}>{member.bio}</Text>
              
              <View style={styles.socialLinks}>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com')}>
                  <Icons.Github />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com')}>
                  <Icons.Linkedin />
                </TouchableOpacity>
              </View>
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
    marginBottom: 30,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 12,
  },
  memberBio: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
});