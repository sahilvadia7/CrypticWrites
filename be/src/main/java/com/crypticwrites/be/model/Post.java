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

@Data
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
	 
	 


	public Post(Long id,String title, String description) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public Long getId() {
		return id;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public LoginUser getCreator() {
		return creator;
	}

	public String getAuthor() {
		return author;
	}

	public void setCreator(LoginUser creator) {
		this.creator = creator;
	}
	
	
}
