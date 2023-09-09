package com.abelhzo.jwt.security;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: UserDTO.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 23:38:44
 * @description: El presente archivo UserDTO.java fue creado por Abel HZO.
 */
public class UserDTO {

	private Long idUser;
	private String username;
	private String password;
	private String email;
	private String birthday;
	private String photo;
	private List<String> roles = new ArrayList<String>(0);
	private String token;

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "UserDTO [idUser=" + idUser + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", birthday=" + birthday + ", photo=" + photo + ", roles=" + roles + ", token=" + token + "]";
	}

}
