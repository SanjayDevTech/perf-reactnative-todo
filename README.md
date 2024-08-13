# Todo React Native App

I have created the same Todo app in different frameworks.
This is one of them.

## All frameworks github links:
- [Android Compose](https://github.com/SanjayDevTech/perf-compose-todo)
- [Flutter](https://github.com/SanjayDevTech/perf-flutter-todo)
- [React Native](https://github.com/SanjayDevTech/perf-reactnative-todo)

## Features
- Material You theming
- Dynamic theme for Android 12+
- Sqlite local storage

## Libraries used:
- WatermelonDB
- Expo router
- React native paper

## Setup in your local:

### Installation
- Install Bun js https://bun.sh/
- Do `bun install` inside the project root

### Run locally
- Do `bun run android` or `bun run ios`.

### Build
- Building apk or aab cannot be done in local in Windows.
- Create a project in expo.dev and install eas by `npm install -g eas-cli`.
- Login to expo account from eas by `eas login`.
- Link local project to eas `eas build:configure`.
- Copy the slug and id from expo.dev and paste it to `expo.slug` and `expo.extra.eas.projectId` properties in `app.json` file.
- Run `eas build --platform android` or `eas build --platform ios`.

https://github.com/SanjayDevTech/perf-reactnative-todo/assets/49263351/d08af1cc-0756-4c42-8c41-a98922f8ee4b
