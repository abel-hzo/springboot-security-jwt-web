package com.abelhzo.jwt.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: UserDetailsImpl.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 23:36:13
 * @description: El presente archivo UserDetailsImpl.java fue creado por Abel HZO.
 */
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = -1902182998162168653L;
	private UserDTO userDTO;

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<? extends GrantedAuthority> auths =
		userDTO.getRoles()
			   .stream()
			   .map(rol -> new SimpleGrantedAuthority("ROLE_" + rol))
			   .collect(Collectors.toList());
		return auths;
	}

	@Override
	public String getPassword() {
		return userDTO.getPassword();
	}

	@Override
	public String getUsername() {
		return userDTO.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
