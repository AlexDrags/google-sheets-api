'use client';
import useSWR from 'swr';
import "./table.scss";

const fetcher = (url) => fetch(url).then((r) => r.json);


export default function CryptoTable() {
    const { data } = useSWR(
        '/api/sheets',
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
        }
    );

    const headers = data?.headers || [];
    const rows = data?.rows || [];

    return (
            <>
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            {headers.map(function(header: string) {
                                return <th key={header}>{header}</th>;
                            })}
                        </tr>
                        </thead>
                        <tbody>
                            {rows.map(function(row: string[], index: number) {
                                return (
                                    <tr key={index}>
                                        {row.map(function(cell: string, cellIndex: number) {
                                            return <td key={cellIndex}>{cell}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    // };

}