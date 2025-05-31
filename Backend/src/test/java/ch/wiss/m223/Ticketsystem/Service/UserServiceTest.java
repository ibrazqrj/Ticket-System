package ch.wiss.m223.Ticketsystem.Service;

import ch.wiss.m223.Ticketsystem.Model.ERole;
import ch.wiss.m223.Ticketsystem.Model.Role;
import ch.wiss.m223.Ticketsystem.Model.User;
import ch.wiss.m223.Ticketsystem.Repository.RoleRepository;
import ch.wiss.m223.Ticketsystem.Repository.UserRepository;
import ch.wiss.m223.Ticketsystem.dto.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    public void setup() {
        userRepository = mock(UserRepository.class);
        roleRepository = mock(RoleRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserService();
        userService.setUserRepository(userRepository);
        userService.setRoleRepository(roleRepository);
        userService.setPasswordEncoder(passwordEncoder);
    }

    @Test
    public void testRegisterUser_success() {
        SignupRequest request = new SignupRequest();
        request.setUsername("ibrahim");
        request.setEmail("ibrahim@example.com");
        request.setPassword("Test@1234");

        when(userRepository.findByUsername("ibrahim")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("ibrahim@example.com")).thenReturn(Optional.empty());
        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(new Role(ERole.ROLE_USER)));
        when(passwordEncoder.encode("Test@1234")).thenReturn("encodedPassword");

        userService.registerUser(request);

        verify(userRepository, times(1)).save(Mockito.any(User.class));
    }

    @Test
    public void testRegisterUser_usernameTaken() {
        SignupRequest request = new SignupRequest();
        request.setUsername("ibrahim");
        request.setEmail("ibrahim@example.com");
        request.setPassword("Test@1234");

        when(userRepository.findByUsername("ibrahim")).thenReturn(Optional.of(new User()));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(request);
        });

        assertTrue(exception.getMessage().contains("Username is already taken"));
    }
}
