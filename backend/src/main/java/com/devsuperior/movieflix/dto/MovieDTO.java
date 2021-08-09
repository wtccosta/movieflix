package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;

public class MovieDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private String subTitle;
	private Integer year;
	private String imgUrl;
	private String synopsis;
	private GenreDTO genre;
	private List<ReviewDTO> reviews = new ArrayList<>();
	
	public MovieDTO() {
		
	}

	public MovieDTO(Long id, String title, String subTitle, Integer year, String imgUrl, String synopsis) {
		this.id = id;
		this.title = title;
		this.subTitle = subTitle;
		this.year = year;
		this.imgUrl = imgUrl;
		this.synopsis = synopsis;
	}
	
	public MovieDTO(Movie movie) {
		id = movie.getId();
		title = movie.getTitle();
		subTitle = movie.getSubTitle();
		year = movie.getYear();
		imgUrl = movie.getImgUrl();
		synopsis = movie.getSynopsis();
		setGenreDTO(movie);
	}

	
	public MovieDTO(Movie movie, Set<Review> reviews) {
		id = movie.getId();
		title = movie.getTitle();
		subTitle = movie.getSubTitle();
		year = movie.getYear();
		imgUrl = movie.getImgUrl();
		synopsis = movie.getSynopsis();
		setGenreDTO(movie);
		reviews.forEach(review -> this.reviews.add( new ReviewDTO(review) ));
	}
	

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public Integer getYear() {
		return year;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public GenreDTO getGenre() {
		return genre;
	}

	public List<ReviewDTO> getReviews() {
		return reviews;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public void setGenre(GenreDTO genre) {
		this.genre = genre;
	}
	
	private void setGenreDTO(Movie movie) {
		genre = ( movie.getGenre() != null ) ?  new GenreDTO(movie.getGenre()) :  null ;
	}
	
}
