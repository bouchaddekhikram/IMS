package com.gestion.stage.controllers;
import com.gestion.stage.models.Candidature;
import com.gestion.stage.models.EmailDetails;
import com.gestion.stage.models.Offres;
import com.gestion.stage.models.User;
import com.gestion.stage.security.services.UserDetailsServiceImpl;
import com.gestion.stage.service.CandidatureServiceImp;
import com.gestion.stage.service.EmailServiceImp;
import com.gestion.stage.service.OffresServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
    @RequestMapping("/api/Candidature")
    public class CandidatureController {
        @Autowired
        private CandidatureServiceImp  candidatureServiceImp ;

        @Autowired
        private UserDetailsServiceImpl userDetailsServiceImpl;
        @Autowired
        private OffresServiceImp offresServiceImp;

         @Autowired
         private EmailServiceImp emailService;

@PostMapping("/save/{idST}/{idOff}")
    public ResponseEntity<String> saveCandidature(@RequestBody Candidature candidature, @PathVariable Long idST, @PathVariable Long idOff) {
        User user = userDetailsServiceImpl.getUserByID(idST);
        Offres offre = offresServiceImp.getOffreByID(idOff);

        // Vérifier si l'utilisateur a déjà postulé pour cette offre
        boolean alreadyApplied = candidatureServiceImp.existsByUserAndOffre(user, offre);
        if (alreadyApplied) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Vous avez déjà postulé pour cette offre.");
        }

        candidature.setUser(user);
        candidature.setOffres(offre);
        Candidature savedCandidature = candidatureServiceImp.createCandidature(candidature);

        String MsgBody = "Application Submitted for Offre : " + offre.getIntitule();
        String Subject = "Dear " + user.getUsername() + ",\n\n" +
                "Thank you for submitting your application for the position of " + offre.getIntitule() + " at our company.\n\n" +
                "We have received your application and it is currently being reviewed by our hiring team. " +
                "Please note that due to the high volume of applications we receive, this process may take some time.\n\n" +
                "Rest assured that we will carefully consider your qualifications and experience. " +
                "If your profile matches our requirements, we will reach out to you to discuss the next steps in the recruitment process.\n\n" +
                "In the meantime, if you have any questions or need further assistance, feel free to contact us.\n\n" +
                "Thank you once again for your interest in joining our team.\n\n" +
                "Best regards,\n" +
                "Ms. Clare Ayoub\n" +
                "DRH\n" +
                "Mike&San Company";

        EmailDetails emailDetails = new EmailDetails(user.getEmail(), Subject, MsgBody);
        emailService.sendSimpleMail(emailDetails);

        return ResponseEntity.status(HttpStatus.CREATED).body("Candidature soumise avec succès.");
    }

    @GetMapping("/all")
    public List<Candidature> getAllCandidature() {
        return candidatureServiceImp.getAllCandidatures();
    }

    @GetMapping("/getone/{id}")
    public Candidature getoneCandidature(@PathVariable Long id) {
        return candidatureServiceImp.getCandidatureByID(id);
    }

    @PutMapping("/update/{id}")
    public Candidature updateCandidature(@PathVariable Long id, @RequestBody Candidature candidature) {
        Candidature C1 = candidatureServiceImp.getCandidatureByID(id);
        if (C1 != null) {
            candidature.setId(id);
            return candidatureServiceImp.updateCandidatureByID(candidature);
        } else {
            throw new RuntimeException("Failed to update! Candidature not found with ID: " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCandidature(@PathVariable("id") long id) {
        try {
            candidatureServiceImp.deleteCandidature(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/accept/{idCandidature}")
    public ResponseEntity<String> acceptCandidature(@PathVariable Long idCandidature) {
        Candidature candidature = candidatureServiceImp.getCandidatureById(idCandidature);
        if (candidature == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidature non trouvée.");
        }


        candidature.setEtatCandidature("acceptée");
        candidatureServiceImp.createCandidature(candidature);



        Offres offre = candidature.getOffres();
        offresServiceImp.updateEtatOffre(offre);


        User user = candidature.getUser();

        String  subject  = "Condidature Accepté";
        String body = "Cher " + user.getUsername() + "Votre candidature pour le poste de " + offre.getIntitule()
                + ",\n\n" +
                "Nous avons le plaisir de vous informer que votre candidature pour le poste de " + offre.getIntitule() + " a été acceptée.\n\n" +
                "Nous vous contacterons bientôt avec plus de détails.\n\n" +
                "Cordialement,\n" +
                "L'équipe de recrutement de WAJ&IK Company";

        EmailDetails emailDetails = new EmailDetails(user.getEmail(), body, subject);
        emailService.sendSimpleMail(emailDetails);

        return ResponseEntity.status(HttpStatus.OK).body("Candidature acceptée et email envoyé.");
    }


    @PostMapping("/refuse/{idCandidature}")
    public ResponseEntity<String> refuseCandidature(@PathVariable Long idCandidature) {
        Candidature candidature = candidatureServiceImp.getCandidatureById(idCandidature);
        if (candidature == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidature non trouvée.");
        }

        candidature.setEtatCandidature("refusée");
        candidatureServiceImp.createCandidature(candidature);

        User user = candidature.getUser();

        Offres offre = candidature.getOffres();
        offresServiceImp.updateEtatOffre(offre);



        String subject  = "Condidature Rejeté";
        String  body= "Cher " + user.getUsername() + "Votre candidature pour le poste de " + offre.getIntitule()
       + ",\n\n" +
                "Nous regrettons de vous informer que votre candidature pour le poste de " + offre.getIntitule() + " n'a pas été retenue.\n\n" +
                "Nous vous remercions pour votre intérêt envers notre entreprise et nous vous souhaitons bonne chance dans vos futures recherches.\n\n" +
                "Cordialement,\n" +
                "L'équipe de recrutement de WAJ&IK Company";

        EmailDetails emailDetails = new EmailDetails(user.getEmail(), body, subject);
        emailService.sendSimpleMail(emailDetails);

        return ResponseEntity.status(HttpStatus.OK).body("Candidature refusée et email envoyé.");
    }
}

//            @PreAuthorize( "hasRole('RH')")
//        @PostMapping("/save/{idST}/{idOff}")
//        public Candidature saveCandidateur(@RequestBody Candidature candidature, @PathVariable Long idST, @PathVariable Long idOff) {
//            User m1= userDetailsServiceImpl.getUserByID(idST);
//            Offres m2 =offresServiceImp.getOffreByID(idOff);
//            candidature.setUser(m1);
//            candidature.setOffres(m2);
//            return candidatureServiceImp.createCandidature(candidature);
//        }
//        @PostMapping("/save/{idST}/{idOff}")
//        public Candidature saveCandidateur(@RequestBody Candidature candidature, @PathVariable Long idST, @PathVariable Long idOff) {
//            User m1= userDetailsServiceImpl.getUserByID(idST);
//            Offres m2 =offresServiceImp.getOffreByID(idOff);
//            candidature.setUser(m1);
//            candidature.setOffres(m2);
//            Candidature savedCandidature = candidatureServiceImp.createCandidature(candidature);
//            // Send email notification to the candidate
//            String candidateEmail = m1.getEmail();
//            String offerName = m2.getIntitule();
//            sendEmailNotification(candidateEmail, offerName);
//            return savedCandidature;
//        }
//    private void sendEmailNotification(String recipientEmail, String offerName) {
//
//        EmailDetails emailDetails = new EmailDetails();
//        emailDetails.setRecipient(recipientEmail);
//        emailDetails.setSubject("Candidature Confirmation");
//        emailDetails.setMsgBody("Dear candidate,\n\nYou have successfully submitted your candidature for the offer: " + offerName + ".\n\nBest regards,\nThe Management Team");
//        emailService.sendSimpleMail(emailDetails);
//    }

    //    @PreAuthorize( "hasRole('RH')")
    
