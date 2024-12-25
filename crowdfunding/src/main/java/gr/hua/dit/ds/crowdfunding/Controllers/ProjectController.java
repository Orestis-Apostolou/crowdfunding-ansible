package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.Entities.Fund;
import gr.hua.dit.ds.crowdfunding.Entities.Project;
import gr.hua.dit.ds.crowdfunding.Service.FundService;
import gr.hua.dit.ds.crowdfunding.Service.ProjectService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Project> getProjectById(@PathVariable int id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteProjectById(@PathVariable int id) {
        projectService.deleteProject(id);
    }

    @PostMapping("/new")
    public void addNewProject(@Valid @RequestBody Project project) {
        projectService.saveProject(project);
    }
}
