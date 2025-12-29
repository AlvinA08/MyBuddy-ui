import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect } from 'react-native-svg';
import { supabase } from "@/libs/supabase";


// --- Icons ---
const Icons = {
  Activity: () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    // Query database for user with matching email + password (plain text match)
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single(); // ensures only 1 row is returned

    if (error) throw error;

    if (!data) {
      throw new Error("Invalid email or password");
    }

    // If login is successful
    Alert.alert("Success", `Welcome ${data.fullname}!`);

    // Navigate to Home screen
    router.replace("/home");

  } catch (err: any) {
    Alert.alert("Login Failed", err.message || "Invalid credentials");
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

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue with MyBuddy</Text>

        {/* Email */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Icons.Mail />
              <TextInput 
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Icons.Lock />
              <TextInput 
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" style={styles.link}>Sign Up</Link>
          </View>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40,
    maxWidth: 450,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 64,
    height: 64,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#374151',
  },
  extras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  rememberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  link: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
});