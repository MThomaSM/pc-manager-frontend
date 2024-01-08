import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const useRedirectByAuthState = (href: string, forLoggedIn: boolean) => {
    const router = useRouter();
    const userState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if ((!forLoggedIn && userState.user) || (forLoggedIn && !userState.user)){
            router.push(href);
        }
    }, [forLoggedIn, router, userState.user, href]);
}

export default useRedirectByAuthState;