export async function getAllGames() {
    const MATCHIT_URL = process.env.NEXT_PUBLIC_MATCHIT_BASEURL
    const USER_ID = 2

    // Fetch game data
    const gameResponse = await fetch(`${MATCHIT_URL}/api/games/${USER_ID}`, { cache: 'no-store' });
    if (!gameResponse.ok) throw new Error('Failed to fetch matchit games');

    // Return all games
    const gameData = await gameResponse.json();

    return gameData.data;
}   