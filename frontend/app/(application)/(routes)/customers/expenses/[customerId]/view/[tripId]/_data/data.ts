import { Banknote, Landmark, Nfc, Wallet } from "lucide-react";

export const modes = [
  {
    label: "Cash",
    value: "CASH",
    icon: Wallet
  },
  {
    label: "Cheque",
    value: "CHEQUE",
    icon: Banknote
  },
  {
    label: "Bank Transfer",
    value: "BANK_TRANSFER",
    icon: Landmark
  },
  {
    label: "Online Payment",
    value: "ONLINE_PAYMENT",
    icon: Nfc
  }
]