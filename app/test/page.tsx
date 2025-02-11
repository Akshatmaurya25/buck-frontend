"use client";

import { transferSEIToken } from "@/functions/transferfunction";
import { decimalToBigInt } from "@/game/src/utils/BigIntDecimalConversions";
import React from "react";
import { createWalletClient, custom } from "viem";
import { seiTestnet } from "viem/chains";
import { string } from "zod";

const page = async () => {
  transferSEIToken("0xE0cA75B7A935033D52dE30ac525486692578a74a", 20000000000n);
  return <div>page</div>;
};

export default page;
