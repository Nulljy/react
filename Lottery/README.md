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
