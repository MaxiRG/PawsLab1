package com.example.pawsback.paws.mail;

import com.example.pawsback.paws.mail.model.MailType;
import com.example.pawsback.paws.mail.model.MailConfig;
import com.example.pawsback.paws.post.model.exceptions.NoAuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;


@Service
public class MailSenderService {

    @Autowired
    private MailConfig mailSender;

    public SimpleMailMessage sendMail(MailType type, String mailReciever) throws NoAuthorizationException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("pawsapplicationtest@gmail.com");
        mail.setSubject("Notificacion de Paws");
        mail.setTo(mailReciever);
        if (type == MailType.CREATEREQUEST){
            mail.setText("Su refugio tiene una nueva solicitud de adopcion.\nEntre en Paws para obtener mas informacion.");
        }
        else if(type == MailType.ACCEPTEDREQUEST){
            mail.setText("Se ha aceptado una solicitud de adopcion que enviaste.\nEntre en Paws para obtener mas informacion.");
        }
        else if(type == MailType.REJECTEDREQUEST){
            mail.setText("Se ha rechazado una solicitud de adopcion que enviaste.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.CREATEREVIEW){
            mail.setText("Se realizo una nueva valoracion de su refugio.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.CREATECOMMENT){
            mail.setText("Se ha realizado un comentario en una publicacion suya.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.CREATEANSWER){
            mail.setText("Recibiste una respuesta en uno de tus comentarios.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.CREATEPROFILECOMMENT){
            mail.setText("Recibiste un comentario nuevo en tu perfil.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.FAVOURITERECIEVECOMMENT){
            mail.setText("Se ha realizado un comentario en una publicacion que tiene en favoritos.\nEntre en Paws para obtener mas informacion.");
        }else if(type == MailType.POSTNOTAVAILABLE){
            mail.setText("Una publicacion que tenia en favoritos ya no se encuentra disponible.\nEntre en Paws para obtener mas informacion.");
        }
        else
            throw new NoAuthorizationException("tipo de mail no autorizado");
        mailSender.javaMailSender().send(mail);
        return mail;
    }
}
