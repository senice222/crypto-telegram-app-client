import btcIcon from "@/assets/images/blockchains/btc.png";
import usdtIcon from "@/assets/images/blockchains/usdt.png";
import solanaIcon from "@/assets/images/blockchains/sol.png";
import ethIcon from "@/assets/images/blockchains/eth.png";
import litecoinIcon from "@/assets/images/blockchains/ltc.png";
import bnbIcon from "@/assets/images/blockchains/bnb.png";
import { TBlockchains } from "@/types/common";

type BlockchainIconMap = {
  [key in TBlockchains]: string;
};

export const blockchainIcons: BlockchainIconMap = {
  BTC: btcIcon.src,
  ETH: ethIcon.src,
  USDT: usdtIcon.src,
  LTC: litecoinIcon.src,
  SOL: solanaIcon.src,
  BNB: bnbIcon.src,
};
