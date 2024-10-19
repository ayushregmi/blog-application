package com.blog.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.blog.entity.Blog;
import com.blog.entity.User;
import com.blog.repository.BlogRepository;
import com.blog.repository.UserRepository;

@Service
public class BlogService {
	
	@Autowired 
	private BlogRepository blogRepository;
	
	@Autowired 
	private UserRepository userRepository;
		
	public List<Blog> getAll(){
		return blogRepository.findAll();
	}
	
	public List<Blog> getBlogByTitle(String title) {
		return blogRepository.findByTitle(title);
	}
	
	public Blog getBlogById(UUID blogId) {
		Optional<Blog> blog = blogRepository.findById(blogId);
		
		if(blog.isEmpty()) {
			return null;
		}
		return blog.get();
	}
	
	public List<Blog> getMyBlogs(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		User author = (User) authentication.getPrincipal();
		
		author = userRepository.findByUsername(author.getUsername()).orElseThrow();
		
		return author.getBlogs();
	}

	public void createBlog(Blog blog) {
		blog.setBlogId(UUID.randomUUID());
		blog.setCreatedAt(new Date());
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		User author = (User) authentication.getPrincipal();
		
		author = userRepository.findByUsername(author.getUsername()).orElseThrow();
		
		blog.setAuthor(author);
	
		blogRepository.save(blog);
	}
	
	public void updateBlog(Blog blog) {
		
		Blog b = blogRepository.findById(blog.getBlogId()).get();
		
		b.setTitle(blog.getTitle());
		b.setContent(blog.getContent());
		
		
		blogRepository.save(b);
	}
	
}
