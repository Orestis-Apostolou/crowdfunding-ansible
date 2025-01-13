package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import gr.hua.dit.ds.crowdfunding.services.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/report")
public class ReportController {
    ReportService reportService;
    ProjectService projectService;

    public ReportController(ReportService reportService, ProjectService projectService) {
        this.reportService = reportService;
        this.projectService = projectService;
    }

    //TODO: make method work like FundController.addFund()
    @Secured("ROLE_USER")
    @PostMapping("/{id}/new")
    public ResponseEntity<String> reportProject(@PathVariable int id, @Valid @RequestBody Report report){
        Optional<Project> project = projectService.getProjectById(id);

        //Set default value for field without @JsonIgnore
        report.setDateOfReport(LocalDateTime.now());

        if(project.isPresent()){
            reportService.saveReport(report);
            reportService.assignProjectToReport(report.getReportID(), project.get());
            return ResponseEntity.ok("Report added successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/{id}/all")
    public ResponseEntity<List<Report>> getProjectReports(@PathVariable int id){
        Optional<List<Report>> reports = reportService.findByProjectID(id);
        return reports.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
}
