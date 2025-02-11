"use client";

import { transferSEIToken } from "@/functions/transferfunction";
import { decimalToBigInt } from "@/game/src/utils/BigIntDecimalConversions";
import React from "react";
import { createWalletClient, custom } from "viem";
import { seiTestnet } from "viem/chains";
import { string } from "zod";

const page = async () => {
  return <div>page</div>;
};

export default page;
