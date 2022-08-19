// Returns the first element that matches selectors.
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
var isModalPresent = false;
// (1) modal-container present
// addbtn pe addEventListener lga with calllback function
addBtn.addEventListener("click", function () {
  //    case 1 -> if modal is not present
  //              then display modal
  if (!isModalPresent) {
    // display modal
    modalCont.style.display = "flex";
  }

  // case 2 -> if modal is Present
  //           then hide modal
  else if (isModalPresent) {
    // display none
    modalCont.style.display = "none";
  }

  isModalPresent = !isModalPresent;
});



const colors = ["lightpink","lightgreen","lightblue","black"];
let modalPriorityColors = colors[colors.length-1]; //black
const textArea = document.querySelector(".textarea-cont");
const mainCont = document.querySelector(".main-cont");
var uid = new ShortUniqueId();
let ticketsArr = [];
// (2) Make Ticket
modalCont.addEventListener("keypress", function(e){
  if(e.key == "Enter"){
    console.log(e);
    // 1) call createTicket()
    createTicket(modalPriorityColors, textArea.value);
    // 2) alter display and update isModalPresent
    modalCont.style.display = "none";
    isModalPresent = false;
    // 3) text area empty for the next time
    textArea.value = "";
  }
});
function createTicket(ticketColor, data, ticketId){
  // generate uid
  let id = ticketId || uid();
  let ticketCont = document.createElement("div");

  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
  <div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-id">id: #${id}</div>
  <div class="task-area">${data}</div>
  <div class="ticket-lock">
      <i class="fa-solid fa-lock"></i>
  </div>
`;
mainCont.appendChild(ticketCont);

 //if ticket is being generated for the first time save it in local Storage
   if(!ticketId) {
    ticketsArr.push({
    ticketId: id,
    ticketColor,
    ticketTask: data,
  });
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }
  handleRemoval(ticketCont, id);
  handlePriorityColor(ticketCont, id);
  handleLock(ticketCont, id);
}



//getting data from localStorage, for re rendering of tickets
if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach(ticketObj => {
      createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId)
    })
  }



const allPriorityColor = document.querySelectorAll(".priority-color");
// (3) modal container color selection 
allPriorityColor.forEach(colorElement=>{
  colorElement.addEventListener("click", function (){
    // 2) remove all ho jayege previous vale
    allPriorityColor.forEach(elem=>{
      elem.classList.remove("active");
    })
    // 1 sbbhi active ho jayege || active one
    colorElement.classList.add("active");
    // 3) classList[0] idx pe color asign to modalPriorityColors
    modalPriorityColors = colorElement.classList[0];
    // console.log(colorElement.classList[0]);
  })
});




let toolBoxColors = document.querySelectorAll(".toolbox-color-cont>*");
// getting Tickets by single and double click
for (let i = 0; i < toolBoxColors.length; i++) {
  // geting tickets on the basis of ticketColor (single click)
  toolBoxColors[i].addEventListener("click", function () {
    let currColor = toolBoxColors[i].classList[0];
    let filteredTickets = ticketsArr.filter(ticketObj => ticketObj.ticketColor == currColor);
    // console.log(filteredTickets);

    // remove all tickets
    let allTickets = document.querySelectorAll(".ticket-cont");
    allTickets.forEach(ticket => ticket.remove());

    //display filtered tickets 
    filteredTickets.forEach(ticket => 
      createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
  })

  // display all ticket by double click
  toolBoxColors[i].addEventListener("dblclick", function(){
    
    //remove all ticket in UI
    let alltickets = document.querySelectorAll(".ticket-cont");
    alltickets.forEach((tickets) => tickets.remove());
    
    // diplay all tickets
    ticketsArr.forEach((ticket) => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId))
  })
}



//toggling the remove btn 
var isRemoveBtnActive = false;
const removeBtn = document.querySelector(".fa-xmark");
removeBtn.addEventListener("click", function () {
  console.log("in btn");
  //    case 1 -> if removeBtn is not active
  //              then make it active i.e. red color
  if (!isRemoveBtnActive) {
    // display modal
    console.log("inside not active");
    removeBtn.style.color = "red";
  }

  // case 2 -> if removeBtn is active
  //           then make it inactive i.e. white color
  else if (isRemoveBtnActive) {
    // display none
    console.log("inside active");
    removeBtn.style.color = "white";
  }

  isRemoveBtnActive = !isRemoveBtnActive;
});
//helps in removing the ticket from frontend and saving in localStorage
function handleRemoval(ticketCont,id){
  ticketCont.addEventListener("click", function () {
    if (!isRemoveBtnActive) return;

    //remove from ticketsArr
    let idx = getTicketIdx(id);
    console.log(idx);
    ticketsArr.splice(idx, 1);
    console.log(ticketsArr);
    //set in local storage
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    //remove from frontend
    ticketCont.remove();
  });
}
//retuns the index of ticket present in ticketsArr
function getTicketIdx(id) { 
    let idx = ticketsArr.findIndex(ticketObj => {
      return ticketObj.ticketId==id
    })
    return idx;
  }
  


//changing ticket priority color
function handlePriorityColor(ticketCont, id){
    let ticketColor = ticketCont.querySelector(".ticket-color");
     // Implement addEventListener of type click in ticketColor
     ticketColor.addEventListener("click", function (){
      let currTicketColor = ticketColor.classList[1]; // lightpink 
      let currTicketColorIdx = colors.indexOf(currTicketColor); // 0
      let newTicketColorIdx = (currTicketColorIdx+1) % colors.length; //
      
      let newTicketColor = colors[newTicketColorIdx]; // lightgreen 
  
      ticketColor.classList.remove(currTicketColor); // lightpink class removed 
      ticketColor.classList.add(newTicketColor); // lightgreen class added
  
      // update in localStorage
      let idx = getTicketIdx(id);
      // 1)update the newTicketcolor in ticketArr
      ticketsArr[idx].ticketColor = newTicketColor;
      // 2) set in local Storage
      localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  
     });
  }  



  let unlock = "fa-lock-open";
  // handle Lock
  function handleLock(ticketCont, id){
    let ticketLock = ticketCont.querySelector(".ticket-lock");
    let lock = ticketLock.children[0].classList[1];
    let ticketTaskArea = ticketCont.querySelector(".task-area");
  
    ticketLock.addEventListener("click", function (){
      if(ticketLock.children[0].classList.contains(lock)){
        // remove lock class
        ticketLock.children[0].classList.remove(lock);
        // add lock class
        ticketLock.children[0].classList.add(unlock);
  
        //make content editable
        ticketTaskArea.setAttribute("contenteditable", "true");
      }
      else{
        // add lock class
        ticketLock.children[0].classList.add(lock);
        // remove lock class
        ticketLock.children[0].classList.remove(unlock);
  
        // make content non editable
        ticketTaskArea.setAttribute("contenteditable", "false");
      }
  
      // set Editable content in localStorage
      let idx = getTicketIdx(id);
      console.log(ticketTaskArea.textContent);
      ticketsArr[idx].ticketTask = ticketTaskArea.textContent;
      localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    });
  }  


  