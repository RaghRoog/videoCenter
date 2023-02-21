
export default async function getCredits(api, type, id){
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/${type}_credits?api_key=${api}&language=en-US`)
    const jsonResponse = await response.json()
    return jsonResponse
}