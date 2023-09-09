package com.abelhzo.jwt.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: UserController.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Miércoles 06 Septiembre 2023, 00:37:27
 * @description: El presente archivo UserController.java fue creado por Abel HZO.
 */
@RestController
@RequestMapping("/users")
public class UserController {
	
	@GetMapping("/currentUser")
	public ResponseEntity<UserDetails> currentUser() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		
		return new ResponseEntity<UserDetails>(userDetails, HttpStatus.OK);
	}

}
