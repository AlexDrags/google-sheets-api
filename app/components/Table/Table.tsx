'use client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPayload } from "@/app/util/fetch";
import "./table.scss";

function formatCellValue(cell: string): string {
    const num = parseFloat(cell);
    if (!isNaN(num) && cell.trim() !== '') {
        return num.toLocaleString('en-US', { maximumFractionDigits: 10 });
    }
    return cell;
}

export default function CryptoTable() {
    const pathname = usePathname();
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);

    useEffect(() => {
    // Do something here...
    console.log('path', pathname)
        const data = async function fetchData() {
            const { headers, rows } = await createPayload(pathname);
            setHeaders(headers);
            setRows(rows);
        }
        console.log("Fetching data...");
        data();
    }, [pathname, setHeaders, setRows, headers.length, rows.length]);

    if (headers.length === 0 || rows.length === 0) {
        return <div>Loading data from CoinGecko...</div>;
    } else {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((header: string) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: string[], rowIndex: number) => (
                        <tr key={rowIndex}>
                            {row.map((cell: string, cellIndex: number) => (
                                <td key={cellIndex}>{formatCellValue(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )};
}