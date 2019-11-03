import fetch from 'node-fetch';

export default async (sessionCookie, names) => {
  console.log(`Getting accessories...`);
  const res = await fetch('https://video.logi.com/api/accessories', {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cookie': sessionCookie,
      'Origin': 'https://circle.logi.com'
    }
  });
  const { status } = res;
  if (status !== 200) throw new Error(`accessories returned unexpected status of ${status}`);

  const accessories = await res.json();

  const allAccessories = !names || names[0] === '*';
  const filtered = accessories.filter(a => {
    if (allAccessories) return true;
    return names.indexOf(a.name) > -1;
  });

  console.log('Accessories:', accessories.map(a => a.name).join(', '));
  if (filtered.length !== accessories.length) {
    console.log('Filtered Accessories:', filtered.map(a => a.name).join(', '));
  }

  return filtered;
}
