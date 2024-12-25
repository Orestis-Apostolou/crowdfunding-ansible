package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.service.ProjectService;
import gr.hua.dit.ds.crowdfunding.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    ReportService reportService;
    ProjectService projectService;

    ReportController(ReportService reportService, ProjectService projectService) {
        this.reportService = reportService;
        this.projectService = projectService;
    }

    @PostMapping("/{pid}/new")
    public void reportProject(@PathVariable int pid, @Valid @RequestBody Report report) {
        //reportService.assignReportToProject(...);
    }

    @GetMapping("/{pid}/all")
    public List<Report> getProjectReports(@PathVariable int pid){
        //projectService.getProjectById(pid).getReports();
        return null;
    }
}
