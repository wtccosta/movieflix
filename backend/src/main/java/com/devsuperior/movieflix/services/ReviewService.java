package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;


@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Transactional
	public ReviewDTO persist(ReviewDTO reviewDTO) {
		
		User user = authService.authenticated();
		
		authService.validateIfUserIsMember(user.getId());
		
		Movie movie = movieRepository.findById(reviewDTO.getMovieId()).orElseThrow(() -> 
					new ResourceNotFoundException("Movie with id: \'"+reviewDTO.getMovieId()+"\' not found.")
				);
		
		Review entity = new Review();
		entity.setMovie(movie);
		entity.setText(reviewDTO.getText());
		entity.setUser(user);
		
		entity = repository.save(entity);
		
		return new ReviewDTO(entity);
	}
	
}
