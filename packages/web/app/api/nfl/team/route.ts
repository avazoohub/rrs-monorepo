
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * Fetches data from an API endpoint using an API key and a specific year.
 * @returns {Promise} - A Promise that resolves to the data fetched from the API.
 */

export async function GET(request: Request, response: Response) {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId")

    const apiKey = process.env.NEXT_PUBLIC_SPORTSRADAR_API_KEY;

    const options = {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": `${apiKey}`
        }
    };

    const endpoint = `https://api.sportradar.com/nfl/official/trial/v7/en/teams/f14bf5cc-9a82-4a38-bc15-d39f75ed5314/profile.json?api_key=${apiKey}`

    try {
        const fetchResponse = await fetch(endpoint, options);

        if (!fetchResponse.ok) {
            return NextResponse.json(
                { message: "HTTP error", status: fetchResponse.status },
                { status: fetchResponse.status }
            );
        }

        const data = await fetchResponse.json();

        return NextResponse.json({ data: data, message: data.message || "Success", status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching data" },
            { status: 500 }
        );
    }
}