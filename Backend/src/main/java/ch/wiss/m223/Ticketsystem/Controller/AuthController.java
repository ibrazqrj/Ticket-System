package ch.wiss.m223.Ticketsystem.Controller;

import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m223.Ticketsystem.Model.ERole;
import ch.wiss.m223.Ticketsystem.Model.Role;
import ch.wiss.m223.Ticketsystem.Model.User;
import ch.wiss.m223.Ticketsystem.Model.UserDetailsImpl;
import ch.wiss.m223.Ticketsystem.Repository.RoleRepository;
import ch.wiss.m223.Ticketsystem.Repository.UserRepository;
import ch.wiss.m223.Ticketsystem.Security.JwtUtils;
import ch.wiss.m223.Ticketsystem.Security.MessageResponse;
import ch.wiss.m223.Ticketsystem.Service.UserService;
import ch.wiss.m223.Ticketsystem.dto.JwtResponse;
import ch.wiss.m223.Ticketsystem.dto.LoginRequest;
import ch.wiss.m223.Ticketsystem.dto.SignupRequest;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  UserRepository userRepository;
  @Autowired
  RoleRepository roleRepository;
  @Autowired
  PasswordEncoder encoder;
  @Autowired
  JwtUtils jwtUtils;
  @Autowired
  UserService userService;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateToken(loginRequest.getUsername());
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
    return ResponseEntity.ok(new JwtResponse(jwt,
        userDetails.getId(),
        userDetails.getUsername(),
        userDetails.getEmail(),
        roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    try {
      userService.registerUser(signUpRequest);
      return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    } catch (RuntimeException ex) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: " + ex.getMessage()));
    }
  }
}
