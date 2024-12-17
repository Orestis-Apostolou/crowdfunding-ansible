package gr.hua.dit.ds.crowdfunding.service;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;

    public ProjectService( ProjectRepository projectRepository ) {
        this.projectRepository = projectRepository;
    }

    // select * from project;
    @Transactional
    public List<Project> getProjects(){
        return projectRepository.findAll ();
    }

    // Further discussing to create the methods for the funds

}
