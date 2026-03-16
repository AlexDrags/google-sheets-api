'use client';
import useSWR from 'swr';
import "./table.scss";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface SheetData {
    headers: string[];
    rows: string[][];
}

function formatCellValue(cell: string): string {
    const num = parseFloat(cell);
    if (!isNaN(num) && cell.trim() !== '') {
        return num.toLocaleString('en-US', { maximumFractionDigits: 10 });
    }
    return cell;
}

export default function CryptoTable() {
    const { data } = useSWR<SheetData>(
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
    );
}