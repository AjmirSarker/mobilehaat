// Spinner
// const Loading = (value) => {
//     document.getElementById('spinner').style.display = value;
//   };
// Search Phone
const searchFood = () => {
    document.getElementById('moredetails').innerHTML=''
    // Loading('block');
    const maindiv = document.getElementById('searchResult');
    maindiv.innerHTML = '';
    const Mealdit = document.getElementById('mealDetails');
    Mealdit.innerHTML = '';
    let Searchfield = document.getElementById('input');
    let Searchvalue = Searchfield.value;
    const calculateLenght = Searchvalue.toString();
    //  check empty
    if (calculateLenght.length == 0) {
      // document.querySelector(".ErrorName").style.display="block"
    //   Loading('none');
    //   ErrorHandle('block');
    } else {
    //   ErrorHandle('none');
      const url = `https://openapi.programming-hero.com/api/phones?search=${Searchvalue}`
      fetch(url)
        .then((res) => res.json())
        .then((datas) => displaySearchResult(datas.data))
        // .catch((error) => ErrorHandle('block'));
      Searchfield.value = '';
    }
  };
  const displaySearchResult = (meals) => {
    // Loading('none');
    const maindiv = document.getElementById('searchResult');
    maindiv.innerHTML = '';
    document.getElementById('mealDetails').innerHTML = '';
    meals.forEach((meal) => {
      // console.log(meal);
      const div = document.createElement('div');
      div.classList.add('col', 'rounded','text-center');
  
      div.innerHTML = `
          <div   class="shadow w-100 g-4  mb-5 h-100">
    <img src="${meal.image}" class="card-img-top mt-2 w-75 text-center" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.phone_name}</h5>
      <p class="card-text">${meal.brand}</p>
      <button onclick="loadMealDetails('${ meal.slug}')" type="button" class="btn btn-dark">Show details</button>
    </div>
  </div>
  

          `;
  
      maindiv.appendChild(div);
    });
  };
  const loadMealDetails = (mealId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${mealId}`;
    fetch(url)
      .then((res) => res.json())
      .then((datas) => displaymealdetails(datas.data));
  };
  
  const displaymealdetails = (meals) => {
    // Loading('block');
    const Mealdit = document.getElementById('mealDetails');
    Mealdit.innerHTML = '';
  
      const div = document.createElement('div');
      div.classList.add('shadow','card' ,'p-1','w-25',"rounded","text-center","mt-3");
      div.style.width = '18rem';
      const div2=document.createElement('div');
      div2.classList.add('shadow','card' ,'p-1','w-25',"rounded","text-center","mt-3");
      div2.style.width = '18rem';
      
     let releasedate= meals.releaseDate
      if(releasedate.toString().length==0){
        div.innerHTML = `
        <img src="${meals.image}" class="card-img-top w-50 mx-auto" alt="...">
        
        <div class="card-body">
       
          <p class="card-text">${meals.name}</p>
          <p class="card-text">${meals.mainFeatures.chipSet}</p>
          <p class="card-text">${meals.mainFeatures.displaySize}</p>
          <p class="card-text">${meals.mainFeatures.memory}</p>
          <p class="card-text">No release date found</p>
          <p class="card-text">${meals.mainFeatures.storage}</p>
          <a href="#moredetails" onclick="loadMoreDetails('${meals.slug}')" type="button" class="btn btn-dark text-center h-2">More details</a>
          
        </div>
        `;

      }
      else{
        div.innerHTML = `
        <img src="${meals.image}" class="card-img-top w-50 mx-auto" alt="...">
        
        <div class="card-body">
       
          <p class="card-text">${meals.name}</p>
          <p class="card-text">${meals.mainFeatures.chipSet}</p>
          <p class="card-text">${meals.mainFeatures.displaySize}</p>
          <p class="card-text">${meals.mainFeatures.memory}</p>
          <p class="card-text">${meals.releaseDate}</p>
          <p class="card-text">${meals.mainFeatures.storage}</p>
          <a  onclick="loadMoreDetails('${meals.slug}')" type="button" class="btn btn-dark text-center h-2">More details</a>
          
        </div>
        `;
      }
      
      document.getElementById('moredetails').innerHTML=''
      Mealdit.appendChild(div);
    //   Loading('none');
    
 
    
  };
  const loadMoreDetails = (mealId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${mealId}`;
    fetch(url)
      .then((res) => res.json())
      .then((datas) => Displaymealdetails(datas.data));
  };
 
  const Displaymealdetails = (meals) => {
    // Loading('block');
    const Mealdit = document.getElementById('moredetails');
    Mealdit.innerHTML = '';
  
      const div = document.createElement('div');
      div.classList.add('shadow','card', 'p-1','w-50',"rounded","text-center");
      // div.style.width = '18rem';
      
        div.style.marginTop='20px'
      
     
    
        try{
            
            div.innerHTML=`
            <p class="card-text"> Sensors : ${meals.mainFeatures.sensors}</p>   

           <p class="card-text">Bluetooth: ${meals.others.Bluetooth}</p>
            <p class="card-text">GPS: ${meals.others.GPS}</p>
            <p class="card-text">NFC: ${meals.others.NFC}</p>
            <p class="card-text">Radio: ${meals.others.Radio}</p>
            <p class="card-text">USB: ${meals.others.USB}</p>
            <p class="card-text">WLAN: ${meals.others.WLAN}</p>`
           
        }catch{
            div.innerHTML=`  <p class="card-text"> Sensors : ${meals.mainFeatures.sensors}</p>   
            <p class="card-text"> Others : No Value</p>`
            
        }
        Mealdit.appendChild(div);
      
   
    //   Loading('none');
    // <p class="card-text"> Others : ${meals.others.USB}</p>
    
 
    
  };