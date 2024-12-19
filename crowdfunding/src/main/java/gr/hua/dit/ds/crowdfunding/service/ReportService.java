package gr.hua.dit.ds.crowdfunding.service;

import gr.hua.dit.ds.crowdfunding.entities.Report;
import gr.hua.dit.ds.crowdfunding.repository.ReportRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private ReportRepository reportRepository;

    public ReportService (ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    // SELECT * FROM REPORT;
    @Transactional
    public List<Report> getReport(){
        return reportRepository.findAll ();
    }

    // etc...

}
