export default async function brevoSMS(recipient: any, content: string, subject: string) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': `${process.env.NEXT_PUBLIC_BREVO_API_KEY}`
        },
        body: JSON.stringify({
          sender: 'RRS',
          recipient: recipient,
          content: content,
          type: 'marketing',
          tag: 'accountValidation',
          webUrl: 'https://rewardripplesolutions.com/',
          unicodeEnabled: true,
          organisationPrefix: 'RRS'
        })
    };
  
  const response: any = await fetch('https://api.brevo.com/v3/transactionalSMS/sms', options)
  if (response.code === 'invalid_parameter') {
    throw new Error(response.message)
  }

  const data = await response.json()
  return data
}

