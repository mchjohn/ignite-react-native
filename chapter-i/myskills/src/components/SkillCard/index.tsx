import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
  index: number;
  skill: string;
}

export function SkillCard({index, skill, ...rest}: SkillCardProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonSkill, index % 2 === 0 && styles.alter]}
      activeOpacity={0.7}
      {...rest}>
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
