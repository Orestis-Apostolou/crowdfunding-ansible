package gr.hua.dit.ds.crowdfunding.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
public class Fund {

    // ------------------- Attributes ------------------------------

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer fundID;

    @Column
    private float amount;

    @Column
    private LocalDateTime dateOfTransaction = LocalDateTime.now ();

    @Column(length = 150)
    @Size(max = 150)
    private String message;

    // ------------------- Relationships ------------------------------

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "userID")
    private User user;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "projectID")
    private Project project;

    // ------------------- Methods -----------------------------------

    public Fund( float amount, LocalDateTime dateOfTransaction, String message, Project project ) {
        this.amount = amount;
        this.dateOfTransaction = dateOfTransaction;
        this.message = message;
        this.project = project;
    }

    public Fund( ) {
    }

    public Integer getFundID() {
        return fundID;
    }

    public void setFundID( Integer fundID ) {
        this.fundID = fundID;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount( float amount ) {
        this.amount = amount;
    }

    public LocalDateTime getDateOfTransaction() {
        return dateOfTransaction;
    }

    public void setDateOfTransaction( LocalDateTime dateOfTransaction ) {
        this.dateOfTransaction = dateOfTransaction;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage( String message ) {
        this.message = message;
    }

    public Project getProject() {
        return project;
    }

    public void setProject( Project project ) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser( User user ) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Fund{" +
                "fundID=" + fundID +
                ", amount=" + amount +
                ", dateOfTransaction=" + dateOfTransaction +
                ", message='" + message + '\'' +
                ", project=" + project.getProjectID () +
                '}';
    }
}
