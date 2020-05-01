let c = 0;
let count = 1;
let list = document.querySelector("#items");
let delay = document.querySelector("#delay").value;
let countClick = document.getElementById("countClick");
const expensive = () => {
    let p = document.createElement('li');
    p.className = "list-group-item font-weight-bold";
    p.appendChild(document.createTextNode(`You make it throttle ${++c} times`));
    list.appendChild(p);
    document.getElementById("count").innerHTML = `<p>${c}</p>`
}

const throttle = (fn, d) => {
    let flag = true;
    return function() {
        countClick.textContent = count++;
        let context = this,
        args = arguments;
        if(flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(()=> {
                flag = true;
            }, d);
        }
    }
}

document.querySelector("#throttle").addEventListener("click",throttle(expensive, delay));