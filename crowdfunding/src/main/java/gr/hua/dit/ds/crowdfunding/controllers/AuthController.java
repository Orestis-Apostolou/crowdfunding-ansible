package gr.hua.dit.ds.crowdfunding.controllers;

import gr.hua.dit.ds.crowdfunding.entities.Role;
import gr.hua.dit.ds.crowdfunding.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {
    RoleRepository roleRepository;

    public AuthController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void setup() {
        Role role_user = new Role("ROLE_USER");
        Role role_admin = new Role("ROLE_ADMIN");

        roleRepository.updateOrInsert(role_user);
        roleRepository.updateOrInsert(role_admin);
    }

}
