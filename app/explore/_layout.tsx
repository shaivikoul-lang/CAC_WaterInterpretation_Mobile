import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';

const TINT = '#0369a1';

export const unstable_settings = {
  initialRouteName: 'index',
};

/**
 * Native tabs for browse mode — Liquid Glass on supported iOS / Expo Go builds.
 * Flattened under /explore (not nested Slot + (tabs)), which avoids the blank screen.
 * "Guide" tab returns to the WaterLens guided home.
 */
export default function ExploreLayout() {
  const tintColor =
    Platform.OS === 'ios'
      ? DynamicColorIOS({ light: TINT, dark: '#38bdf8' })
      : TINT;

  return (
    <NativeTabs
      tintColor={tintColor}
      minimizeBehavior="onScrollDown"
      blurEffect="systemChromeMaterial"
      backgroundColor={Platform.OS === 'ios' ? null : undefined}
      labelStyle={{
        fontSize: 11,
        fontWeight: '600',
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Snapshot</Label>
        <Icon
          sf={{ default: 'drop', selected: 'drop.fill' }}
          androidSrc={<VectorIcon family={Ionicons} name="water-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="contaminants">
        <Label>Measures</Label>
        <Icon
          sf={{ default: 'list.bullet', selected: 'list.bullet' }}
          androidSrc={<VectorIcon family={Ionicons} name="list-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trends">
        <Label>Trends</Label>
        <Icon
          sf={{ default: 'chart.line.uptrend.xyaxis', selected: 'chart.line.uptrend.xyaxis' }}
          androidSrc={<VectorIcon family={Ionicons} name="trending-up-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="learn">
        <Label>Learn</Label>
        <Icon
          sf={{ default: 'book', selected: 'book.fill' }}
          androidSrc={<VectorIcon family={Ionicons} name="book-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="about" hidden={Platform.OS === 'android'}>
        <Label>About</Label>
        <Icon
          sf={{ default: 'info.circle', selected: 'info.circle.fill' }}
          androidSrc={<VectorIcon family={Ionicons} name="information-circle-outline" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="guide">
        <Label>Guide</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={<VectorIcon family={Ionicons} name="home-outline" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
