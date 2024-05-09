import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useMemo } from 'react';
import { Slot, Stack } from 'expo-router';
import { Material3ThemeProvider } from '@/components/Material3ThemeProvider';
import Todo from '@/model/TodoEntity';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';
import { mySchema } from '@/model/schema';
import { Platform } from 'react-native';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  // (optional database name or file system path)
  dbName: 'app-database',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === 'ios', /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.error(error)
  }
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const database = useMemo(() => new Database({
    adapter,
    modelClasses: [Todo],
  }), []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <DatabaseProvider database={database}>
      <Material3ThemeProvider>
        <Slot />
      </Material3ThemeProvider>
    </DatabaseProvider>
  );
}
