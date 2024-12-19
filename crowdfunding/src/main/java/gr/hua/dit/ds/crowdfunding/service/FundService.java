package gr.hua.dit.ds.crowdfunding.service;

import gr.hua.dit.ds.crowdfunding.entities.Fund;
import gr.hua.dit.ds.crowdfunding.repository.FundRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundService {

    private FundRepository fundRepository;

    public FundService(FundRepository fundRepository) {
        this.fundRepository = fundRepository;
    }

    // SELECT * FROM FUNDS;
    @Transactional
    public List<Fund> getFunds(){
        return fundRepository.findAll ();
    }

    // etc...

}
