async function brevo(recipient: any, content: string, subject: string, templateId: number) {
    if(templateId) {
        const { id, firstname, lastname, email } = recipient
        const options = {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": `${process.env.NEXT_PUBLIC_BREVO_API_KEY}`
            },
            body: JSON.stringify({
                sender: {
                    name: "Rewards Ripple",
                    email: "no-reply@rewardripplesolutions.com",
                },
                to: [{ email: email, name: firstname }],
                subject: subject,
                headers: { 
                    'X-Mailin-custom': 'custom_header',
                    idempotencyKey: id,
                },
                templateId: templateId,
                params: { FIRSTNAME: firstname, LASTNAME: lastname, EMAIL: email },
            }),
        };


        fetch("https://api.brevo.com/v3/smtp/email", options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }
}

export default brevo