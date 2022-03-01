//Show All Search Phone
const searchPhone = () => {
  document.getElementById('moreDetails').innerHTML = '';
  document.getElementById('singleDetails').innerHTML = '';
  Loading('block');
  let Searchfield = document.getElementById('input');
  let Searchvalue = Searchfield.value;
  const calculateLength = Searchvalue.toString();
  if (calculateLength.length == 0) {
    Loading('none');
    ErrorHandle('block');
    const mainDiv = document.getElementById('searchResult');
    mainDiv.innerHTML = '';
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${Searchvalue}`;
    fetch(url)
      .then((res) => res.json())
      .then((datas) => DisplayResult(datas.data.slice(0, 20)));
    Searchfield.value = '';
  }
};
//error & spinner
const Loading = (value) => {
  document.getElementById('spinner').style.display = value;
};
const ErrorHandle = (show) => {
  document.getElementById('ErrorName').style.display = show;
};
//display All Products info
const DisplayResult = (phones) => {
  const mainDiv = document.getElementById('searchResult');
  mainDiv.innerHTML = '';

  if (phones.length == 0) {
    ErrorHandle('block');
    const mainDiv = document.getElementById('searchResult');
    mainDiv.innerHTML = '';
  } else {
    ErrorHandle('none');
    Loading('none');
    phones.forEach((phone) => {
      const div = document.createElement('div');
      div.classList.add('col', 'rounded', 'text-center');

      div.innerHTML = `
            <div   class="shadow w-100 g-4  mt-5  mb-5 h-100">
      <img src="${phone.image}" class="card-img-top mt-2 w-50 mx-auto text-center" alt="...">
      <div class="card-body">
        <h5 class="card-title fw-bolder">${phone.phone_name}</h5>
        <p class="card-text fw-bold">${phone.brand}</p>
        <a href="#singleDetails" onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-dark">Show details</a>
      </div>
    </div>
    
            `;
      mainDiv.appendChild(div);
    });
  }
};
/// products info function
const loadPhoneDetails = (phoneId) => {
  document.getElementById('moreDetails').innerHTML = '';
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhoneDetails(datas.data));
};
//Display single products info
const displayPhoneDetails = (phone) => {
  const phonedit = document.getElementById('singleDetails');
  phonedit.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add(
    'shadow',
    'card',
    'p-1',
    'w-25',
    'rounded',
    'text-center',
    'mt-3'
  );

  div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        
        <div class="card-body">
       
          <p class="card-text">Model: ${phone.name}</p>
          <p class="card-text"> Release Date : ${
            phone.releaseDate ? phone.releaseDate : 'No ReleaseDate found.'
          }</p>
          <p class="card-text"> Chipset : ${phone.mainFeatures.chipSet}</p>
          <p class="card-text"> Memory : ${phone.mainFeatures.memory}</p>
          <p class="card-text"> Display size : ${
            phone.mainFeatures.displaySize
          }</p>      
          <p class="card-text"> Storage : ${phone.mainFeatures.storage}</p>
          <a href="#moreDetails" onclick="loadMoreDetails('${
            phone.slug
          }')" type="button" class="btn btn-dark text-center h-2">More details</a>
          
        </div>
        `;
  phonedit.appendChild(div);
};
//More Details function
const loadMoreDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => Displaymoredetails(datas.data));
};
//Display More details of single product
const Displaymoredetails = (phone) => {
  const phonedit = document.getElementById('moreDetails');
  phonedit.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add(
    'shadow',
    'card',
    'p-1',
    'w-50',
    'rounded',
    'text-center',
    'mt-4'
  );

  try {
    div.innerHTML = `
    <p> Sensors : </p>
              <p class="card-text">  ${phone.mainFeatures.sensors}</p>   
              <p> Others : </p>
             <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
              <p class="card-text">GPS: ${phone.others.GPS}</p>
              <p class="card-text">NFC: ${phone.others.NFC}</p>
              <p class="card-text">Radio: ${phone.others.Radio}</p>
              <p class="card-text">USB: ${phone.others.USB}</p>
              <p class="card-text">WLAN: ${phone.others.WLAN}</p>`;
  } catch {
    div.innerHTML = ` 
    <p> Sensors : </p>
     <p class="card-text"> ${phone.mainFeatures.sensors}</p>   
              <p class="card-text"> Others : No proper others value.</p>`;
  }
  phonedit.appendChild(div);
};
