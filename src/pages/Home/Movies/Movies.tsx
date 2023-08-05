import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import './Movies.css';
import Pagination from "./components/Pagination/Pagination";
import StarRating from "./components/StarRating/StarRating";

const Movies = () => {
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
    const [movies, setMovies] = useState<{ [key: string]: any }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (page: number) => {

        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2VjNjhmM2Q4ODFlZDM2OWU3MjcxZTUwNTkwNzE5ZSIsInN1YiI6IjY0Y2QzM2MxMWIxNTdkMDBmZmM1Y2IyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ePv27fS4QxnrzVTdpL5YDis1zqI-qa4G2AJ678sS_c',
            accept: 'application/json',
        };

        try {
            const response = await axios.get(url, { headers });
            const moviePromises: Promise<any>[] = response.data.results.map((movieItem: any, key: any) => {
                const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieItem.id}?language=en-US`;
                return axios.get(movieDetailsUrl, { headers });
            });

            const movieResponses = await Promise.all(moviePromises);

            const moviesInfo: any = response.data.results.map((movieItem: any, index: any) => {
                return {
                    ...movieItem,
                    details: movieResponses[index].data, // Access the data from each resolved promise
                    image_poster: `https://image.tmdb.org/t/p/original${movieItem.poster_path}`,
                };
            });

            setMovies(moviesInfo);
            setTotalPages(response.data.total_pages);
            console.log("movies info", moviesInfo);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }

    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <AuthTemplate>
            <div className="container">
                <Row gutter={[24, 16]} className="margin-movies">
                    {movies.map((movie, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <div
                                className="movie-container"
                                onMouseEnter={() => setSelectedMovie(movie)}
                                onMouseLeave={() => setSelectedMovie(null)}
                            >
                                <img
                                    src={movie.image_poster}
                                    alt={`Movie Poster ${index + 1}`}
                                    style={{ maxWidth: "60%", height: "auto", display: "block" }}
                                />
                                {selectedMovie === movie && (
                                    <div className="movie-details">
                                        <h2>{movie.details.title}</h2>
                                        <StarRating rating={movie.details.vote_average} />
                                        <div className="genres">{movie.details.genres.map((genre: any) => genre.name).join(', ')}</div>
                                        <p>{movie.details.release_date}</p>
                                        <p>{movie.details.overview}</p>

                                    </div>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </AuthTemplate>
    );
};

export default Movies;
