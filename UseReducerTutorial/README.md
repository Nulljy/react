## useReducerTutorial
이 파일은 useReducerTutorial을 위한 파일입니다.

# 실습 이미지
![useReducerTutorial](https://github.com/Nulljy/react/assets/74478749/7b79b97d-e456-4f3d-8e19-68124b8fb9fe)

# 옵션 +, -, 0
+버튼을 누르면 clickHandle함수에 의해 useReducer의 countDispatch함수에 인자를 주게되고 countReducer의 action의 option과 number에 의해 값이 변하게 된다.

### 중요
```javaScript
const [count, countDispatch] = useReducer(countReducer,0);
function countReducer(oldCount, action) {
    switch(action.option) {
      case '+':
        return oldCount + action.number;
      case '-':
        return oldCount - action.number;
      case '0':
        return 0;
    } 
  }

  function clickHandle(e) {
    switch(e.target.value) {
      case '+':
        return countDispatch({option: '+', number: inputValue});
      case '-':
        return countDispatch({option: '-', number: inputValue});
      case '0':
        return countDispatch({option: '0'});
    } 
  }
  ```
  
  useReducer = 은행
  count는 장부
  countDispatch는 customer의 요구가 적힌 빌즈
  countReducer는 회계사
  0은 초기 장부
 
