import { RecoilState, SetterOrUpdater } from "recoil";

export default function useRecoilInterval <T>(
  recoilState: RecoilState<T>,
  callback: (setState: SetterOrUpdater<T>) => void,
  interval?: number
): [T, React.Dispatch<React.SetStateAction<number | false>>]; 
