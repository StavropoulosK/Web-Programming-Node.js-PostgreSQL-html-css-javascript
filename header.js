function changeHeader() {
    const container = document.querySelector('header .buttons');
    const elements = container.children;
    console.log(elements)
    

    if (window.innerWidth <= 1200 && container.children[0].nodeName==="DIV") {
      container.insertBefore(container.children[1], container.children[0]);
        }
    else if(window.innerWidth > 1200 && container.children[0].nodeName==="BUTTON") {
        container.insertBefore(container.children[1], container.children[0]);
    }
    
  }


window.addEventListener('resize', changeHeader);

window.onload = changeHeader;
