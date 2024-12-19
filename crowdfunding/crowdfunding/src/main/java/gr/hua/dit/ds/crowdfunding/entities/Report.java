package gr.hua.dit.ds.crowdfunding.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer reportID;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private LocalDateTime dateOfReport;

    public Report( String title, String description, LocalDateTime dateOfReport ) {
        this.title = title;
        this.description = description;
        this.dateOfReport = dateOfReport;
    }

    public Report(){
    }

    public Integer getReportID() {
        return reportID;
    }

    public void setReportID( Integer reportID ) {
        this.reportID = reportID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle( String title ) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription( String description ) {
        this.description = description;
    }

    public LocalDateTime getDateOfReport() {
        return dateOfReport;
    }

    public void setDateOfReport( LocalDateTime dateOfReport ) {
        this.dateOfReport = dateOfReport;
    }

    @Override
    public String toString() {
        return "Report{" +
                "reportID=" + reportID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dateOfReport=" + dateOfReport +
                '}';
    }
}
