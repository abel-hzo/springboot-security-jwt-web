package com.abelhzo.jwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.abelhzo.jwt.security.SuccessHandler;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: SecurityConfig.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 15:29:28
 * @description: El presente archivo SecurityConfig.java fue creado por Abel HZO.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	//Se Debe instanciar PasswordEncoder al crear UserDetailsService.
	@Bean
	public PasswordEncoder passEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((authz) -> authz
				.requestMatchers("/images/**").permitAll()
				.requestMatchers("/css/**").permitAll()
				.requestMatchers("/js/login.js").permitAll()
				
				.requestMatchers("/admin").hasRole("ADMIN")
				.requestMatchers("js/admin.js").hasRole("ADMIN")
				.requestMatchers("/listar").hasAnyRole("ADMIN", "USER")
				.requestMatchers("/js/listar.js").hasAnyRole("ADMIN", "USER")
				.requestMatchers("/inicio", "/dibujar", "/perfil").hasAnyRole("ADMIN", "USER", "GUEST")
				.requestMatchers("/js/inicio.js", "/js/dibujar.js", "/js/perfil.js").hasAnyRole("ADMIN", "USER", "GUEST")
				
				.anyRequest().authenticated())
//			.httpBasic()       //Se activa para pruebas desde Postman
//			.and()
			.formLogin((login) -> login
					.loginPage("/mylogin").permitAll()
					.loginProcessingUrl("/loginUrl")
					.successHandler(new SuccessHandler()))
			.csrf().disable()  //Se debe desactivar al colocar nuestro propio formLogin
			.logout()          //Para logout debe estar desactivado el csrf
			.and()
			.sessionManagement((session) -> session
					.invalidSessionUrl("/mylogin")
					.maximumSessions(1)
					.expiredUrl("/mylogin?expired=true"));         
		
		return http.build();
	}

}
