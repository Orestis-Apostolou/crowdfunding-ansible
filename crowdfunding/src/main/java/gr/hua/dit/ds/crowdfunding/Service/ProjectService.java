package gr.hua.dit.ds.crowdfunding.Service;

import gr.hua.dit.ds.crowdfunding.Entities.Project;
import gr.hua.dit.ds.crowdfunding.Repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // SELECT * FROM PROJECT WHERE PROJECTID = <projectID>;
    @Transactional
    public Project getProjectById(Integer projectID){
        return projectRepository.findById ( projectID ).get ();
    }

    @Transactional
    public void saveProject(Project project){
        projectRepository.save (project );
        System.out.println ("Project saved in the Database!");
    }

    @Transactional
    public void deleteProject(Integer projectID){

        if (!projectRepository.existsById ( projectID )){
            System.out.println ("Project with ID: " + projectID + " doesn't exist!");
            return;
        }

        projectRepository.deleteById ( projectID );
        System.out.println ("Project with ID: " + projectID + " deleted!");
    }

}
