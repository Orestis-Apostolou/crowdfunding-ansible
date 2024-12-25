package gr.hua.dit.ds.crowdfunding.Repository;

import gr.hua.dit.ds.crowdfunding.Entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
