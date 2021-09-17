import './styles.css';

import { Movie } from 'types/movie';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    movieId: number;
}

const MovieCardDetails = ( { movieId } : Props) => {

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
          url: `/movies/${movieId}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then((response) => {
            setMovie(response.data);
          })
          .finally(() => {
            // setIsLoading(false);
          });
    }, [setMovie, movieId])

    return (
      <div className="base-card movie-card-details">
        <div className="movie-card-content-container">
            <img src={movie?.imgUrl} alt={movie?.title} />
          <div className="movie-card-details-bottom-container">
            <div className="movie-card-details-title">{movie?.title}</div>
            <div className="movie-card-details-year">{movie?.year}</div>
            <div className="movie-card-details-subtitle">{movie?.subTitle}</div>
            <div className="movie-card-details-synopsis">{movie?.synopsis}</div>
          </div>
        </div>
      </div>
    );
}

export default MovieCardDetails;