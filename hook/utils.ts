import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const useRedirectByAuthState = (href: string, forLoggedIn: boolean) => {
    const router = useRouter();
    const userState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if ((!forLoggedIn && userState.user) || (forLoggedIn && !userState.user)) router.push(href);
        if(forLoggedIn) toast.info('You must be logged in to view this page.', { toastId: 'auth-toast' })
    }, [forLoggedIn, router, userState.user, href]);
}

export default useRedirectByAuthState;