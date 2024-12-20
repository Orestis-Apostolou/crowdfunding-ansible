package gr.hua.dit.ds.crowdfunding.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class  Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer projectID;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String status;

    @Column
    private float goalAmount;

    @Column
    private float currentAmount;

    @Column
    private LocalDateTime dateOfCreation;

    @Column
    private LocalDateTime deadlineForGoal;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Fund> funds;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Report> reports;

    public Project( String title, String description, String status, float goalAmount, float currentAmount, LocalDateTime dateOfCreation, LocalDateTime deadlineForGoal, List<Fund> funds, List<Report> reports ) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.goalAmount = goalAmount;
        this.currentAmount = currentAmount;
        this.dateOfCreation = dateOfCreation;
        this.deadlineForGoal = deadlineForGoal;
        this.funds = funds;
        this.reports = reports;
    }


    public Project(){

    }

    public Integer getProjectID() {
        return projectID;
    }

    public void setProjectID( int projectID ) {
        this.projectID = projectID;
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

    public String getStatus() {
        return status;
    }

    public void setStatus( String status ) {
        this.status = status;
    }

    public float getGoalAmount() {
        return goalAmount;
    }

    public void setGoalAmount( float goalAmount ) {
        this.goalAmount = goalAmount;
    }

    public float getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount( float currentAmount ) {
        this.currentAmount = currentAmount;
    }

    public LocalDateTime getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation( LocalDateTime dateOfCreation ) {
        this.dateOfCreation = dateOfCreation;
    }

    public LocalDateTime getDeadlineForGoal() {
        return deadlineForGoal;
    }

    public void setDeadlineForGoal( LocalDateTime deadlineForGoal ) {
        this.deadlineForGoal = deadlineForGoal;
    }

    public void setProjectID( Integer projectID ) {
        this.projectID = projectID;
    }

    public List<Fund> getFunds() {
        return funds;
    }

    public void setFunds( List<Fund> funds ) {
        this.funds = funds;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports( List<Report> reports ) {
        this.reports = reports;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectID=" + projectID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", goalAmount=" + goalAmount +
                ", currentAmount=" + currentAmount +
                ", dateOfCreation=" + dateOfCreation +
                ", deadlineForGoal=" + deadlineForGoal +
                ", funds=" + funds +
                ", reports=" + reports +
                '}';
    }
}
