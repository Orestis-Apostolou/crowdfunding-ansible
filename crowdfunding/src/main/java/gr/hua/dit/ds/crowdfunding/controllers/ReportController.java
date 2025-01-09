package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import gr.hua.dit.ds.crowdfunding.services.ReportService;
import jakarta.validation.Valid;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // Check here reportService methods
    @PostMapping("/{id}/new")
    public ResponseEntity<String> reportProject(@PathVariable int id, @Valid @RequestBody Report report){
        if(projectService.getProjectById(id).isPresent()){
            reportService.saveReport(report);
            reportService.assignProjectToReport(report.getReportID(), projectService.getProjectById(id).get());
            return ResponseEntity.ok("Report added successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
    }

    @GetMapping("/{id}/all")
    public ResponseEntity<List<Report>> getProjectReports(@PathVariable int id){
        Optional<List<Report>> reports = reportService.findByProjectID(id);

        return reports.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
}
