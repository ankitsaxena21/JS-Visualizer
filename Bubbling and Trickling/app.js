//false = bubbling and true = trickling
let trickle = document.getElementById("myCheck").checked;
document.getElementById("myCheck").addEventListener("change" , () => {
    if (document.getElementById("myCheck").checked){
    trickle = true;
    }else{
    trickle = false;
    }  
});

document.querySelector("#grandparent").addEventListener('click', () => {
    if (trickle) {
        document.querySelector("#grandparent").className = "trickleGrandParent";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Grandparent Clicked"));
        document.querySelector("#mylist").appendChild(para);
    } else {
        document.querySelector("#grandparent").className = "bubbleGrandParent";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Grandparent Clicked"));
        document.querySelector("#mylist").appendChild(para);
    }
    console.log("Grandparent Clicked");
}, trickle);

document.querySelector("#parent").addEventListener('click', () => {
    if (trickle) {
        document.querySelector("#parent").className = "trickleParent";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Parent Clicked"));
        document.querySelector("#mylist").appendChild(para);
    } else {
        document.querySelector("#parent").className = "bubbleParent";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Parent Clicked"));
        document.querySelector("#mylist").appendChild(para);
    }
    console.log("Parent Clicked");
}, trickle);

document.querySelector("#child").addEventListener('click', () => {
    if (trickle) {
        document.querySelector("#child").className = "trickleChild";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Child Clicked"));
        document.querySelector("#mylist").appendChild(para);
    } else {
        document.querySelector("#child").className = "bubbleChild";
        let para = document.createElement('p');
        para.className = "list-group-item";
        para.appendChild(document.createTextNode("Child Clicked"));
        document.querySelector("#mylist").appendChild(para);
    }
    console.log("Child Clicked");
}, trickle);
