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
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            console.log("Auth state changed:", session);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription?.unsubscribe();
        };
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
            // Always clear local session first to ensure UI updates
            setSession(null);

            // Attempt to sign out from Supabase (without global scope to avoid 403)
            const { error } = await supabase.auth.signOut();

            // Handle specific auth session missing error - this is actually OK
            if (error && (error.message === 'Auth session missing!' || error.message.includes('session missing'))) {
                console.log("Auth session already cleared on server, local state updated");
                return { success: true };
            }

            // Handle 403 Forbidden errors - treat as successful logout
            if (error && error.message.includes('403') || error.status === 403) {
                console.log("403 error during logout, but local session cleared");
                return { success: true };
            }

            // Handle other errors
            if (error) {
                console.error("Error signing out:", error.message);
                // Local session is already cleared, so still consider it a success
                return { success: true, warning: error.message };
            }

            // Success
            console.log("Successfully signed out");
            return { success: true };
        }
        catch (error) {
            // Unexpected errors
            // Local session is already cleared, so still consider it a success
            return { success: true, warning: 'Logout completed locally' };
        }
    };

    return (
        <AuthContext.Provider value={{ session, LoginUser, LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
