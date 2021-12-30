//////////////////////////////////////////////////////
// All Data List 
// JSON 데이터 로드 - 카드 구성 
// 20211222 데이터를 로드하고 그때그때 맞는 카드를 다시 listup 하는 방식이었음
// 20211223 모든 데이터를 로드하고 카드에 맞게 show/hid 하는 방식으로 바꿈
//////////////////////////////////////////////////////
var shoppingList =[];  //original Data를 저장
var $list = $('#list');  // card item 이 display 되는 곳
  
// 데이터를 json에서 load 한다.
function loadJSON(){
$.getJSON("store.json", function(data){
        // console.log(data);
        for(let i=0; i<data.products.length; i++){
          shoppingList[i] = {...data.products[i]};
          console.log(shoppingList[i]);
        }
      makeList(shoppingList);
    }).fail(function(){
        console.log("An error has occurred.");
    });
}

// 리스트를 clear 한다.
function clearItem(){
$('#list').empty();
}

// 데이터를 만들어 놓는 상태. 카드까지 같이 만들어 놓는다.
function makeList(list){
  clearItem();
  for(let i=0; i<list.length; i++){
    var addItemBody =`
    <div id="carditem${i}" class="col-3 m-1 p-0 hide">
      <div class="card h-100">
        <img src="../image/${data.photo}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-title">${data.product_name}</p>
          <p class="card-text">${data.brand_name}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">${data.price}</small>
        </div>
      </div>
    </div>
  `;
  $('#list').append(addItemBody);
  }
}

// 리스트에 item 추가
function addItem(data){
// console.log('addItem',data);

}

function filterData(filter){
  const newList = shoppingList.filter(item => {

    var index = item.product_name.indexOf(filter);
    // console.log('indexing중입니다',index);
    if(index >= 0){
      return true;
    }else{
      return false;
    }
  });
  console.log('데이터 필터 되었습니다.',newList);
  return newList;
}

//////////////////////////////////////////////////////
/////// UI List                         //////////////
//////////////////////////////////////////////////////

$( document ).ready(function() {
  loadJSON();

  // 목록을 추가해 놓는다.
  for(let i=0; i<4; i++){
    addItem(i);
  }
console.log("아이템 add 완료");
});

$('#list-add').click(function(){
  loadList(shoppingList);
});

$('#list-clear').click(function(){
  clearItem();
});

$('#list-filter').click(function(){
  loadList(filterData("세척기"));
});

var oldVal ="";
$('#search-item').on("propertychange change keyup paste input", function(){
  var currentVal = $(this).val();
  if(currentVal == oldVal) {
      return;
  }
  oldVal = currentVal;
  // console.log('key 입력이 되었습니다.',currentVal);
  loadList(filterData(currentVal));
});

$('#list-filter').draggable(function(){
  console.log("item is moving");
});

