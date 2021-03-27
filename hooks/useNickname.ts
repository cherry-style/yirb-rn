import { atom, useRecoilState } from "recoil";

const nickname = atom({
  key: "nickname",
  default: `손님${Math.round(Math.random() * 999)}`,
});

export function useNickname() {
  return useRecoilState(nickname);
}
