export async function getBrevoTemplates() {
    if (!process.env.NEXT_PUBLIC_BREVO_API_KEY) {
        throw new Error('Brevo API key is not defined.');
    }
    
    const url = 'https://api.brevo.com/v3/smtp/templates?limit=50&offset=0&sort=desc';
    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}