package api_tpo_grupo4.app.config;

 
import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Configuration
@EnableWebSecurity
public class SecurityConfig{


	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { //'HttpSecurity' analiza cada solicitud http que es enviada a nuestra aplicacion
		http.authorizeHttpRequests(
				(authz) -> authz.anyRequest().authenticated())
				.addFilterBefore(jwtAuth(), UsernamePasswordAuthenticationFilter.class)
				.csrf(AbstractHttpConfigurer::disable);
		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() { //personaliza la configuración de seguridad web para permitir solicitudes a ciertos patrones URL sin autenticación.
		return (web) -> web.ignoring().requestMatchers("auth/login", "api/usuarios");
	}

	@Bean
	public JwtAuthFilter jwtAuth() { //Este método crea una instancia del filtro JwtAuthFilter y le pasa la SecretKey.
		return new JwtAuthFilter(secretKey());
	}

	@Bean
	public SecretKey secretKey() {
		SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
		byte[] encodedKey = secretKey.getEncoded(); //para q se pueda ver por pantalla, no hace falta hacerlo
		String encodedKeyBase64 = Base64.getEncoder().encodeToString(encodedKey);

		// Registro de la clave secreta (solo para fines de depuración) para verla en console
		System.out.println("Secret Key (Base64): " + encodedKeyBase64);

		return secretKey;
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedMethods(CorsConfiguration.ALL)
                        .allowedHeaders(CorsConfiguration.ALL)
                        .allowedOriginPatterns(CorsConfiguration.ALL);
            }
        };
    }
}