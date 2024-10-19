package com.blog.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.entity.Blog;
import com.blog.service.BlogService;

@RestController
@RequestMapping("/api/blog")
//@CrossOrigin(origins = "*")
public class BlogController {
	
	@Autowired
	private BlogService blogService;
	
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllBlogs(){
		return new ResponseEntity<List<Blog>>(blogService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping("/search/{title}")
	public ResponseEntity<?> getBlogByTitle(@PathVariable("title") String title){
		return new ResponseEntity<List<Blog>>(blogService.getBlogByTitle(title), HttpStatus.OK);
	}
	
	@GetMapping("/blog_id={blog_id}")
	public ResponseEntity<?> getBlogById(@PathVariable("blog_id") UUID blogId){
		
		Blog blog = blogService.getBlogById(blogId);
		
		if(blog == null) {
			return new ResponseEntity<String>("Blog not found", HttpStatus.NOT_FOUND);
		}
		
		return ResponseEntity.ok(blog);
	}
	
	@GetMapping("/myblogs")
	public ResponseEntity<?> getMyBlogs(){
		return new ResponseEntity<List<Blog>>(blogService.getMyBlogs(), HttpStatus.OK);
	}

	@PostMapping("/create")
	public ResponseEntity<?> createBlog(@RequestBody Blog blog){
		
		
		blogService.createBlog(blog);
		
		
		return ResponseEntity.ok("Blog Created");
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateBlog(@RequestBody Blog blog){
		
		blogService.updateBlog(blog);
		
		return ResponseEntity.ok("Blog updated");
	}
	
}
