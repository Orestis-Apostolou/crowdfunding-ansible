package gr.hua.dit.ds.crowdfunding.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer reportID;

    @Column(length = 60)
    @Size(max = 60)
    private String title;

    @Column(length = 200)
    @Size(max = 200)
    private String description;

    @Column
    private LocalDateTime dateOfReport = LocalDateTime.now ();

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "projectID")
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
                ", project=" + project.getProjectID () +
                '}';
    }
}
