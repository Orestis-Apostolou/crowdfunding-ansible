package gr.hua.dit.ds.crowdfunding.Service;

import gr.hua.dit.ds.crowdfunding.Entities.Project;
import gr.hua.dit.ds.crowdfunding.Entities.Report;
import gr.hua.dit.ds.crowdfunding.Repository.ProjectRepository;
import gr.hua.dit.ds.crowdfunding.Repository.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Report getReportByID(Integer reportID){
        return reportRepository.findById ( reportID ).get ();
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
    public void assignProjectToReport(Integer reportID, Project project){
        Report report = getReportByID ( reportID );
//        System.out.println (report);
//        System.out.println (report.getProject ());
        report.setProject ( project );
//        System.out.println (report.getProject ());
        saveReport ( report );
    }

    // Unassigned a Project to the Fund Table
    @Transactional
    public void unassignProjectFromReport(Integer reportID){
        Report report = getReportByID ( reportID );
        report.setProject ( null );
        saveReport ( report );
    }

    @Transactional
    public List<Report> findByProjectID(Integer projectID){
        Project project = projectRepository.findById ( projectID ).get ();
        return project.getReports ();
    }

}
