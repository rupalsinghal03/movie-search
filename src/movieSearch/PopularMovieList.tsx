import React, { useEffect, useState } from 'react'
import { getPopularMovies } from '../apis/api.methods';
import { IMovieResp } from '../interfaces/response.interfaces'
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
export default function PopularMovieList() {
    const navigate = useNavigate()
    const mediaBaseUrl = 'https://image.tmdb.org/t/p/w500'
    const [movies, setMovies] = useState<IMovieResp>()
    const [loading, setLoading] = useState(true);
    const [showPages, setShowPages] = useState<number[]>([])
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
        setLoading(true);
        fetchData(getNumberFromURL());
    }, [params]);

    const fetchData = async (intpage: number) => {

        try {
            await getPopularMovies(intpage).then((resp) => {
                setMovies(resp)
                setLoading(false)
                if (resp) {
                    var remainingPages = resp.total_pages - resp.page

                    if (remainingPages > 10) {
                        /** 
                        *because we only want to
                        * show next 10 or remaining pages.
                        */
                        remainingPages = 10;
                    }
                    var tempPages: number[] = [];
                    for (let i = resp.page + 1; i < resp.page + 1 + remainingPages; i++) {
                        tempPages.push(i);
                    }
                    setShowPages(tempPages)
                }
            });
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

    const handleCustomPage = (page_count: number) => {
        /** 
        * function to navigate to custom.
        * page clicked by user.
        */
        navigate(`?page=${page_count}`)
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12 pt-4 align-items-center">
                    <div className="page-title mb-4">
                        <h3>Popular Movies</h3>
                    </div>
                    {loading && <LoadingSpinner />}

                    {!loading && movies && (
                        <>
                            <div className="row">
                                {movies.results.map((data, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                                        <div className="card p-4 d-flex flex-row justify-content-between align-items-center">
                                            <div className="card-body">
                                                <img src={mediaBaseUrl + data.backdrop_path} className="card-img-top" style={{ width: "100%", height: "150px" }} />
                                                <div className="card-title border-bottom pb-4 text-center">
                                                    <h5 className="card-title">{data.title}</h5>
                                                </div>
                                                <p className="card-text">{data.overview.length > 100 ? `${data.overview.substring(0, 100)}...` : data.overview}</p>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="pagination d-flex justify-content-between mb-4">
                                        {movies.page === 1 ? <></> : <button className='btn btn-primary' onClick={handlePrevPage}>Prev</button>}
                                        {showPages.map((page, index) => (
                                            <button className='btn btn-secondary rounded-circle' onClick={() => { handleCustomPage(page) }}>{page}</button>
                                        ))}
                                        {movies.page >= movies.total_pages ? <></> : <button className='btn btn-primary' onClick={handleNextPage}>Next</button>}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
