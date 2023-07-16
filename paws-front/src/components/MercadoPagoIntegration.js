/* global MercadoPago */
import { useEffect } from "react";

const MercadoPagoIntegration = ({ preferenceId }) => {
  useEffect(() => {
    console.log("MercadoPagoIntegration component mounted");
    // Initialize the integration and configure your public key
    const mp = new MercadoPago("TEST-6e3e681b-38ed-477c-9c1a-383cec021526");
    const bricksBuilder = mp.bricks();

    mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });

    // Add a cleanup function to check when the component unmounts
    return () => {
      console.log("MercadoPagoIntegration component unmounted");
    };
  }, [preferenceId]);

  return null;
};


export default MercadoPagoIntegration;
