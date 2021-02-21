import React, { useState } from "react";
import { atom, RecoilRoot } from "recoil";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useRecoilInterval from ".";

const testNumber = atom({
  key: "hoge",
  default: 1,
});

const TestComponent = () => {
  const [state, setIntervalTime] = useRecoilInterval(
    testNumber,
    (setState) => {
      setState((state) => state + 1);
    },
    1000
  );

  const stop = () => {
    setIntervalTime(false);
  };

  const setTime = () => {
    setIntervalTime(2000)
  }

  return (
    <div>
      <div>{state}</div>
      <button onClick={stop}>stop</button>
      <button onClick={setTime}>setTime</button>
    </div>
  );
};

describe("useRecoilInterval", () => {
  it("set interval", () => {
    jest.useFakeTimers();
    const { getByText } = render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );
    expect(getByText(1)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(2)).toBeInTheDocument();
  });
  it("unset interval", () => {
    jest.useFakeTimers();
    const { getByText } = render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );
    expect(getByText(1)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(2)).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByText("stop"));
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(2)).toBeInTheDocument();
  });

  it('reset interval', () => {
    jest.useFakeTimers();
    const { getByText } = render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );
    expect(getByText(1)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(2)).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByText("setTime"));
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(2)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(3)).toBeInTheDocument();
  });
});
