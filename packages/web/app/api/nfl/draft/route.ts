import { NextResponse, NextRequest } from "next/server";

/**
 * Fetches data from an API endpoint using an API key and a specific year.
 * @returns {Promise} - A Promise that resolves to the data fetched from the API.
 */

export async function GET(request: NextRequest, response: NextResponse) {
  const apiKey = process.env.NEXT_PUBLIC_SPORTSRADAR_API_KEY;

  // const endpoint = `https://api.sportradar.us/draft/nfl/trial/v1/en/2024/draft.json?api_key=${apiKey}`;
  const endpoint = 'https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/draft?season=2024&region=us&lang=en';

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  try {
    const fetchResponse = await fetch(endpoint, options);
    if (!fetchResponse.ok) {
      return NextResponse.json(
        { message: "HTTP error", status: fetchResponse.status },
        { status: fetchResponse.status },
      );
    }

    const data = await fetchResponse.json();
    return NextResponse.json({
      data: data,
      message: data.message || "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }
}
