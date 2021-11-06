import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export function SkillCard({index, skill}) {
  return (
    <TouchableOpacity
      style={[styles.buttonSkill, index % 2 === 0 && styles.alter]}
      opacity={0.7}>
      <Text style={styles.textSkill}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#363636',
    marginBottom: 12,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  alter: {
    backgroundColor: '#1C1C1C',
  },
  textSkill: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
