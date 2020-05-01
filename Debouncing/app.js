let count = 0;
let c = 0;
let list = document.querySelector("#items");
let delay = document.querySelector("#delay").value;
let countClick = document.getElementById("countClick");
document.querySelector("#letsdebounce").value = '';
const getData = () => {
    let p = document.createElement('li');
    p.className = "list-group-item font-weight-bold";
    let item = document.querySelector("#letsdebounce").value;
    p.appendChild(document.createTextNode(item));
    list.appendChild(p);
    document.getElementById("count").innerHTML = `<p>${++count}</p>`;
}

const doSomeMagic = function(fn, d) {
    let timer;
    return function () {
        countClick.textContent = ++c;
        let context = this,
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(()=> {
            getData.apply(context, arguments);
        }, d)
    }
}

const betterFunction = doSomeMagic(getData, delay);
