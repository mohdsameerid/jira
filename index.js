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