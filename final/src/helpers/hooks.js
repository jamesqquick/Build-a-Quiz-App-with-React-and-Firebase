import { useState, useEffect } from 'react';
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [data, loading];
}
export { useFetch };
