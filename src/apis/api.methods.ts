import axios, { AxiosResponse } from "axios";
import { IMovieResp } from "../interfaces/response.interfaces";

const BASEURL = 'https://api.themoviedb.org'
const API_KEY = "689aa4cbdc0868b6b82ad99aa88409c2"
export const getPopularMovies = async (page: Number): Promise<IMovieResp | undefined> => {
    const url = BASEURL + `/3/movie/popular?api_key=${API_KEY}&page=${page}`
    try {
        const response: AxiosResponse<IMovieResp> = await axios.get<IMovieResp>(url);
        // alert(response.data.message)
        return response.data
    }
    catch (error: any) {
        console.error('error!', error)
        if (error.response?.status === 400) {
            alert(error.response?.data.message)
        }
        else if (error.response?.status === 404) {
            // 404 page has to be added
        }
        else {
            return error
        }
    }
}
export const getSearchedMovies = async (page: Number, query: string): Promise<IMovieResp | undefined> => {
    const url = BASEURL + `/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    try {
        const response: AxiosResponse<IMovieResp> = await axios.get<IMovieResp>(url);
        // alert(response.data.message)
        return response.data
    }
    catch (error: any) {
        console.error('error!', error)
        if (error.response?.status === 400) {
            alert(error.response?.data.message)
        }
        else if (error.response?.status === 404) {
            // 404 page has to be added
        }
        else {
            return error
        }
    }
}