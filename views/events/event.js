
const mediaQuery = window.matchMedia('(min-width: 768px)')

function handleTabletChange(e){

    if(e.matches){

const scrollContainer = document.querySelector("main");

scrollContainer.addEventListener("wheel", (evt) => {
  if (scrollContainer.innerWidth > 600) {
    evt.preventDefault();
    scrollContainer.scrollTop += evt.deltaY;
  } else {
    scrollContainer.scrollLeft += evt.deltaY;
  }
});
}
}
handleTabletChange(mediaQuery)




