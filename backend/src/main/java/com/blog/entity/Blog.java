package com.blog.entity;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
	
	@Id
	@Column(name="blog_id")
	private UUID blogId;
	
	private String title;
	
	@Column(name="blog_image_url")
	private String blogImageUrl;
	
	private String content;
	
	private String imageUrl;
	
	private Date createdAt;
	
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="author_id", referencedColumnName="user_id", nullable=false)
	@JsonIgnoreProperties("blogs")
	private User author;
	
	
	
	
}
