package com.blog.dto;

import java.util.UUID;

import com.blog.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

	private UUID userId;
	private String fullName;
	private String profileUrl;
	private String username;
	
	public UserDto(User user) {
		this.userId = user.getUserId();
		this.fullName = user.getFullName();
		this.profileUrl = user.getProfileUrl();
		this.username = user.getUsername();
	}
	
}
