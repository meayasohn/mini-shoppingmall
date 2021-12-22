//////////////////////////////////////////////////////
/////// All Data List                   //////////////
//////////////////////////////////////////////////////
var shoppingList =[];
  
// 데이터를 json에서 load 한다.
function loadData(){
$.getJSON("store.json", function(data){
        // console.log(data);
        for(let i=0; i<data.products.length; i++){
          shoppingList[i] = {...data.products[i]};
          console.log(shoppingList[i]);
        }
      loadList(shoppingList);
    }).fail(function(){
        console.log("An error has occurred.");
    });
}

// 리스트를 clear 한다.
function clearItem(){
$('#list').empty();
}

function loadList(list){
  clearItem();
  for(let i=0; i<list.length; i++){
    addItem(list[i]);
  }
}

// 리스트에 item 추가
function addItem(data){
// console.log('addItem',data);

var addItemBody =`
  <div class="col m-1 p-0">
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
  //데이터 목록을 가져온다.
  loadData();

  // // 목록을 추가해 놓는다.
  // for(let i=0; i<4; i++){
  //   addItem(i);
  // }
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