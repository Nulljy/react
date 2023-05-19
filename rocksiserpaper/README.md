## 가위바위보 게임 만들기
![가위바위보](https://github.com/Nulljy/react/assets/74478749/350b9892-556f-455b-8855-6a2680a63aac)

# ver2 컴포넌트형 
![가위바위보 ver2](https://github.com/Nulljy/react/assets/74478749/4fcc83e7-24fa-4b8f-bfcb-d504478bf2f9)

추가사항: box-shadow
  useCallback은 콜백 함수를 메모이제이션하여 동일한 함수 인스턴스를 재사용하는데 사용된다.
  useEffect의 의존성 배열은 해당 의존성에 따라 useEffect의 실행 시기를 결정한다.
  useCallback의 메모이제이션은 처음 렌더링할 때만 생성되고, 이후의 렌더링에서는 동일한  
  함수 인스턴스를 사용한다.

  /**아래의 useCallback과 useEffect에서는 useEffect가 첫 컴포넌트 렌더시에 실행이 되고 
   * 그로 인해 changeImg가 실행되며 useCallback의 실행을 통해 메모이제이션을 하게 되고 
   * changeImg의 의존성 배열에 포함된 imgCoord의 참조가 바뀌지 않는다면 렌더시에 동일한     함수를 사용하게 되어 불필요한 렌더를 줄이게 된다. 하지만 밑의 함수에서는 매번 상태를 바꾸기 때문에 useEffect의 changeImg가 의존성 배열에 포함된 것을 충족하게 되어 계속 돌아간다.
   * 
   * 지금의 의문점: handleClick에서의 changeImg 실행이 useEffect에 영향을 주지 않는가?
   * 
   * canClick 상태를 변경하고, clearInterval을 사용하여 이전에 실행 중이던 interval을 멈춥니다. 그리고 일정 시간이 지난 후에 다시 setCanClick 함수를 사용하여 canClick 상태를 변경하고, 새로운 interval을 설정하여 changeImg 함수를 주기적으로 실행합니다. 라고 한다.
  */
