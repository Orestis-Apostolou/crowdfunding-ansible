package gr.hua.dit.ds.crowdfunding.Controllers;

import gr.hua.dit.ds.crowdfunding.Entities.Fund;
import gr.hua.dit.ds.crowdfunding.Entities.Project;
import gr.hua.dit.ds.crowdfunding.Service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable int id) {
        return projectService.getProjectById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProjectById(@PathVariable int id) {

    }

    @PostMapping("/new")
    public void addNewProject(@Valid @RequestBody Project project) {

    }

    @PostMapping("/{id}/fund")
    public void addFund(@PathVariable int id, @Valid @RequestBody Fund fund) {

    }

}
