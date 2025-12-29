//Sign up
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { supabase } from '../libs/supabase';
import AsyncStorage from "@react-native-async-storage/async-storage";
// --- Icons ---
const Icons = {
  Activity: () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </Svg>
  ),
  User: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <Circle cx="12" cy="7" r="4"/>
    </Svg>
  ),
  Mail: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect width="20" height="16" x="2" y="4" rx="2"/>
      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </Svg>
  ),
  Lock: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <Path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </Svg>
  ),
};

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Updated Signup Function ---
const handleSignUp = async () => {
  if (!email || !password || !fullName) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    // Insert user directly into Supabase table
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          fullname: fullName,
          email: email,
          password: password, // ⚠️ stored raw!
        },
      ])
      .select();

    if (error) throw error;

    console.log("Inserted user:", data);

    // ---- Save user ID in AsyncStorage ----
    const userId = data[0].id; 
    await AsyncStorage.setItem("USER_ID", userId.toString());
    console.log(userId)

    Alert.alert("Success", "Account created successfully!");
    router.replace("/home");

  } catch (err: any) {
    Alert.alert("Error", err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Icons.Activity />
          </View>
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join MyBuddy to track your wellness</Text>

        {/* Form */}
        <View style={styles.form}>
          
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icons.User />
              </View>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icons.Mail />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icons.Lock />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity 
            onPress={handleSignUp}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/" style={styles.link}>Sign In</Link>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

// --- Styles remain unchanged ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  contentContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 40, maxWidth: 450, width: '100%', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 30, elevation: 5, borderWidth: 1, borderColor: '#F3F4F6' },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 64, height: 64, backgroundColor: '#3B82F6', borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16 },
  iconContainer: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#374151' },
  button: { backgroundColor: '#3B82F6', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 8, shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  footerText: { fontSize: 14, color: '#6B7280' },
  link: { fontSize: 14, color: '#3B82F6', fontWeight: '600' },
});
