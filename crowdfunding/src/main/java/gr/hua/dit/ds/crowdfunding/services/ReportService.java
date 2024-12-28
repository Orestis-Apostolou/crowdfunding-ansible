package gr.hua.dit.ds.crowdfunding.services;

import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.repositories.ProjectRepository;
import gr.hua.dit.ds.crowdfunding.repositories.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private ReportRepository reportRepository;
    private ProjectRepository projectRepository;

    public ReportService( ReportRepository reportRepository, ProjectRepository projectRepository ) {
        this.reportRepository = reportRepository;
        this.projectRepository = projectRepository;
    }

    // SELECT * FROM REPORT;
    @Transactional
    public List<Report> getReport(){
        return reportRepository.findAll ();
    }

    // SELECT * FROM REPORT WHERE REPORTID = <reportID>;
    @Transactional
    public Optional<Report> getReportByID( Integer reportID){
        return reportRepository.findById ( reportID );
    }

    @Transactional
    public void saveReport(Report report){
        reportRepository.save ( report );
        System.out.println ("Report saved in the Database!");
    }

    @Transactional
    public boolean deleteReportByID(Integer reportID){

        if (!reportRepository.existsById ( reportID )){
            System.out.println ("Report with ID: " + reportID + " doesn't exist!");
            return false;
        }

        reportRepository.deleteById ( reportID );
        System.out.println ("Report with ID: " + reportID + " deleted!");
        return true;
    }

    // Assigning a Project to the Report Table
    @Transactional
    public boolean assignProjectToReport(Integer reportID, Project project){
        Optional<Report> report = getReportByID ( reportID );

        if (report.isEmpty ()){
            return false;
        }

        Report existingReport = report.get ();
        existingReport.setProject ( project );
        saveReport ( existingReport );

        return true;
//        System.out.println (report);
//        System.out.println (report.getProject ());
//        report.setProject ( project );
//        System.out.println (report.getProject ());
//        saveReport ( report );
    }

    @Transactional
    public Optional<List<Report>> findByProjectID(Integer projectID){
        Optional<Project> project = projectRepository.findById(projectID);

        if (project.isEmpty()) {
            return Optional.empty();
        }

        Project existingProject = project.get();
        return Optional.ofNullable(existingProject.getReports());
    }

    // Unassigned a Project to the Fund Table
//    @Transactional
//    public void unassignProjectFromReport(Integer reportID){
//        Report report = getReportByID ( reportID );
//        report.setProject ( null );
//        saveReport ( report );
//    }
}
