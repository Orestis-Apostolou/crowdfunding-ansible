package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Fund;
import gr.hua.dit.ds.crowdfunding.entities.Project;
import gr.hua.dit.ds.crowdfunding.services.FundService;
import gr.hua.dit.ds.crowdfunding.services.ProjectService;
import gr.hua.dit.ds.crowdfunding.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fund")
public class FundController {
    ProjectService projectService;
    FundService fundService;

    public FundController(ProjectService projectService, FundService fundService) {
        this.projectService = projectService;
        this.fundService = fundService;
    }

    @Secured("ROLE_USER")
    @PostMapping("/{id}/new")
    public ResponseEntity<String> addFund(@PathVariable int id, @Valid @RequestBody Fund fund) {
        if(fundService.assignProjectToFund(fund, id)) {
            return ResponseEntity.ok("Fund successfully added to project");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to add fund, no ACTIVE project found");
        }
    }

    //TODO: Add isPublic to Fund entity to separate public and private donations
    //for each loop might be too slow for large data, consider having 2 lists that get organized while attaching funds to projects
    @Secured("ROLE_USER")
    @GetMapping("/{id}/all")
    public ResponseEntity<List<Fund>> getProjectFunds(@AuthenticationPrincipal UserDetailsImpl auth, @PathVariable int id) {
        Optional<Project> project = projectService.getProjectById(id);
        List<Fund> funds;

        if(project.isPresent()) {
            funds = project.get().getFunds();

            //If the user is NOT the project's creator filter out 'private' funds
            if(!auth.getUsername().equals(project.get().getOrganizer().getUsername()) ) {
                for(Fund f : funds) {
//                    if(!f.getPublic()){
//                        funds.remove(f);
//                    }
                }
            }

            return ResponseEntity.ok(funds);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
