import { atom } from "recoil";

export const statusState = atom({
  key: "statusState",
  default: "loading",
});
