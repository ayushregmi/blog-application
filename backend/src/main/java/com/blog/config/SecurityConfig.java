package com.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.blog.filter.JwtAuthenticationFilter;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired CustomCorsConfiguration customCorsConfiguraion;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, HttpServletRequest request) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);
		http.authorizeHttpRequests(auth->auth
				.requestMatchers("/api/login").permitAll()
				.requestMatchers("/api/register").permitAll()
				.requestMatchers("/api/blog/all").permitAll()
				.requestMatchers("/api/blog/blog_id=*").permitAll()
				.requestMatchers("/api/default/*").permitAll()
				.anyRequest().authenticated());
		http.cors(cors->cors.configurationSource(customCorsConfiguraion));
		http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.headers(headers -> headers.frameOptions(Customizer.withDefaults()));
		http.authenticationProvider(authenticationProvider);
		
		
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
}
