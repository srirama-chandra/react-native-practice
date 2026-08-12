import { supabase } from '@/lib/supabase';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_TO = 'leetcodemobile://'

function getParamsFromUrl(url: string){
    const parsed = new URL(url);
    const code = parsed.searchParams.get('code');
    const hash = parsed.hash.startsWith('#') ? parsed.hash.slice(1) : parsed.hash;
    const hashParams = new URLSearchParams(hash);

    return {
        code,
        access_token: hashParams.get('access_token'),
        refresh_token: hashParams.get('refresh_token')
    }
}

export async function signInWithGoogle(){
    const { data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: REDIRECT_TO,
            skipBrowserRedirect: true,
            queryParams: { prompt: 'select_account'}
        }
    })

    if(error) throw error
    if(!data.url) throw new Error('No URL');

    const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_TO);
    if(result.type!=='success') {
        return {
            cancelled: true as const
        }
    }

    const params = getParamsFromUrl(result.url);

    if(params.code) {
        const { error } = await supabase.auth.exchangeCodeForSession(params.code);
        if(error) {
            throw error
        }
        return { cancelled: false as const }
    }

    if(params.access_token && params.refresh_token) {
        const { error } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token
        });

        if(error) throw error
        return { cancelled: false as const}
    }

    throw new Error('No code or tokens found in redirect URL')

}