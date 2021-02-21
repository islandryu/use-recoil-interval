# use-recoil-interval

## install
```javascript
npm install use-recoil-interval
```

## Usage
```javascript
const Number = atom({
  key: "hoge",
  default: 1,
});

const TestComponent = () => {
  const [state, setIntervalTime] = useRecoilInterval(
    Number,
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

```

