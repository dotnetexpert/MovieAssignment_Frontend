import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiServices';

const Movie = () => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(6);
    const [loading, setLoading] = useState(true); // Add loading state
    const totalPages = Math.ceil(movieList.length / moviesPerPage);

    const getAllMovies = async () => {
        setLoading(true); // Set loading to true while fetching
        try {
            const response = await apiService.get('/movie/getAll');
            if (response && response.data) {
                setMovieList(response.data); // Adjust based on API response structure
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    };

    useEffect(() => {
        getAllMovies();
    }, []);

    const handleCreateMovie = () => {
        navigate('/create');
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        sessionStorage.removeItem("token");
        navigate('/'); 
    };

    const handleEditMovie = (id) => {
        navigate(`/edit/${id}`);
    };

    const indexOfLastMovie = currentPage * moviesPerPage; 
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage; 
    const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie); 

    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    return (
        <>
            {loading ? (
               <div className="loading"><img src="images/Spinner.gif"/></div>
            ) : movieList.length > 0 ? (
                <div className="my-movies-page inner-page">
                    <div className="custom-container">
                        <div className="inner-page-main-heading flex-heading">
                            <h2>My Movies 
                                <span onClick={handleCreateMovie}>
                                    <img src="images/add-icon.png" alt='' />
                                </span>
                            </h2>
                            <span onClick={handleLogout} className="logout-action">
                                Logout <img src="images/logout-icon.png" alt="" />
                            </span>
                        </div>

                        <div className="movies-list-wrapper">
                            {currentMovies.map((movie) => (
                                <div 
                                    key={movie.id} 
                                    className="movie-box" 
                                    onClick={() => handleEditMovie(movie.id)}
                                >
                                    <figure>
                                        <img src={movie.poster || "images/default-movie.png"} alt={movie.title} />
                                    </figure>
                                    <div className="movie-box-desc">
                                        <p className="font-large movie-name">{movie.title}</p>
                                        <p className="font-small movie-year">{movie.publishingyear}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="custom-pagination">
                            <span 
                                className={`prev-page ${currentPage === 1 ? 'disabled' : ''}`} 
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                            >
                                Previous
                            </span>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <span 
                                    key={index + 1} 
                                    className={`page-number ${currentPage === index + 1 ? 'active' : ''}`} 
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </span>
                            ))}
                            <span 
                                className={`next-page ${currentPage === totalPages ? 'disabled' : ''}`} 
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                            >
                                Next
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="movies-page movie-empty-page">
                    <div className="movie-empty-box text-center">
                        <h2>Your movie list is empty</h2>
                        <button type="button" className="btn btn-primary" onClick={handleCreateMovie}>
                            <span>Add a new movie</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Movie;
