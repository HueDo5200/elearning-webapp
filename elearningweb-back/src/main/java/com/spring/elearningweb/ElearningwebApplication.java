package com.spring.elearningweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {
		ErrorMvcAutoConfiguration.class
})
public class ElearningwebApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElearningwebApplication.class, args);
	}
  @Bean
  public WebMvcConfigurer configureCors() {
	  return new WebMvcConfigurer() {
		  @Override
		  public void addCorsMappings(CorsRegistry registry) {
			  registry.addMapping("/**").allowedOrigins("http://localhost:3000");
		  }
	  };
  }
}
