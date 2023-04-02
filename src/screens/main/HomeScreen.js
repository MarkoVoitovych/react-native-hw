import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import common from '../../components/common';
import colors from '../../assets/colors';

const { MainContainer } = common;
const Tabs = createBottomTabNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <MainContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            paddingHorizontal: 80,
            paddingTop: 10,
            paddingBottom: 20,
          },
          tabBarActiveBackgroundColor: colors.ACCENT_COLOR,
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarActiveTintColor: colors.PRIMARY_BG,
          tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
          tabBarItemStyle: {
            height: 40,
            width: 70,
            borderRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="grid" size={24} color={color} />
            ),
            title: 'Posts',
            headerTitleAlign: 'center',
            headerRight: ({ navigation }) => (
              <TouchableOpacity style={{ paddingRight: 16 }}>
                <Feather
                  name="log-out"
                  size={24}
                  color={colors.SECONDARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="plus" size={24} color={color} />
            ),
            title: 'Create publication',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}
              >
                <Feather
                  name="arrow-left"
                  size={24}
                  color={colors.SECONDARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs.Navigator>
    </MainContainer>
  );
};
