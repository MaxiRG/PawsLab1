package com.example.pawsback.paws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

//Folder structure: https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.structuring-your-code.locating-the-main-class
//http://www.javapractices.com/topic/TopicAction.do?Id=205



@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class PawsBackApplication {
	public static void main(String[] args) {
		SpringApplication.run(PawsBackApplication.class, args);
	}
}
