package com.b203.trou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TrouApplication {

	private static final String PROPERTIES =
			"spring.config.location="
					+"classpath:/application.yml"
					+",classpath:/application-secret.yml";

	public static void main(String[] args) {
		new SpringApplicationBuilder(TrouApplication.class)
				.properties(PROPERTIES)
				.run();
	}
}
