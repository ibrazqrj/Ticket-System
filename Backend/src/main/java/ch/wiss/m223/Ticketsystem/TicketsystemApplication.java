package ch.wiss.m223.Ticketsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ch.wiss.m223.Ticketsystem.Model.ERole;
import ch.wiss.m223.Ticketsystem.Model.Role;
import ch.wiss.m223.Ticketsystem.Repository.RoleRepository;

@SpringBootApplication
public class TicketsystemApplication implements CommandLineRunner {

	@Autowired
	RoleRepository roleRepository;
	public static void main(String[] args) {
		SpringApplication.run(TicketsystemApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleRepository.count() == 0) {
		roleRepository.save(new Role(ERole.ROLE_USER));
		roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}
		System.out.println("Roles created");
	}
}
