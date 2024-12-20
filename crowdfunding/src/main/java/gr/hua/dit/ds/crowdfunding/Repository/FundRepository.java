package gr.hua.dit.ds.crowdfunding.Repository;

import gr.hua.dit.ds.crowdfunding.Entities.Fund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundRepository extends JpaRepository<Fund, Integer> {
}
