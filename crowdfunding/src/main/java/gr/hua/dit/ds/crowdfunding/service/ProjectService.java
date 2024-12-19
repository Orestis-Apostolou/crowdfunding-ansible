package gr.hua.dit.ds.crowdfunding.service;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService( ProjectRepository projectRepository ) {
        this.projectRepository = projectRepository;
    }

    // SELECT * FROM PROJECT;
    @Transactional
    public List<Project> getProjects(){
        return projectRepository.findAll ();
    }

    // etc...

    @Transactional
    public Project getProjectById(int id){
        Optional<Project> project = projectRepository.findById (id);
        return project.orElse(null);
    }
}
