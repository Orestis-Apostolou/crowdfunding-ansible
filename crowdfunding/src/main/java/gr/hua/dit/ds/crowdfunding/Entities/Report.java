package gr.hua.dit.ds.crowdfunding.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "projectID")
    @JsonIgnore
    private Project project;

    public Report( String title, String description, LocalDateTime dateOfReport, Project project ) {
        this.title = title;
        this.description = description;
        this.dateOfReport = dateOfReport;
        this.project = project;
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

    public Project getProject() {
        return project;
    }

    public void setProject( Project project ) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "Report{" +
                "reportID=" + reportID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dateOfReport=" + dateOfReport +
                ", project=" + project +
                '}';
    }
}
