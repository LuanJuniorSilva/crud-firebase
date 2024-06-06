import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const TabBarIcon = ({name}: {name: string}) => {
  let imgSource = null;
  let badgeCount = 0;

  switch (name) {
    case 'Firestore':
      imgSource = require('../../assets/firestore.png');
      badgeCount = 0;
      break;
    case 'RealtimeDatabase':
      imgSource = require('../../assets/realtimedatabase.png');
      badgeCount = 0;
      break;
    case 'ScreenConfig':
      imgSource = require('../../assets/config.png');
      badgeCount = 0;
      break;
  }
  return (
    <View>
      <Image source={imgSource} style={styles.icon} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#ff0000',
    width: 15,
    height: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
  },
});

export default TabBarIcon;
