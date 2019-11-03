import fetch from 'node-fetch';

export default async (sessionCookie, accessory, from, to) => {
  let url = `https://video.logi.com/api/accessories/${accessory.accessoryId}/summary?antiCache=${Date.now()}`;
  console.log(`Requesting summary for accessory '${accessory.name}' between ${from.format('h:mma')} and ${to.format('h:mma')}: ${url}...`);
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cookie': sessionCookie,
      'Origin': 'https://circle.logi.com'
    },
    body: JSON.stringify({
      summaryDescription: {
        maxPlaybackDuration: 60000,
        showOnlyFiller: false,
        timeSegments: [
          { startTime: from.toISOString(), endTime: to.toISOString() }
        ]
      }
    })
  });
  let { status, headers } = res;
  if (status !== 201) throw new Error(`summary returned unexpected status of ${status}`);

  const summaryId = headers.get('x-logi-summaryid');

  console.log(`Downloading summary ${summaryId}...`);

  url = `https://video.logi.com/api/summary/${summaryId}/mp4`;
  res = await fetch(url, {
    method: 'GET',
    headers: {
      'Cookie': sessionCookie,
      'Origin': 'https://circle.logi.com'
    }
  });

  if (res.status !== 200) throw new Error(`summary download returned unexpected status of ${status}: ${url}`);

  return await res.buffer();
}
