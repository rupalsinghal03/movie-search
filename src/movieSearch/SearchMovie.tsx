import React, { useEffect, useState } from 'react'
import { getSearchedMovies } from '../apis/api.methods';
import { IMovieResp } from '../interfaces/response.interfaces'
import { useSearchParams, useNavigate } from 'react-router-dom';
interface IProps {
    query: string
}
export default function SearchMovie({ query }: IProps) {
    const navigate = useNavigate()

    const [movies, setMovies] = useState<IMovieResp>()
    const [params] = useSearchParams();

    const getNumberFromURL = (): number => {
        var page: string | null = params.get("page");
        var intpage: number

        intpage = Number(page)
        if (Number.isNaN(intpage) || intpage === 0 || intpage === undefined) {
            intpage = 1
        }
        return intpage
    }

    useEffect(() => {
        console.log(query,"search query")
        fetchData(getNumberFromURL());
    }, [params,query]);

    const fetchData = async (intpage: number) => {
        try {
            const data = await getSearchedMovies(intpage,query);
            setMovies(data)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const handlePrevPage = () => {
        var newPage = getNumberFromURL() - 1
        if (newPage < 1) {
            newPage = 1
        }
        navigate(`?page=${newPage}`)
    }
    const handleNextPage = () => {
        navigate(`?page=${getNumberFromURL() + 1}`)

    }
    return (
        <div>
            <h1>Resulting Searched movies</h1>
            {movies && <>
                {movies.results.map((data, index) => (
                    <ul key={index}>
                        <li>{data.title}</li>
                    </ul>
                ))}
                <div className="button">
                    {movies.page === 1 ? <></> : <button onClick={handlePrevPage}>Prev</button>}
                    {movies.page >= movies.total_pages ? <></> : <button onClick={handleNextPage}>Next</button>}
                </div>

            </>
            }

        </div>
    )
}
