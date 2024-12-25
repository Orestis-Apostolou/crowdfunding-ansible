package gr.hua.dit.ds.crowdfunding.Controllers;

import gr.hua.dit.ds.crowdfunding.Entities.Project;
import gr.hua.dit.ds.crowdfunding.Entities.Report;
import gr.hua.dit.ds.crowdfunding.Service.ProjectService;
import gr.hua.dit.ds.crowdfunding.Service.ReportService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    ReportService reportService;
    ProjectService projectService;

    public ReportController( ReportService reportService, ProjectService projectService ) {
        this.reportService = reportService;
        this.projectService = projectService;
    }

    // Check here reportService methods
    @PostMapping("/{pid}/new")
    public void reportProject( @PathVariable int pid, @Valid @RequestBody Report report){
        reportService.saveReport(report);

        Project project = projectService.getProjectById(pid);

        reportService.assignProjectToReport(report.getReportID(), project);
    }

    @GetMapping("/{pid}/all")
    public List<Report> getProjectReports(@PathVariable int pid){
        return reportService.findByProjectID ( pid );
    }
}
