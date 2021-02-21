import { useEffect, useState } from "react";
import { useRecoilState, RecoilState, SetterOrUpdater } from "recoil";

const useRecoilInterval = <T>(
  recoilState: RecoilState<T>,
  callback: (setState: SetterOrUpdater<T>) => void,
  interval?: number
): [T, React.Dispatch<React.SetStateAction<number | false>>] => {
  const [state, setState] = useRecoilState(recoilState);
  const [intervalTime, setIntervalTime] = useState<number | false>(
    interval || false
  );
  useEffect(() => {
    if (intervalTime) {
      const interval = setInterval(() => callback(setState), intervalTime);
      return () => clearInterval(interval);
    }
  }, [intervalTime]);
  return [state, setIntervalTime];
};

export default useRecoilInterval;
