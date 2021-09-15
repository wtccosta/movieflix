import './styles.css';

import { Movie } from 'types/movie';

type Props = {
    movie: Movie;
}

const MovieCard = ( { movie } : Props) => {

    return (
        <div className="base-card product-card">
            <div className="card-top-container">
                <img src={movie.imgUrl} alt={movie.title} />
            </div>
            <div className="card-bottom-container">
                <div className="movie-card-title">{movie.title}</div>
                <div className="movie-card-year">{movie.year}</div>
                <div className="movie-card-subtitle">{movie.subTitle}</div>
            </div>
        </div>
    );
}

export default MovieCard;