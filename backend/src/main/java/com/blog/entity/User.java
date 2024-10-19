package com.blog.entity;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor 
public class User implements UserDetails{
	@Id
	@Column(name="user_id")
	private UUID userId;
	@Column(name="full_name")
	private String fullName;
	private String username;
	@Column(name="profile_url")
	private String profileUrl;
	@JsonIgnore
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToMany(mappedBy="author", fetch=FetchType.EAGER)
	@JsonIgnore
	private List<Blog> blogs;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.name()));
	}
	
	
}
