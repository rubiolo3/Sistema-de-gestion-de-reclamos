package api_tpo_grupo4.app.controller;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api_tpo_grupo4.app.dto.UsuarioDTO;
import api_tpo_grupo4.app.entity.Usuario;
import api_tpo_grupo4.app.service.IUsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    private final int EXPIRATION_TIME_IN_MIN = 1000;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private SecretKey secretKey;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioDTO credentials) {
        // Validate credentials (check if the user exists)
        Usuario foundUser = usuarioService.findUser(credentials.getUsuario(), credentials.getPassword());
        if (foundUser != null) {
            // If the user exists, create the JWT token with userId in the payload
            String token = Jwts.builder()
                    .setSubject(credentials.getUsuario())
                    .claim("userId", foundUser.getId()) // Include userId in the claims
                    .claim("tipoUsuario", foundUser.getTipousuario()) // Include tipoUsuario in the claims
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MIN * 60 * 1000))
                    .signWith(secretKey, SignatureAlgorithm.HS256)
                    .compact();

            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales invÃ¡lidas.", HttpStatus.UNAUTHORIZED);
        }
    }
}
