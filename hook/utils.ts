import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const useRedirectByAuthState = (href: string, forLoggedIn: boolean) => {
    const router = useRouter();
    const userState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if ((!forLoggedIn && userState.user) || (forLoggedIn && !userState.user)){
            router.push(href);
        }
    }, [forLoggedIn, router, userState.user, href]);
}

export function useRecaptchaToken(action: string, mutate: {}): string | undefined {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        if (!executeRecaptcha) {
            console.log('Execute reCAPTCHA not yet available');
            return;
        }
        executeRecaptcha(action).then(setToken).catch((e) => {
            console.error('reCAPTCHA error', e);
            toast.error('reCAPTCHA error');
        });
    }, [action, executeRecaptcha, mutate]);

    return token;
}

export default useRedirectByAuthState;