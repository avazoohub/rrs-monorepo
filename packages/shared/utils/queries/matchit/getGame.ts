export async function getGame(game_id: number) {
    const MATCHIT_URL = process.env.NEXT_PUBLIC_MATCHIT_BASEURL
    const USER_ID = 2

    // Fetch game data
    const gameResponse = await fetch(`${MATCHIT_URL}/api/game/${game_id}/${USER_ID}`, { cache: 'no-store' });
    if (!gameResponse.ok) throw new Error('Failed to fetch matchit games');

    // Return all games
    const gameData = await gameResponse.json();

    console.log('gameData', gameData);
   
    return gameData.data;
}   