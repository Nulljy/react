## Lottery Game
![lottery](https://github.com/Nulljy/react/assets/74478749/ebf77506-b7b5-45c3-82ba-de38fa430a56)

#  로또는 45개의 숫자중 6개를 맞춰야 1등 
 뽑기를 누를때마다 45개의 숫자를 섞은 후 6개씩 꺼내오기
  let lotto = Array(45).fill().map((v, i) => v = i+1);
  const [myLotto, setMyLotto] = useState([...lotto.sort(() => Math.random() - 0.5).slice(0, 6)]);

  function handleClick(arr) {
    let tmp = lotto.slice(0, 45).sort(() => Math.random() - 0.5).slice(0, 6);
    setMyLotto(tmp);
  }
  
# 다른 셔플 방법 
  function handleClick(arr) {
    let tmp = lotto.slice(0, 45); // 45개
    let result = [];
    for(let i=0; i<6; i++) {
      result.push(tmp.splice(Math.floor(Math.random() * tmp.length - 1), 1)[0]);
    }
    console.log(result);
    setMyLotto(result.sort((a,b) => a-b));
  }


## ver3 제로초님 강의 버전으로 하면서 느낀점
프로젝트를 하면서 느낀점은 useRef의 current의 참조가 배열안에 어떠한 것을 추가하더라도, 참조가 바뀐 것이 아니다.
timeouts.current = []; 등으로 초기화 시켜야 참조가 바뀐 것이다. 

이것이 중요한 이유는, useEffect의 의존성 배열때문이다.
이 프로젝트에서 onClick 버튼으로 인해 로또의 번호와 보너스 번호, timeouts.current의 참조를 바꿔주게 되는데, 이를 통해 
useEffect의 의존성 배열에 의거하여 componentDidUpdate와 같은 일을 한다.
*componentDidUpdate는 이전 상태와 현재 상태, 이전 속성과 현재 속성을 비교하여 필요한 동작을 수행하는 것

만약 의존성 배열이 비어있다면 componentDidMount와 동일한 동작을 수행하게 된다.

timeOut이나 interval을 실행했다면, 메모리 누수를 막기 위해서 return에서 clear을 해주어야 한다.


보너스
리액트에서의 && 사용으로 인해 ? : 를 안써도 된다. 
&&을 사용할 시에 앞의 조건이 true일 때에 &&연산자 뒤의 부분이 리턴된다.

추가보너스
useState에 prevState가 들어있는 것 같다.
setWinBalls((prevBalls) => [...prevBalls, myLotto[i]]); 로 하기 전에 
setWinBalls([...winBalls, myLotto[i]])로 하였을 때에 오류가 났었는데, 이는 훅 상태를 업데이트할 때에 이전 상태 값을 정확하게 참조하지 못했기 때문인 것 같다.
이를 바탕으로 onClick함수에서도 간단하게 setVisibleBtn((prev) => !prev);로 했다.
