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