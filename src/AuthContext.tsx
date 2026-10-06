import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type {Session } from '@supabase/supabase-js';
import { supabase } from "./supabase";

interface AuthContextType { // Define what our context will hold
    session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // Create the actual context

export function AuthProvider({children}: {children: ReactNode}) {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        const {
            data: { subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
        }, []);

        return(
            <AuthContext.Provider value={{ session}}>
                {children}
            </AuthContext.Provider>
        );
    }

    export function useAuth() {
        const context = useContext(AuthContext);
        if (context === undefined) {
            throw new Error('userAuth must be used within an AuthProvider');
        }

        return context;
    }

