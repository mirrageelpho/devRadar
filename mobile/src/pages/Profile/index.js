import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({navigation}) {
  const github_username = navigation.getParam('github_username');
    return (
            <WebView source={{ uri: `https://github.com/${github_username}` }} />
    )
}

export default Profile