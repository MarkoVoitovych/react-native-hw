import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import common from '../../components/common';

const { MainContainer } = common;
const Tabs = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <MainContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'CreatePosts') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'alarm' : 'alarm';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'blue',
        })}
      >
        <Tabs.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          // options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </MainContainer>
  );
};
