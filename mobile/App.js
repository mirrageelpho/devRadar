import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

//routes
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40e7" />
      <Routes />
    </>
  );
}
