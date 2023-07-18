/* global MercadoPago */
import { useEffect } from "react";

const MercadoPagoIntegration = ({ preferenceId }) => {
  useEffect(() => {
    console.log("MercadoPagoIntegration component mounted");
    // Initialize the integration and configure your public key
    const mp = new MercadoPago("TEST-645670e7-2644-4177-a612-110a7b95c86a");
    // eslint-disable-next-line no-unused-vars
    const bricksBuilder = mp.bricks();

    const handleRequestAnswered = (response) => {
      // Check if the request was successful
      if (response.error) {
        console.error("Error initializing Mercado Pago wallet:", response.error);
        // Handle the error or show an error message to the user
        return;
      }

      // The wallet widget has been successfully initialized,
      // you can trigger the redirection here
      console.log("Wallet initialized successfully!");
      redirectToMercadoPago();
    };

    const redirectToMercadoPago = () => {
      // Redirect the user to the Mercado Pago payment page
      mp.bricks().open("wallet");
    };

    mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
      onRequestAnswered: handleRequestAnswered,
    });

    // Add a cleanup function to check when the component unmounts
    return () => {
      console.log("MercadoPagoIntegration component unmounted");
    };
  }, [preferenceId]);

  return null;
};

export default MercadoPagoIntegration;
