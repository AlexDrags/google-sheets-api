'use client';
import { useEffect, useState } from 'react'
import "./table.scss";
import { usePathname } from 'next/navigation'
import { createPayload } from "../../util/fetch";

export default function CryptoTable() {
    const pathname = usePathname();
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);
    
    useEffect(() => {
    // Do something here...
        const data = async function fetchData() {
            const { headers, rows } = await createPayload(pathname);
            setHeaders(headers);
            setRows(rows);
        }
        // console.log("Fetching data...");
        data();
    }, [pathname, setHeaders, setRows, headers.length, rows.length]);

    
        if (headers.length === 0 || rows.length === 0) {
            return <div>Loading data from CoinGecko...</div>;
        } else {
        return (
            <>
                <h2>📊 Crypto Market Data</h2>
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
                <a className=" text-black" href="http://https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">Tabel Powered by CoinGecko 2026.</a>
            </>
        )};
    
}