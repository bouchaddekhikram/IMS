package com.gestion.stage.controllers;


import com.gestion.stage.models.Offres;
        import com.gestion.stage.models.User;
        import com.gestion.stage.security.services.UserDetailsServiceImpl;
        import com.gestion.stage.service.OffresServiceImp;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.access.prepost.PreAuthorize;
        import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/Offre")
public class OffresController {
    @Autowired
    private OffresServiceImp offresServiceImp;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;


    //    @PreAuthorize( "hasRole('RH')")
    @PostMapping("/save/{idRH}")
    public Offres saveOffre(@RequestBody Offres offres, @PathVariable Long idRH) {
        User m1= userDetailsServiceImpl.getUserByID(idRH);
        offres.setUser(m1);
        return offresServiceImp.createOffre(offres);
    }

    // @PreAuthorize( "hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/all")
    public List<Offres> getAllOffres() {
        return offresServiceImp.getAllOffres();
    }

    // @PreAuthorize( "hasRole('ADMIN') or hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @GetMapping("/getone/{id}")
    public Offres getoneOffre(@PathVariable Long id) {
        return offresServiceImp.getOffreByID(id);
    }

    //  @PreAuthorize( "hasRole('ADMIN') or hasRole('MANAGER')")
    @PutMapping("/update/{id}")
    public Offres updateOffre(@PathVariable Long id, @RequestBody Offres offres) {
        Offres o1 = offresServiceImp.getOffreByID(id);
        if (o1 != null) {
            offres.setId(id);
            return offresServiceImp.updateOffreByID(offres);
        } else {
            throw new RuntimeException("Failed to update! Offre not found with ID: " + id);
        }
    }
    // @PreAuthorize( "hasRole('EMPLOYEE')")
//    @PutMapping("/update/Status/{id}")
//    public Offres updateOffreStatus(@PathVariable Long id, @RequestBody String status) {
//        Offres offres = offresServiceImp.getOffreByID(id);
//
//        if (offres != null) {
//            //    offres.setStatus(status);
//            return offresServiceImp.updateOffreByID(offres);
//        } else {
//            throw new RuntimeException("Tache not found with ID: " + id);
//        }
//    }




//    @PreAuthorize( "hasRole('ADMIN') or hasRole('MANAGER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteOffre(@PathVariable("id") long id) {
        try {
            offresServiceImp.deleteOffre(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }





}


