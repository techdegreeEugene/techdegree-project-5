document.addEventListener("DOMContentLoaded", function() {

let listOfEmployee = [];
let body = document.querySelector("body");
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
           // .then(checkStatus)
           .then(res => res.json()) // parses to JSON

           .catch(error => console.log('Looks like there was a problem!', error))

}
fetchData("https://randomuser.me/api/?results=12&nat=us")
  .then(data => {
    listOfEmployees = data.results;
    createEmployeeCards(listOfEmployees);
  })



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

//Create gallery
let gallery = document.querySelector(".gallery");
/* <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div> */

function createEmployeeCards(data) {
  for (let i = 0; i < listOfEmployees.length; i++ ) {

  let cardClass = document.createElement("div");
  cardClass.className = "card";
  let cardHTML =
        `<div class="card-img-container">
            <img class="card-img" src="${listOfEmployees[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${listOfEmployees[i].name.first} ${listOfEmployees[i].name.last}</h3>
            <p class="card-text">${listOfEmployees[i].email}</p>
            <p class="card-text cap">${listOfEmployees[i].location.city}, ${listOfEmployees[i].location.state}</p>
        </div>`;
  gallery.appendChild(cardClass);
  cardClass.innerHTML= cardHTML;

  // Modal to appear

  cardClass.addEventListener("click", (e) => {
    e.preventDefault();
    let chosenEmp = listOfEmployees[i];
    let left = listOfEmployees[i-1];
    let right = listOfEmployees[i+1];
    createModal(chosenEmp);
    createLeft(left);
    createRight(right);
    })
  }
}


//Create Modal

// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>


  function createModal(data) {
        let modalContainer = document.createElement("div");
        modalContainer.setAttribute("class", "modal-container");
        let modalHTML = `<div class="modal">
                          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                          <div class="modal-info-container">
                              <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                              <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                              <p class="modal-text">${data.email}</p>
                              <p class="modal-text cap">${data.location.city}</p>
                              <hr>
                              <p class="modal-text">${data.cell}</p>
                              <p class="modal-text">${data.location.street.number} ${data.location.street.name}  ${data.location.city}, ${data.location.state} ${data.location.postcode}    </p>
                              <p class="modal-text">Birthday: ${new Date(data.dob.date).toLocaleDateString()}</p>
                          </div>`
                        //Date conversion from https://www.geeksforgeeks.org/javascript-date-tolocaledatestring/

        modalContainer.innerHTML = modalHTML;
        body.appendChild(modalContainer);
        modalContainer.style.display = "";

        let button = document.getElementsByTagName("button")[0];
        button.addEventListener("click", (e) => {
            body.removeChild(modalContainer);
          })
        }


function createLeft(data) {

  let html = `<div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  </div>`
  body.appendChild(html);
  }
})
