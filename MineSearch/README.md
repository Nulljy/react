## 지뢰찾기 게임 ver0 => 이차원배열 말고 일차원 배열으로 풀어서 Table에서 쪼개서 cell에 인덱스 부여 => 마인의 갯수 undefined 발생

# 구현해야할 것
1. 몇개의 열과 셀, 마인 갯수가 필요한지 적을 폼과 submit 버튼

2. 클릭 시에 해당 셀이 마인이 아니라면 밸류를 변경하여 오픈된 칸으로 만들어주기
2-1. 오른쪽 한번 클릭시에 지뢰 위치 확정 깃발 꽂기, 두번 클릭 시에 물음표

3. 클릭한 칸 주변에 지뢰가 하나도 존재하지 않는다면 인접한 칸들이 자동으로 열리게 해주기

4. 첫 클릭에는 지뢰를 피하게 해주기. 만약 클릭한 칸에 지뢰가 있었다면, 마인의 위치 재조정해주고 열리게 해주기 => game 재생성, 재 클릭 해주기


# 주의점
useContext를 사용할 때에는 값을 미리 캐싱해둬야 리렌더를 줄일 수 있다.


# 현재 주변 마인 갯수 undefined 버그 존재
아래가 있다는것은 인지하는데, around 배열에 undefined가 들어간다.
```JavaScript
if(bottom) {
                console.log('아래: ' + bottom);
                around = around.concat(newMap[action.opendCell + state.data.cell]);
            }
```
가 오른쪽 맨끝부분에서 왜 0, 1 열에서 undefined를 제출하는지 알아보기


## 지뢰찾기 게임 ver1
![지뢰찾기](https://github.com/Nulljy/react/assets/74478749/23596d27-3a70-4e60-9a04-3e259a2ed209)

# 구현해야할 것
1. 몇개의 열과 셀, 마인 갯수가 필요한지 적을 폼과 submit 버튼

2. 클릭 시에 해당 셀이 마인이 아니라면 밸류를 변경하여 오픈된 칸으로 만들어주기
2-1. 오른쪽 한번 클릭시에 지뢰 위치 확정 깃발 꽂기, 두번 클릭 시에 물음표

3. 클릭한 칸 주변에 지뢰가 하나도 존재하지 않는다면 인접한 칸들이 자동으로 열리게 해주기

4. 첫 클릭에는 지뢰를 피하게 해주기. 만약 클릭한 칸에 지뢰가 있었다면, 마인의 위치 재조정해주고 열리게 해주기 => game 재생성, 재 클릭 해주기


# 주의점
useContext를 사용할 때에는 값을 미리 캐싱해둬야 리렌더를 줄일 수 있다.

# 포인트
js에서의 이중배열 [] [] 에서 
첫번째 배열의 인덱스에서 벗어나는 값을 넣으면 Uncaght TypeError 에러가 발생한다.
하지만 두번째 배열의 인덱스에서 벗어나면 undefined가 리턴된다.
이를 방지하기 위해 ?? 연상자를 사용하는 방법도 존재한다.
=> (arr[-1] ?? [])[0]) 등

# 고생했던 부분
case OPEN_BOX 로 인해 halted의 초기 설정이 false로 초기화를 안해놔서
게임 생성시에 false로 시간이 흐르지만, OPEN_BOX가 dispatch 되었을 때에 
halted를 false로 다시 전해주지 않아서 useEffect의 의존성 배열이 변하지 않았다고 되어서
timer의 증가 dispatch가 발생하지 않았다.

```javaScript
let halted;
```
에서 
```javaScript
let halted = false;
```
으로 수정

# 느낀점
의존성 배열에 halted = false가 클릭으로 인해 false가 그대로 진행되어도 원하는 기능을 다시 실행시키려면 다시 false로 초기화 시켜서 return 해주어야한다.
```javaScript
let halted = false;
return {
                ...state,
                tableData: tableData,
                openedCount: state.openedCount + openedCount,
                result: result,
                halted: halted,
            }
```
