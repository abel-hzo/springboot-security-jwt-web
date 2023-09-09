package com.abelhzo.jwt.security;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: SuccessHandler.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 16:19:33
 * @description: El presente archivo SuccessHandler.java fue creado por Abel HZO.
 */
public class SuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		String contextPath = request.getContextPath();
		
		AtomicReference<String> value = new AtomicReference<>();
		
		request.getSession(false).setMaxInactiveInterval(600);

		value.set(contextPath + "/");
		
		response.sendRedirect(value.get());
		
	}

}
