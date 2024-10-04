package com.crypticwrites.be.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

}
