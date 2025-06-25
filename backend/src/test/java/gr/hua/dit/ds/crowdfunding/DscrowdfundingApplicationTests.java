package gr.hua.dit.ds.crowdfunding;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.hua.dit.ds.crowdfunding.payload.LoginRequest;
import gr.hua.dit.ds.crowdfunding.payload.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class DscrowdfundingApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String username = "apiuser";
    private final String password = "pass123";
    private final String email = "api@hua.gr";

    @BeforeEach
    void setupUser() throws Exception {
        SignupRequest signUp = new SignupRequest();
        signUp.setUsername(username);
        signUp.setPassword(password);
        signUp.setEmail(email);
        signUp.setFirstName("Mhtsakos");
        signUp.setLastName("Apostolakis");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signUp)));
    }

    @Test
    void contextLoads() {
    }

    @Test
    public void testSignupAndSignin() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setUsername(username);
        login.setPassword(password);

        mockMvc.perform(post("/api/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(username))
                .andExpect(jsonPath("$.accessToken").exists());
    }

    @Test
    public void testAccessSecuredEndpointWithJWT() throws Exception {
        LoginRequest login = new LoginRequest();
        login.setUsername(username);
        login.setPassword(password);

        ResultActions loginResult = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists());

        String responseBody = loginResult.andReturn().getResponse().getContentAsString();
        String token = com.jayway.jsonpath.JsonPath.read(responseBody, "$.accessToken");

		String projectJson = """
			{
				"title": "Test Project",
				"description": "This is a test crowdfunding project.",
				"goalAmount": 5000,
				"deadlineForGoal": "2026-12-31T23:59:59"
			}
		""";

		mockMvc.perform(post("/api/project/new")
				.contentType(MediaType.APPLICATION_JSON)
				.content(projectJson)
				.header("Authorization", "Bearer " + token));
			
		mockMvc.perform(get("/api/project/personal")
			.header("Authorization", "Bearer " + token))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].title").value("Test Project"))
			.andExpect(jsonPath("$[0].description").value("This is a test crowdfunding project."));
	}

	@Test
	public void testDeleteProject_AsAdmin() throws Exception {
		
		LoginRequest login = new LoginRequest();
		login.setUsername("admin");
		login.setPassword("admin");

		ResultActions loginResult = mockMvc.perform(post("/api/auth/signin")
			.contentType(MediaType.APPLICATION_JSON)
			.content(objectMapper.writeValueAsString(login)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.accessToken").exists());

		String responseBody = loginResult.andReturn().getResponse().getContentAsString();
		String token = com.jayway.jsonpath.JsonPath.read(responseBody, "$.accessToken");

		String projectJson = """
			{
			"title": "Project to Delete",
			"description": "Project for testing delete",
			"goalAmount": 1500,
			"deadlineForGoal": "2026-12-31T23:59:59"
			}
		""";

		ResultActions createProject = mockMvc.perform(post("/api/project/new")
			.contentType(MediaType.APPLICATION_JSON)
			.content(projectJson)
			.header("Authorization", "Bearer " + token))
			.andExpect(status().isOk());

		ResultActions getProjects = mockMvc.perform(get("/api/project/personal")
			.header("Authorization", "Bearer " + token))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].title").value("Project to Delete"));

		String projectsJson = getProjects.andReturn().getResponse().getContentAsString();
		Integer projectId = com.jayway.jsonpath.JsonPath.read(projectsJson, "$[0].projectID");

		mockMvc.perform(delete("/api/project/" + projectId + "/delete")
			.header("Authorization", "Bearer " + token))
			.andExpect(status().isOk())
			.andExpect(content().string("Project deleted"));
	}


}

	
