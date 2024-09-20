import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ sections, renderHeader, renderContent }) => {
  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (index) => {
    setActiveSections(prevActiveSections => 
      prevActiveSections.includes(index)
        ? prevActiveSections.filter(sectionIndex => sectionIndex !== index)
        : [...prevActiveSections, index]
    );
  };

  return (
    <View>
      {sections.map((section, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleSection(index)}>
            {renderHeader(section, index, activeSections.includes(index))}
          </TouchableOpacity>
          {activeSections.includes(index) && renderContent(section)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here if needed
});

export default Accordion;