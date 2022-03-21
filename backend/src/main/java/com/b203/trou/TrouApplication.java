package com.b203.trou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TrouApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrouApplication.class, args);
	}
}
