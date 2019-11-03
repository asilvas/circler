import fetch from 'node-fetch';

export default async loginCreds => {
  console.log(`Logging in with '${loginCreds.email}'...`);
  const { status, headers } = await fetch('https://video.logi.com/api/accounts/authorization', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://circle.logi.com'
    },
    body: JSON.stringify(loginCreds)
  });
  if (status !== 201) throw new Error(`authorization returned unexpected status of ${status} for email '${loginCreds.email}'`);

  console.log('Login complete');

  const cookie = headers.get('set-cookie');
  return cookie.match(/prod_session=[^;]+/)[0];
}
