import { createContext, useContext, useState, useEffect } from 'react';
import supabase from "../supabase-client.js"

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        async function getInitialSession() {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                console.log("Initial session:", data.session);
                setSession(data.session);
            }
            catch (error) {
                console.error("Error getting session:", error);
            }

        }
        getInitialSession();

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            console.log("Auth state changed:", session);
        });

    }, []);

    //Log In 
    const LoginUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });

            // Errors
            if (error) {
                console.error("Supabase sign-in error:", error.message);
                return { success: false, error: error.message };
            }

            // Success
            console.log("Sign-in successful:", data);
            return { success: true, data };
        }

        catch (error) {
            // Unexpected errors
            console.error("Unexpected error during sign-in:", error.message);
            return { success: false, error: 'An unexpected error occurred. Please try again.' };
        }
    }

    //Log Out
    const LogoutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            // Errors
            if (error) {
                console.error("Error signing out:", error.message);
                return { success: false, error: error.message };
            }

            // Success
            return { success: true };
        }
        catch (error) {
            // Unexpected errors
            console.error("Unexpected error during sign-out:", error.message);
            return { success: false, error: 'An unexpected error occurred. Please try again.' };
        }
    };

    return (
        <AuthContext.Provider value={{ session, LoginUser , LogoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
