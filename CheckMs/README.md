# react

### 레이아웃 ver0
![체크](https://user-images.githubusercontent.com/74478749/236879209-9099de8c-3763-4787-95da-538de3e69319.jpg)

### 레이아웃 ver1
![체크 랭킹구현](https://github.com/Nulljy/react/assets/74478749/f8e18252-0421-439c-b8a9-1d81c9c183f6)
랭킹 구현 완료

## useRef
렌더는 원하지 않지만, 값을 저장하고 싶을 때 사용
let gameTimeout을 사용한다면, 렌더될때마다 재 초기화가 되어 clearTimeOut 불가능


## 애먹었던 부분
랭킹구현에 있어서 Cannot read properties of undefined (reading 'id') 가 발생

function checkRank(his) {
    // history의 histories를 받아와서 순서대로 정렬 
    const currentHistory = his.slice(0, his.length);
    const arr = Array(currentHistory.length).fill().map((arr, i) => {
      return i;
    });

    // sort로 증가하는 i와 i+1을 비교해야함 가장 큰걸 오른쪽으로 몰아두기
    for(let i=0; i<currentHistory.length-1; i++) {
      for(let j=i+1; j<currentHistory.length; j++) {
        if(currentHistory[i].history > currentHistory[j].history) {
          let tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    const rankResult = Array(4).fill().map((el, i) => {
      return currentHistory[arr[i]];
    });
    setRank(rankResult);
  }
  
  에서 const rankResult = Array(4).fill().map((el, i) => {
      return currentHistory[arr[i]];
    }); 부분이 Array의 길이를 4로 처음부터 만들고 시작해서 history의 길이가 4보다 작을때 id를 찾아오지 못함
  최대 랭킹 길이를 4로 하고싶은 의도에서 나온 에러
  
  **해결방법 => Array(Math.min(currentHistory.length, 4))**
  
    
