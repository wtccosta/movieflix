package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;


@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	

	@Transactional(readOnly = true)
	public MovieDTO findOne(Long id) {
		Movie movie = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie don't found, id: " + id));
		return new MovieDTO(movie);
	}

	@Transactional(readOnly = true)
	public List<ReviewDTO> findOneMovieReviews(Long id) {
		return repository.findMovieReviews(id).stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());

	}

	@Transactional(readOnly = true)
	public Page<MovieDTO> findMovieByGenreId(Long genreId, Pageable pageable) {
		
		return repository
				.pagedMoviesByGenreId(genreId, pageable)
				.map(x -> new MovieDTO(x));

	}

	@Transactional(readOnly = true)
	public Page<MovieDTO> findAllMoviePaged(Pageable pageable) {
		return repository.findAll(pageable).map(x -> new MovieDTO(x));
	}
}
