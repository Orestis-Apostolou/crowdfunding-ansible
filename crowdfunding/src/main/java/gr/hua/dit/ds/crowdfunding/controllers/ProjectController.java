package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.entities.Status;
import gr.hua.dit.ds.crowdfunding.services.FundService;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> deleteProjectById(@PathVariable int id) {
        if(projectService.deleteProject(id)) {
            return ResponseEntity.ok("Project deleted");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }
    }

    @PostMapping("/new")
    public void addNewProject(@Valid @RequestBody Project project) {
        projectService.saveProject(project);
    }

    @PostMapping("/{id}/update-status")
    public ResponseEntity<String> updateStatus(@PathVariable int id, @Valid @RequestBody Status status) {
        if(projectService.updateStatus(id, status)){
            return ResponseEntity.ok("Project status updated");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }
}
