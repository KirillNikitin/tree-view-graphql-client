'use server'

export async function fetchDataByQuery(query: any): Promise<any> {
  try {
    let response = await fetch('https://api.geographql.rudio.dev/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        //params: params
      }),
    });
    let data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}