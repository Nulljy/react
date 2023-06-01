## 지뢰찾기 게임

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