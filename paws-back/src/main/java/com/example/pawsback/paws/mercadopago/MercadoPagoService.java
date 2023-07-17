package com.example.pawsback.paws.mercadopago;

import com.example.pawsback.paws.mercadopago.model.dto.CreatePreferenceDTO;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class MercadoPagoService {

    public Preference payment(CreatePreferenceDTO createPreferenceDTO) throws MPException, MPApiException {
        MercadoPagoConfig.setAccessToken("TEST-342794310847942-071517-79740f198c547f268ed0005dc68e9cf8-286531013");

        PreferenceItemRequest itemRequest =
                PreferenceItemRequest.builder()
                        .title("Donation")
                        .categoryId("donation")
                        .quantity(1)
                        .currencyId("ARS")
                        .unitPrice(new BigDecimal(createPreferenceDTO.getAmount()))
                        .build();
        List<PreferenceItemRequest> items = new ArrayList<>();
        items.add(itemRequest);
        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items).build();
        PreferenceClient client = new PreferenceClient();
        return client.create(preferenceRequest);
    }

}
