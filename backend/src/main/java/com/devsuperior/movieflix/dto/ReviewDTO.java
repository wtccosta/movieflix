package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Field \'text\' must not be null.")
	private String text;
	private UserDTO user;
	
	@NotNull
	private Long movieId;
	
	public ReviewDTO() {
		
	}

	public ReviewDTO(Long id, String text, UserDTO user, Long movieId) {
		this.id = id;
		this.text = text;
		this.user = user;
		this.movieId = movieId;
	}
	
	public ReviewDTO(Review entity) {
		id = entity.getId();
		text = entity.getText();
		user = (entity.getUser() != null) ? new UserDTO(entity.getUser()) : null ;
		movieId = entity.getMovie().getId();
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public UserDTO getUser() {
		return user;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setText(String text) {
		this.text = text;
	}

//	public void setUser(UserDTO user) {
//		this.user = user;
//	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}
	
}
