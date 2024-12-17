package com.crypticwrites.be.model;

import java.sql.Date;

import org.hibernate.annotations.ManyToAny;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	private String title;
	
    @Column(columnDefinition = "TEXT")
	private String description;
	private String author;
	private Date postDate;
	private String category;
	
	private String imageName;
	private String imageType;
	
	@Lob
	private byte[] imageData;

	 @ManyToOne
	    @JoinColumn(name = "creator_id", nullable = false)
	    @JsonBackReference // Prevents the back-reference from being serialized
	    private LoginUser creator;
	 
	 


	public Post() {
		super();
	}

	public Post(Long id,String title, String description) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getImageType() {
		return imageType;
	}

	public void setImageType(String imageType) {
		this.imageType = imageType;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public LoginUser getCreator() {
		return creator;
	}

	public void setCreator(LoginUser creator) {
		this.creator = creator;
	}

	
	
	
	
}
