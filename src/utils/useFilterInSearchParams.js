import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEnum } from '../utils/getEnum';

const FILTER_PARAM_NAME = 'filters';

export function useFilterInSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(getEnum(paramsToFilterArray(searchParams)));

    const changeFilter = useCallback(({ type, value }) => {
        const prepareFilters = { ...filters };
        if (value) {
            const newFilters = [...Object.keys(prepareFilters), type];
            setSearchParams({ [FILTER_PARAM_NAME]: newFilters.toString() });
        } else {
            delete prepareFilters[type];
            const newFilters = Object.keys(prepareFilters);
            if (newFilters.length === 0) {
                const prepareParams = new URLSearchParams(searchParams.toString());
                prepareParams.delete(FILTER_PARAM_NAME);
                setSearchParams(prepareParams);
            } else {
                setSearchParams({ [FILTER_PARAM_NAME]: newFilters.toString() });
            }
        }
    }, [filters, searchParams, setSearchParams]);

    useEffect(() => {
        setFilters((prev) => {
            const urlFilter = searchParams.get(FILTER_PARAM_NAME)?.split(',') ?? [];
            if (urlFilter.toString() === Object.keys(prev).toString()) {
                return prev;
            } else {
                return getEnum(urlFilter);
            }
        });
    }, [searchParams]);

    return [filters, changeFilter];
}

function paramsToFilterArray(searchParams) {
    return searchParams.get(FILTER_PARAM_NAME)?.split(',') ?? [];
};
