package gr.hua.dit.ds.crowdfunding.repository;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>{
}
