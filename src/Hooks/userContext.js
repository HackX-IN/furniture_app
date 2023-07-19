import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://productserver-4mtw.onrender.com/api/v1/user/profile');
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

// Rest of the code...
