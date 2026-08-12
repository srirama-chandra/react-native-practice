import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface AuthContextValue {
    session: Session | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}:PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setSession(data.session)
            setLoading(false);
        })

        const {data} = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setLoading(false);
        })

        return () => data.subscription.unsubscribe();
    }, [])

    async function signOut() {
       const {error} =  await supabase.auth.signOut();
       if(error) throw new Error
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                isLoading,
                isLoggedIn: session != null,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error('useAuth must be used inside <AuthProvider>')
    }
    return value;
}