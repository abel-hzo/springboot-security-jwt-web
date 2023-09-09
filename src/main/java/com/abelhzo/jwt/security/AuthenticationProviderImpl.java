package com.abelhzo.jwt.security;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: AuthenticationProviderImpl.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Jueves 07 Septiembre 2023, 22:21:17
 * @description: El presente archivo AuthenticationProviderImpl.java fue creado por Abel HZO.
 */
@Service
public class AuthenticationProviderImpl implements AuthenticationProvider {
	
	@Autowired
	private RestTemplate restTemplate;	
	
	private Logger logger = Logger.getLogger("AuthenticationProviderImpl");

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String token = getToken(authentication);
		
		if(token == null) return null;
			
		UserDetailsImpl userDetails = getCurrentUser(authentication, token);
		
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
	
	private String getToken(Authentication authentication) {
		
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		
		MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
		map.add("username", username);
		map.add("password", password);
		
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
		
		String token = null;
		
		try {
			ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8080/public/token", request, String.class);			
			String body = response.getBody();	
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsonNode = mapper.readTree(body);
				
			token = jsonNode.get("token").asText();
			System.out.println(token);

		} catch (HttpClientErrorException e) {
			logger.info("Usuario Inexistente");
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return token;
	}
	
	private UserDetailsImpl getCurrentUser(Authentication authentication, String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		headers.add("Authorization", "Bearer " + token);
		
		MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
		map.add("username", authentication.getName());
		
		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
		
		ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8080/users/get/user", request, String.class);
		
		String body = response.getBody();
		
		UserDTO userDTO = new UserDTO();
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsonNode = mapper.readTree(body);
			
			if(jsonNode.get("body").asText().equals("Usuario Inexistente"))
				throw new UsernameNotFoundException(jsonNode.get("body").asText());
			
			userDTO.setIdUser(jsonNode.get("body").get("idUser").asLong());
			userDTO.setUsername(jsonNode.get("body").get("username").asText());
			userDTO.setPassword(jsonNode.get("body").get("password").asText());
			userDTO.setEmail(jsonNode.get("body").get("email").asText());
			userDTO.setBirthday(jsonNode.get("body").get("birthday").asText());
			userDTO.setPhoto(jsonNode.get("body").get("photo").asText());
			jsonNode.get("body").get("userRolsDTO").forEach(rol -> {
				userDTO.getRoles().add(rol.get("rolDTO").get("rol").asText());
			});
			userDTO.setToken("Bearer " + token);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserDetailsImpl userDetails = new UserDetailsImpl();
		userDetails.setUserDTO(userDTO);		
		
		return userDetails;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
