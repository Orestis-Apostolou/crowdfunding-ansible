package gr.hua.dit.ds.crowdfunding.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Fund {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Integer fundID;

    @Column
    private float amount;

    @Column
    private LocalDateTime dateOfTransaction;

    @Column
    private String message;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "projectID")
    private Project project;

    public Fund( float amount, LocalDateTime dateOfTransaction, String message ) {
        this.amount = amount;
        this.dateOfTransaction = dateOfTransaction;
        this.message = message;
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

    @Override
    public String toString() {
        return "Fund{" +
                "fundID=" + fundID +
                ", amount=" + amount +
                ", dateOfTransaction=" + dateOfTransaction +
                ", message='" + message + '\'' +
                '}';
    }
}
