package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Fund;
import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.service.FundService;
import gr.hua.dit.ds.crowdfunding.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    ProjectService projectService;
    FundService fundService;

    public ProjectController(ProjectService projectService, FundService fundService) {
        this.projectService = projectService;
        this.fundService = fundService;
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable int id) {
        return projectService.getProjectById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable int id) {
        //projectService.deleteProjectById(id);
    }

    @PostMapping("/new")
    public void addNewProject(@Valid @RequestBody Project project) {
        //projectService.addProject(project);
    }

    @PostMapping("/{id}/fund")
    public void fundProject(@PathVariable int id, @Valid @RequestBody Fund fund) {
        
    }


}
