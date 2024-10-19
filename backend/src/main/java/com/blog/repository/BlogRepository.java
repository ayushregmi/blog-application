package com.blog.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID>{
	
	List<Blog> findByTitle(String title);
	
}
