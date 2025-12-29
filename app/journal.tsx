import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path, Rect } from 'react-native-svg';
import { supabase } from '@/libs/supabase';

// --- Icons ---
const Icons = {
  Pen: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </Svg>
  ),
  BookOpen: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </Svg>
  ),
  Calendar: () => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <Path d="M16 2v4M8 2v4M3 10h18"/>
    </Svg>
  )
};

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  content: string;
}

const STORAGE_KEY = "@journal_entries";

export default function JournalPage() {
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

const loadEntries = async () => {
  try {
    const userId = await AsyncStorage.getItem("USER_ID");
    if (!userId) return;

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    setEntries(data);
  } catch (err) {
    console.log("Error loading entries:", err);
    Alert.alert("Error", "Failed to load entries");
  }
};


const saveEntries = async (newEntry: any) => {
  try {
    const userId = await AsyncStorage.getItem("USER_ID");
    if (!userId) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("journal_entries")
      .insert([{ ...newEntry, user_id: userId }])
      .select();

    if (error) throw error;

    setEntries([data[0], ...entries]); // update UI list
  } catch (err) {
    console.log("Error saving entry:", err);
    Alert.alert("Error", "Failed to save entry");
  }
};


const handleSave = async () => {
  if (!entryText.trim()) return;

  const now = new Date();
  const newEntry = {
    date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    content: entryText
  };

  await saveEntries(newEntry);
  setEntryText("");
  Alert.alert("Success", "Journal entry saved!");
};


  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Journal</Text>
          <Text style={styles.subtitle}>Record your thoughts and reflections</Text>
        </View>

        {/* Input Card */}
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Icons.Pen />
            <Text style={styles.inputTitle}>How was today? Put it down in words.</Text>
          </View>
          <Text style={styles.inputSubtitle}>Express your thoughts, feelings, and experiences</Text>
          
          <TextInput
            value={entryText}
            onChangeText={setEntryText}
            placeholder="Write about your day..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.textArea}
          />

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Journal Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Entries List */}
        <View style={styles.entriesCard}>
          <View style={styles.entriesHeader}>
            <View style={styles.entriesHeaderTop}>
              <Icons.BookOpen />
              <Text style={styles.entriesTitle}>Previous Entries</Text>
            </View>
            <Text style={styles.entriesSubtitle}>Your journal history</Text>
          </View>

          {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No entries yet. Write your first note above!</Text>
            </View>
          ) : (
            <View style={styles.entriesList}>
              {entries.map(entry => (
                <View key={entry.id} style={styles.entryItem}>
                  <View style={styles.entryMeta}>
                    <Icons.Calendar />
                    <Text style={styles.entryDate}>{entry.date}</Text>
                    <Text style={styles.entryDot}>•</Text>
                    <Text style={styles.entryTime}>{entry.time}</Text>
                  </View>
                  <Text style={styles.entryContent}>{entry.content}</Text>
                </View>
              ))}
            </View>
          )}
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
    maxWidth: 900,
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
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  inputSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    paddingLeft: 32,
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    height: 150,
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  entriesCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  entriesHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  entriesHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  entriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  entriesSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    paddingLeft: 32,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  entriesList: {
    
  },
  entryItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  entryDot: {
    fontSize: 12,
    color: '#6B7280',
  },
  entryTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  entryContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
});