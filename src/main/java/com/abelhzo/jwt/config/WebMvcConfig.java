package com.abelhzo.jwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: WebMvcConfig.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 12:14:34
 * @description: El presente archivo WebMvcConfig.java fue creado por Abel HZO.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/mylogin").setViewName("login");
		registry.addViewController("/").setViewName("pages/principal");
		registry.addViewController("/inicio").setViewName("pages/inicio");
		registry.addViewController("/admin").setViewName("pages/admin");
		registry.addViewController("/listar").setViewName("pages/listar");
		registry.addViewController("/dibujar").setViewName("pages/dibujar");
		registry.addViewController("/perfil").setViewName("pages/perfil");
		WebMvcConfigurer.super.addViewControllers(registry);
	}
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
