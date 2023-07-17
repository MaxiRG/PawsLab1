package com.example.pawsback.paws.mercadopago;

import com.example.pawsback.paws.mercadopago.model.dto.CreatePreferenceDTO;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.pawsback.paws.mercadopago.MercadoPagoService;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class MercadoPagoController {
    private final MercadoPagoService mercadoPagoService;

    @Autowired
    public MercadoPagoController(MercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }


    @PostMapping(value = "/create_preference", consumes = {"application/json"})
    public ResponseEntity<?> payment(@RequestBody CreatePreferenceDTO createPreferenceDTO) throws MPException, MPApiException {
        try{
        return new ResponseEntity<>(mercadoPagoService.payment(createPreferenceDTO), HttpStatus.OK);
        }
        catch (MPApiException ex) {
            System.out.printf(
                    "MercadoPago Error. Status: %s, Content: %s%n",
                    ex.getApiResponse().getStatusCode(), ex.getApiResponse().getContent());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (MPException ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
