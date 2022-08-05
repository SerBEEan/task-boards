import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function useNavigateWithSearchParams() {
    const routerNavigate = useNavigate();
    const [params] = useSearchParams();

    const navigate = useCallback(({ to, options, withoutSearchParams }) => {
        if (withoutSearchParams) {
            routerNavigate(to, options);
        } else {
            const paramsString = params.toString();
            routerNavigate(paramsString === '' ? to : `${to}?${paramsString}`, options);
        }
    }, [routerNavigate, params]);

    return navigate;
}
