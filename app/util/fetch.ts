export async function createPayload(baseUrl: string) {
    console.log(`Fetching data from ${baseUrl}api/sheets`);
    const response = await fetch(`${baseUrl}/api/sheets`, {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data from API");
    }
    const jsonData = await response.json();
    const allRows = jsonData.data;
    const headers = allRows[0];
    const rows = allRows.slice(1).map(function(row: string[]) {
        return row.map(function(cell: string) {
            return cell;
        });
    });
    return { headers: headers, rows: rows };
}