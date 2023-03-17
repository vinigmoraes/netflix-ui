import { HttpClient, RequestMethod } from "../httpclient/HttpClient";
import { MOVIE_DB_API_KEY, MOVIE_DB_URL } from "../variables";

const httpClient = new HttpClient(MOVIE_DB_URL!!)

export default async function getHomepageData() {
    return [
        await getNetflixOriginals(),
        {
            slug: 'treding',
            title: 'Trending',
            items: await httpClient.sendRequest(RequestMethod.GET, `/trending/all/week?api_key=${MOVIE_DB_API_KEY}`)   
        },
        {
            slug: 'top rated',
            title: 'Top Rated',
            items: await httpClient.sendRequest(RequestMethod.GET, `/movie/top_rated?api_key=${MOVIE_DB_API_KEY}`)   
        },
        {
            slug: 'action',
            title: 'Action',
            items: await httpClient.sendRequest(RequestMethod.GET, `/discover/movie?with_genres=2?&api_key=${MOVIE_DB_API_KEY}`)   
        }
    ]
}

export async function getNetflixOriginals() {
    return {
        slug: 'originals',
        title: 'Netflix Originals',
        items: await httpClient.sendRequest(RequestMethod.GET, `/discover/tv?with_network=213&api_key=${MOVIE_DB_API_KEY}`)
    }
}

export async function getMovieInfo(id: number, type: string) {
    const urls = new Map()
    urls.set('tv', `/tv/${id}?language=pt-BR&api_key=${MOVIE_DB_API_KEY}`)
    urls.set('movie' ,`/movie/${id}?language=pt-BR&api_key=${MOVIE_DB_API_KEY}`)

    const url = urls.get(type)

    return await httpClient.sendRequest(RequestMethod.GET, url)
}