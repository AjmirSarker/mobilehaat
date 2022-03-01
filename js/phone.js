//Show All Search Phone
const searchPhone =()=>{
    Loading('block')
      let Searchfield = document.getElementById('input');
    let Searchvalue = Searchfield.value;
    const calculateLength = Searchvalue.toString();
  if(calculateLength.length == 0){
  Loading('none')
  ErrorHandle('block')
  const mainDiv = document.getElementById('searchResult')
      mainDiv.innerHTML=''
  }
  else{
      const url = `https://openapi.programming-hero.com/api/phones?search=${Searchvalue}`
      fetch(url)
      .then((res)=> res.json())
      .then((datas)=>DisplayResult(datas.data.slice(0,20)))
      Searchfield.value=''
  
  } 
  }
  //error & spinner
  const Loading = (value) => {
      document.getElementById('spinner').style.display = value;
    };
    const ErrorHandle = (show) => {
      document.getElementById('ErrorName').style.display = show;
    };
  //display All
  const DisplayResult=(phones)=>{
    const mainDiv = document.getElementById('searchResult')
      mainDiv.innerHTML=''
  
      if(phones.length==0){
  ErrorHandle('block')
  const mainDiv = document.getElementById('searchResult')
      mainDiv.innerHTML=''
  
      }else{
        ErrorHandle('none')
        Loading('none')
      phones.forEach(phone => {
      const div = document.createElement('div')
      div.classList.add('col', 'rounded','text-center');
    
        div.innerHTML = `
            <div   class="shadow w-100 g-4  mb-5 h-100">
      <img src="${phone.image}" class="card-img-top mt-2 w-50 mx-auto text-center" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        <button onclick="loadPhoneDetails('${ phone.slug}')" type="button" class="btn btn-dark">Show details</button>
      </div>
    </div>
    
            `;
            mainDiv.appendChild(div);
          
      });
  
      }
  }
  const loadPhoneDetails =(phoneId)=>{
      const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
      fetch(url)
        .then((res) => res.json())
        .then((datas) => displayPhoneDetails(datas.data));
  
  }
  const displayPhoneDetails=(phone)=>{
      const Mealdit = document.getElementById('singleDetails');
      Mealdit.innerHTML = '';
    
        const div = document.createElement('div');
        div.classList.add('shadow','card' ,'p-1','w-25',"rounded","text-center","mt-3");
        div.style.width = '18rem';
        
       let releasedate= phone.releaseDate
        if(releasedate.toString().length==0){
          div.innerHTML = `
          <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
          
          <div class="card-body">
         
            <p class="card-text">${phone.name}</p>
            <p class="card-text">${phone.mainFeatures.chipSet}</p>
            <p class="card-text">${phone.mainFeatures.displaySize}</p>
            <p class="card-text">${phone.mainFeatures.memory}</p>
            <p class="card-text">No release date found</p>
            <p class="card-text">${phone.mainFeatures.storage}</p>
            <a  onclick="loadMoreDetails('${phone.slug}')" type="button" class="btn btn-dark text-center h-2">More details</a>
            
          </div>
          `;
  
        }
        else{
          div.innerHTML = `
          <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
          
          <div class="card-body">
         
            <p class="card-text">${phone.name}</p>
            <p class="card-text">${phone.mainFeatures.chipSet}</p>
            <p class="card-text">${phone.mainFeatures.displaySize}</p>
            <p class="card-text">${phone.mainFeatures.memory}</p>
            <p class="card-text">${phone.releaseDate}</p>
            <p class="card-text">${phone.mainFeatures.storage}</p>
            <a  onclick="loadMoreDetails('${phone.slug}')" type="button" class="btn btn-dark text-center h-2">More details</a>
            
          </div>
          `;
        }
        
      //   document.getElementById('moredetails').innerHTML=''href="#moredetails"
        Mealdit.appendChild(div);
  
  }
  //More Details
   const loadMoreDetails =(phoneId)=>{
      const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
      fetch(url)
        .then((res) => res.json())
        .then((datas) => Displaymoredetails(datas.data));
  
   }
   const Displaymoredetails =(phone)=>{
      const Mealdit = document.getElementById('moreDetails');
      Mealdit.innerHTML = '';
    
        const div = document.createElement('div');
        div.classList.add('shadow','card', 'p-1','w-50',"rounded","text-center");
        // div.style.width = '18rem';
        
          div.style.marginTop='20px'
        
       
      
          try{
              
              div.innerHTML=`
              <p class="card-text"> Sensors : ${phone.mainFeatures.sensors}</p>   
             <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
              <p class="card-text">GPS: ${phone.others.GPS}</p>
              <p class="card-text">NFC: ${phone.others.NFC}</p>
              <p class="card-text">Radio: ${phone.others.Radio}</p>
              <p class="card-text">USB: ${phone.others.USB}</p>
              <p class="card-text">WLAN: ${phone.others.WLAN}</p>`
             
          }catch{
              div.innerHTML=`  <p class="card-text"> Sensors : ${phone.mainFeatures.sensors}</p>   
              <p class="card-text"> Others : No Value</p>`
              
          }
          Mealdit.appendChild(div);
        
     
  
   }