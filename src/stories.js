import { Button, OutlineButton, TextButton } from "@licenserocks/kit";
import React from "react";
import styled from "styled-components";

import MegaFlow from "./index";
import schema from "./sample.json";

export default {
  title: "MegaFlow",
};

const Wrapper = styled.div`
  width: 680px;
  margin: auto;
  padding: 16px 0;
`;

export const main = () => {
  const handleWatch = (data) => {
    console.log("data: ", data);
  };

  return (
    <Wrapper>
      <MegaFlow
        defaultValues={{
          initialSalesFees: [
            {
              disabled: true,
              feeName: "ROBA MUSIC",
              feeUser: {
                label: "ROBA Music Verlag GmbH (nft@roba.com)",
                value: 7,
              },
              feeCategory: {
                label: "Creator Rights",
                value: "creator",
              },
              feeAmountType: "PERCENTAGE",
              feeRecipientType: "USER",
              feeAmountPercentage: 15,
            },
          ],
          secondarySalesFees: [
            {
              disabled: true,
              feeName: "PMR Music",
              feeUser: {
                label: "PMR MUSIC (nft@pmr-music.com)",
                value: 8,
              },
              feeCategory: {
                label: "Recording Rights",
                value: "recording",
              },
              feeRecipientType: "USER",
              feeAmountPercentage: 7,
            },
          ],
          currencies: [
            { sign: "€", label: "EUR (€)", value: "eur" },
            { sign: "zł", label: "PLN (zł)", value: "pln" },
            { sign: "$", label: "USD ($)", value: "usd" },
            { sign: "£", label: "GBP (£)", value: "gbp" },
          ],
        }}
        onFinish={(output) => {
          console.log("output: ", output);
        }}
        renderActionButtons={(wizardData) => (
          <>
            <TextButton
              content="Save as Draft"
              color="secondary"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />

            <OutlineButton
              color="secondary"
              content="Schedule"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />
          </>
        )}
        schema={schema}
        watcher={handleWatch}
      />
    </Wrapper>
  );
};
