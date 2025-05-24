package ch.wiss.m223.Ticketsystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.m223.Ticketsystem.Model.Project;
import ch.wiss.m223.Ticketsystem.Model.User;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUsersContaining(User user);
}

