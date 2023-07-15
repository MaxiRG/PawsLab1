package com.example.pawsback.paws.mercadopago;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.pawsback.paws.mercadopago.MercadoPagoService;


@Controller
public class MercadoPagoController {
    private final MercadoPagoService mercadoPagoService;

    @Autowired
    public MercadoPagoController(MercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }


    @PostMapping("/payment")
    public ResponseEntity<?> payment() throws MPException, MPApiException {
        return new ResponseEntity<>(mercadoPagoService.payment(), HttpStatus.OK);
    }
    //meto esta anotacion para que me deje subirlo xd
}
