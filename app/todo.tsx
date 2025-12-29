import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/libs/supabase';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

// --- Icons ---
const Icons = {
  Plus: () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Line x1="12" y1="5" x2="12" y2="19"/>
      <Line x1="5" y1="12" x2="19" y2="12"/>
    </Svg>
  ),
  Trash: () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="3 6 5 6 21 6"/>
      <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </Svg>
  ),
  Check: () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="20 6 9 17 4 12"/>
    </Svg>
  )
};

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = "@tasks";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

// Load tasks for the current user
const loadTasks = async () => {
  try {
    const userId = await AsyncStorage.getItem("USER_ID");
    if (!userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: false });

    if (error) throw error;
    setTasks(data || []);
  } catch (err) {
    console.log('Error loading tasks:', err);
    Alert.alert('Error', 'Failed to load tasks');
  }
};

// Add a new task for the current user
const handleAddTask = async () => {
  if (!newTask.trim()) return;

  try {
    const userId = await AsyncStorage.getItem("USER_ID");
    if (!userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTask, completed: false, user_id: userId }])
      .select();

    if (error) throw error;
    setTasks([data[0], ...tasks]);
    setNewTask('');
  } catch (err) {
    console.log('Error adding task:', err);
    Alert.alert('Error', 'Failed to add task');
  }
};

// Toggle task completion for the current user
const toggleTask = async (id: string) => {
  try {
    const task = tasks.find(t => t.id === id);
    const userId = await AsyncStorage.getItem("USER_ID");
    if (!task) return;

    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', id)
      .eq('user_id', userId) // ensures only the owner can update
      .select();

    if (error) throw error;
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  } catch (err) {
    console.log('Error toggling task:', err);
    Alert.alert('Error', 'Failed to update task');
  }
};

// Delete a task for the current user
const deleteTask = async (id: string) => {
  const userId = await AsyncStorage.getItem("USER_ID");
  try {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // ensures only the owner can delete

    if (error) throw error;
    setTasks(tasks.filter(t => t.id !== id));
  } catch (err) {
    console.log('Error deleting task:', err);
    Alert.alert('Error', 'Failed to delete task');
  }
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.subtitle}>Manage your daily tasks</Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Add a new task..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
            <Icons.Plus />
          </TouchableOpacity>
        </View>

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet. Add your first task above!</Text>
          </View>
        ) : (
          <View style={styles.tasksList}>
            {tasks.map(task => (
              <View key={task.id} style={[styles.taskItem, task.completed && styles.taskItemCompleted]}>
                <View style={styles.taskContent}>
                  <TouchableOpacity 
                    onPress={() => toggleTask(task.id)}
                    style={[styles.checkbox, task.completed && styles.checkboxChecked]}
                  >
                    {task.completed && <Icons.Check />}
                  </TouchableOpacity>
                  <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                    {task.title}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
                  <Icons.Trash />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

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
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#374151',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyState: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskItemCompleted: {
    backgroundColor: '#F9FAFB',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  taskText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 8,
  },
});