package appjava.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.time.temporal.ChronoUnit;
import java.time.Instant;
import java.math.BigInteger;


@Entity
@Table(name = "jwt")
public class Jwt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ownerLogin;
    @Column(length = 1024)
    private String accessToken;
    @Column(length = 1024)
    private String refreshToken;
    
    
    public String getOwnerLogin() { return this.ownerLogin; }
    public void setOwnerLogin(String login) { this.ownerLogin = login; }

    public String getAccessToken() { return this.accessToken; }
    public void setAccessToken(String token) { this.accessToken = token; }

    public String getRefreshToken() { return this.refreshToken; }
    public void setRefreshToken(String token) { this.refreshToken = token; }
    
}