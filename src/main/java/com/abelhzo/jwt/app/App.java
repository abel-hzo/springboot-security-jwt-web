package com.abelhzo.jwt.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author: Abel HZO
 * @project: springboot-security-jwt-web
 * @file: App.java
 * @location: México, Ecatepec, Edo. de México.
 * @date: Martes 05 Septiembre 2023, 12:11:20
 * @description: El presente archivo App.java fue creado por Abel HZO.
 */
@SpringBootApplication
@ComponentScan(basePackages = { "com.abelhzo.jwt" })
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}
