### useReducer를 이용한 tictactoe 만들기
![틱택토리듀서](https://github.com/Nulljy/react/assets/74478749/0ff68b0f-df4c-4557-bf0d-bdb22e5cace6)

# useState를 이용할때와 다른점
1. dispatch 하나만 props로 넘겨준다면 case에 항목만 추가해주면 원하는 함수의 역할을 쉽게 자식에게 넘길 수 있다.
2. state의 isX에서 발생한 문제인데, useState처럼 먼저 초기화를 해주고 진행하는 것이 아니라 동시 진행이다보니 초기화 전이라서 isX ? 'X' : 'O' 같은 선언이 불가능했다. 
  Winner check 함수를 안에 넣어주고 winner가 이미 존재할 때에 return 하는 것도 game의 참조가 불가능해져서 오류가 발생했다. => td에 winner props를 넘겨줘서 winner가 이미 존재한다면 return 으로 해결
  
# 다음은 무엇을 배워야할까?
immer라는 것을 사용한다면 useReducer를 사용할 때 더 편하게 사용이 가능하다고 한다.
