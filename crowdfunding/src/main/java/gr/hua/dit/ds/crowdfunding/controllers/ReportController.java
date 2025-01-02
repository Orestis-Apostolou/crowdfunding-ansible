package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import gr.hua.dit.ds.crowdfunding.services.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {
    ReportService reportService;
    ProjectService projectService;

    public ReportController( ReportService reportService, ProjectService projectService ) {
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

    //TODO add response entity
//    @GetMapping("/{id}/all")
//    public List<Report> getProjectReports(@PathVariable int id){
//        return reportService.findByProjectID ( id );
//    }
}
