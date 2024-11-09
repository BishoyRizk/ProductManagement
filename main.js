let title = document.getElementById('title')
console.log(title);

let price = document.getElementById('price')
let ads = document.getElementById('ads')
let taxes = document.getElementById('taxes')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category= document.getElementById('category')
let submit= document.getElementById('submit')


let mood = 'create'

let tmp;

let nums=0;





function getTotal(){
    
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background='#040'
    }
    else{
         total.style.background='#a00d02'
         total.innerHTML=''
         
    }
    
    
}





let dataPro = []
if(localStorage.getItem('sales') != null){
    dataPro = JSON.parse(localStorage.getItem('sales'))
    read()
}




submit.onclick= function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }


    if(mood==='create'){
        if(newPro.count > 1){
            for(let i = 0; i<newPro.count ; i ++){
                dataPro.push(newPro)
               
                
            }
        }else{
            dataPro.push(newPro)
            
        }
    }else{
        dataPro[tmp] = newPro
        mood='create'
        submit.innerHTML='create'
        count.style.display='block'
        let aa =  document.getElementById(`delete-${nums}`)
        aa.setAttribute('disabled',false)
        console.log(aa);
        
        

        
        
        
    // document.getElementById(`delete-${i}`).setAttribute('disabled',false)
    // console.log(document.getElementById(`delete-${i}`));
      
        
    }

   
    
    localStorage.setItem('sales',JSON.stringify(dataPro))
    clear()
    read()
   
    
}




function clear(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    category.value=''
    count.value=''
}



function read(){
    getTotal()
    let table = ''

    for (let i = 0; i < dataPro.length; i++) {
        if(dataPro[0]==null){
            continue

           
            
        }

        table += `
        
        <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button id="update-${i}"  onclick='updateDate(${i})'>update</button></td>
                      <td><button onclick='deleteDate(${i})' id="delete-${i}">delete</button></td>
                      
                    
                  </tr>
      
      
      
      
      
      `
       
        
    }

    document.getElementById('tbody').innerHTML= table
    let btnDeleteAll = document.getElementById('deleteAll')
    if(dataPro.length>0){
        btnDeleteAll.innerHTML= `<button onclick='deleteAll()' >deleteAll(${dataPro.length})</button> `
    }else{
        btnDeleteAll.innerHTML = ``
    }
}





function deleteDate(i){
    dataPro.splice(i,1)
    localStorage.setItem('sales',JSON.stringify(dataPro))
    read()
}



function deleteAll(){
    localStorage.removeItem('sales')
    dataPro.splice(0)
    read()
}





function updateDate(i){

    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display='none'
    category.value = dataPro[i].category
    submit.innerHTML='update'
    mood = 'update'
    tmp=i
    scroll({
        top:0,
        behavior:"smooth"

    })


    
  let name =  document.getElementById(`delete-${i}`)
  
  

  name.setAttribute('disabled',true)
    console.log(name);

    nums=i
    


    
    
    


    
    
    
    

   
    

}

let searchMood = 'title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood = 'title'
        search.placeholder='search by title'
        
    }else{
        searchMood='category'
         search.placeholder='search by category'
    }
    
        search.value='',
        read()
   

    console.log(searchMood);
    
    
}


function searchDate(value){
    let table = ''
    if(searchMood =='title'){
        
        for(let i = 0; i<dataPro.length;i++){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
        
                <tr>
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button id="update-${i}"  onclick='updateDate(${i})'>update</button></td>
                        <td><button onclick='deleteDate(${i})' id="delete-${i}">delete</button></td>
                              
                            
                          </tr>
              
              
              
              
              
              `
            }
        }










    }else{
        for(let i = 0; i<dataPro.length;i++){
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `
        
                <tr>
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button id="update-${i}"  onclick='updateDate(${i})'>update</button></td>
                        <td><button onclick='deleteDate(${i})' id="delete-${i}">delete</button></td>
                              
                            
                          </tr>
              
              
              
              
              
              `
            }
        }
    }

    document.getElementById('tbody').innerHTML= table
}