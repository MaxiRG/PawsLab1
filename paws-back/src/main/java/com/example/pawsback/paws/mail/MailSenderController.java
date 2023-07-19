package com.example.pawsback.paws.mail;

import com.example.pawsback.paws.mail.model.MailType;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MailSenderController {
    final private MailSenderService mailSenderService;

    @Autowired
    public MailSenderController(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMail(MailType mailType, String email) throws NoAuthorizationException {
        return new ResponseEntity<>(mailSenderService.sendMail(mailType, email), HttpStatus.OK);
    }
}
