import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Icon  from '@expo/vector-icons/Ionicons';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import SearchScreen from '../Screens/SearchScreen';
import { Colors } from '../Assets/Colors';
import Cart from '../Screens/Cart';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    const ScreenOptions={
        tabBarShowLabel:false,
        tabBarHideOnKeyboard:true,
        headerShown:false,

        tabBarStyle:{
            position:"absolute",
            bottom:0,
            left:0,
            right:0,
            elevation:0,
            height:70,
            
        }
    }

  return (
    <Tab.Navigator
     
      ScreenOptions={ScreenOptions}
    >
      <Tab.Screen
      
        name="Home"
        component={HomeScreen}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name={focused?"home":"home-outline"} size={focused?28:24} color={focused?Colors.black:Colors.gray}  />
          ),
          
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name="search-sharp" size={focused?28:24}  color={Colors.black}  />
          ),
          
        }}
      />
      <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        headerShown:false,
          tabBarIcon: ({ color, size,focused }) => (
            <Feather name="shopping-cart" size={focused?28:24} color={focused?Colors.black:Colors.gray} />
          ),
          
        }}
    />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown:false,
            tabBarIcon: ({ color, size,focused }) => (
              <Icon name={focused?"person":"person-outline"} size={focused?28:24}  color={focused?Colors.black:Colors.gray}  />
            ),
            
          }}
      />
    </Tab.Navigator>
  );
}