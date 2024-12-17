package gr.hua.dit.ds.crowdfunding.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int projectID;

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

    public Project( String title, String description, String status, float goalAmount, float currentAmount, LocalDateTime dateOfCreation, LocalDateTime deadlineForGoal ) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.goalAmount = goalAmount;
        this.currentAmount = currentAmount;
        this.dateOfCreation = dateOfCreation;
        this.deadlineForGoal = deadlineForGoal;
    }

    public Project(){

    }

    public int getProjectID() {
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
                '}';
    }
}
