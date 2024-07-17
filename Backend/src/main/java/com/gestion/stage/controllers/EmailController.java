package com.gestion.stage.controllers;

import com.gestion.stage.models.EmailDetails;
import com.gestion.stage.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
// Class
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
//    @PreAuthorize( "hasRole('RH')")
    @PostMapping("/api/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
                = emailService.sendSimpleMail(details);
        return status;
    }

    // Sending email with attachment
//    @PostMapping("/sendMailWithAttachment")
//    public String sendMailWithAttachment(
//            @RequestBody EmailDetails details)
//    {
//        String status
//                = emailService.sendMailWithAttachment(details);
//
//        return status;
//    }
}