package com.gestion.stage.service;

// Importing required classes
import com.gestion.stage.models.EmailDetails;


// Interface
public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
//    String sendMailWithAttachment(EmailDetails details);
}