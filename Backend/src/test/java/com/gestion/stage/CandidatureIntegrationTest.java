package com.gestion.stage;

import com.gestion.stage.models.Candidature;
import com.gestion.stage.models.Offres;
import com.gestion.stage.models.User;
import com.gestion.stage.repository.CandidatureRepository;
import com.gestion.stage.repository.OffresRepository;
import com.gestion.stage.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class CandidatureIntegrationTest {

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OffresRepository offresRepository;

    private User testUser;
    private Offres testOffres;

    @BeforeEach
    public void setup() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");  // Ensure email is set
        testUser.setPassword("password123");    // Ensure password is set
        userRepository.save(testUser);

        testOffres = new Offres();
        testOffres.setIntitule("testOffre");
        // set other fields as needed
        offresRepository.save(testOffres);
    }

    @Test
    public void testCreateCandidature() {
        Candidature candidature = new Candidature();
        candidature.setNivEtude("Master");
        candidature.setEtablissement("Test University");
        candidature.setSpecialite("Computer Science");
        candidature.setUser(testUser);
        candidature.setOffres(testOffres);

        candidatureRepository.save(candidature);

        List<Candidature> candidatures = candidatureRepository.findAll();
        assertThat(candidatures).hasSize(1);
        assertThat(candidatures.get(0).getNivEtude()).isEqualTo("Master");
        assertThat(candidatures.get(0).getEtablissement()).isEqualTo("Test University");
        assertThat(candidatures.get(0).getSpecialite()).isEqualTo("Computer Science");
        assertThat(candidatures.get(0).getUser()).isEqualTo(testUser);
        assertThat(candidatures.get(0).getOffres()).isEqualTo(testOffres);
    }

    @Test
    public void testFindById() {
        Candidature candidature = new Candidature();
        candidature.setNivEtude("Bachelor");
        candidature.setEtablissement("Another University");
        candidature.setSpecialite("Information Technology");
        candidature.setUser(testUser);
        candidature.setOffres(testOffres);

        candidature = candidatureRepository.save(candidature);
        Long id = candidature.getId();

        Candidature found = candidatureRepository.findById(id).orElse(null);
        assertThat(found).isNotNull();
        assertThat(found.getNivEtude()).isEqualTo("Bachelor");
        assertThat(found.getEtablissement()).isEqualTo("Another University");
        assertThat(found.getSpecialite()).isEqualTo("Information Technology");
    }
}
