/**
 * Fetches data from an API endpoint using an API key and a specific year.
 * @param {number} year - The year for which the data is requested.
 * @returns {Promise} - A Promise that resolves to the data fetched from the API.
 */
async function fetchDraft(year: number): Promise<any> {
    const apiKey = `dGZuH35MhS7vQDyMItNYX8MIfhxyUQzj7AOlXIGm`
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const endpoint = `https://api.sportradar.us/draft/nfl/trial/v1/en/${year}/draft.json?api_key=${apiKey}`;

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
}

export default fetchDraft;
