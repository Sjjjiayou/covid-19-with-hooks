import { useState, useEffect, useCallback} from "react";

const baseUrl = "https://corona.lmao.ninja/v2"

export function useCoronaAPI(
    path,
    {initialData = null, converter = (data) => data, refetchInterval = null}
) {
    const [data, setData] = useState(initialData);
    const convertData = useCallback(converter, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseUrl}${path}`);
            const data = await response.json()
            setData(convertData(data))
        }
        fetchData()

        if(refetchInterval) {
            const intervalId = setInterval(fetchData, refetchInterval);
            return () => clearInterval(intervalId)
        }
    }, [convertData, path, refetchInterval]);

    return data;
}