package appjava.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.time.temporal.ChronoUnit;
import java.time.Instant;
import java.math.BigInteger;


@Entity
@Table(name = "users")
public class User {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String role;
    private String login;
    private String password;
    private String email;
    private String phone;

    public void setId(Long id) { this.id = id; }
    public Long getId() { return this.id; }

    public void setRole(String role) { this.role = role; }
    public String getRole() { return this.role; }

    public void setLogin(String login) { this.login = login; }
    public String getLogin() { return this.login; }

    public void setPassword(String password) { this.password = password; }
    public String getPassword() { return this.password; }

    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return this.email; }

    public void setPhone(String phone) { this.phone = phone; }
    public String getPhone() { return this.phone; }

}