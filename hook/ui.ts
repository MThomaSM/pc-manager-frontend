import { useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import { RootState } from "@/store";

export const useScrollTo = (page: string) => {

  const uiState = useSelector((state: RootState) => state.ui);
  const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if(uiState.page !== page) return;
      if(!ref.current) return;
      setTimeout(() => {
        const rect = ref.current!.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 72,
          behavior: "smooth"
        });
      }, 0);
    }, [uiState.page, page]);

  return ref;
};