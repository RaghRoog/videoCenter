let getDetails = async (quertType, id, apiKey) => {
    const response = await fetch(`https://api.themoviedb.org/3/${quertType}/${id}?api_key=${apiKey}`)
    const jsonResponse = await response.json()
    return jsonResponse
}

export default getDetails