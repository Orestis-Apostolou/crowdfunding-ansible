package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Fund;
import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.services.FundService;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fund")
public class FundController {
    ProjectService projectService;
    FundService fundService;

    public FundController(ProjectService projectService, FundService fundService) {
        this.projectService = projectService;
        this.fundService = fundService;
    }

    @PostMapping("/{id}/new")
    public ResponseEntity<String> addFund(@PathVariable int id, @Valid @RequestBody Fund fund) {
        fundService.saveFund(fund);
        if(projectService.getProjectById(id).isPresent()) {
            fundService.assignProjectToFund(fund.getFundID(), projectService.getProjectById(id).get());
            return ResponseEntity.ok("Fund added successfully to project");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to add fund, project not found");
        }
    }

    @GetMapping("/{id}/all")
    public ResponseEntity<List<Fund>> getProjectFunds(@PathVariable int id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(p -> ResponseEntity.ok(p.getFunds())).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
