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

  
}