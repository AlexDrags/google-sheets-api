import { google } from "googleapis";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: "service_account",
                private_key: process.env.private_key?.replace(/\\n/g, "\n"),
                client_email: process.env.client_email,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = "A:M";

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return Response.json({ message: "No data found in spreadsheet" });
        }

        return Response.json({ data: rows });
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return Response.json(
            { message: "Failed to fetch data", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}