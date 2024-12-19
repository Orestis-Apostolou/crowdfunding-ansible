package gr.hua.dit.ds.crowdfunding.repository;

import gr.hua.dit.ds.crowdfunding.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
