package gr.hua.dit.ds.crowdfunding.Controllers;

import gr.hua.dit.ds.crowdfunding.Entities.Report;
import gr.hua.dit.ds.crowdfunding.Service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    ReportService reportService;

    ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/{pid}/new")
    public void reportProject(@PathVariable int pid){

    }

    @GetMapping("/{pid}/all")
    public List<Report> getProjectReports(@PathVariable int pid){
        //return reportService.findByProject(pid);
        return null;
    }
}
