
import * as React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

import Loading from './Loading';

const DEV_SVR = "https://dev.dummy-svr.com";
const PROD_SVR = "https://prod.dummy-svr.com";

const METRIC_ENDPOINT = "/metrics";

function genQuery(timeRange: string, componentName: string, seed: number) {
    return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${(seed%7)==0?'true':'false'}`;
}

interface IProps {
    timeRange: string;
}

// our components props accept a number for the initial value
const C4 = (props: IProps): JSX.Element => {
    const refreshInterval_Secs = 42;
    const query = genQuery(props.timeRange, "c4", Math.random());

    const [results, setResults] = useState("")
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        callApi();
        setInterval(() => {
            callApi();
        }, refreshInterval_Secs * 1000)
    }, [refreshInterval_Secs] );

    const callApi = () => {
        setLoading(true);
        axios.post(
            process.env.NODE_ENV == 'production' ? PROD_SVR + METRIC_ENDPOINT : DEV_SVR + METRIC_ENDPOINT,
            {query}
        )
        .then((response : any) => {
            setResults(response.data);
            setLoading(false);
        })
        .catch((err: any) => {
            setLoading(false);
        })
    };
    

    return (
    <>
        { loading ? <Loading /> : 'A fox jumped ' + results }
    </>);
}

export default C4;