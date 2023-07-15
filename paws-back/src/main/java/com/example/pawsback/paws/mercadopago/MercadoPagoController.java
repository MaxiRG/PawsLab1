package com.example.pawsback.paws.mercadopago;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MercadoPagoController {
    private final MercadoPagoSevice mercadoPagoSevice;

    @Autowired
    public MercadoPagoController(MercadoPagoSevice mercadoPagoSevice) {
        this.mercadoPagoSevice = mercadoPagoSevice;
    }


    @PostMapping("/payment")
    public ResponseEntity<?> payment() throws MPException, MPApiException {
        return new ResponseEntity<>(mercadoPagoSevice.payment(), HttpStatus.OK);
    }
}
