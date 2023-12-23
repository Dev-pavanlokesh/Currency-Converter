const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const drops = document.querySelectorAll(".form-box select");


const btn = document.querySelector("#btn");

const input = document.querySelector(".input input")
const fromcrr = document.querySelector(".form-left select");
const tocrr = document.querySelector(".form-right select");
const msg = document.querySelector(".msg");

for (let select of drops) {
    for (let code in countryList) {
        let newopt = document.createElement("option");
        newopt.innerText = code;
        newopt.value = code;
        if (select.name === "From" && code === "USD") {
            newopt.selected = "selected"
        }
        if (select.name === "to" && code === "INR") {
            newopt.selected = "selected"
        }
        select.append(newopt);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        })
    }
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = input.value;
    if (amount <= 0) {
        alert("Please Enter  a positive amount ");
    }
    const URL = `${BASE_URL}/${fromcrr.value.toLowerCase()}/${tocrr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocrr.value.toLowerCase()];
    let final = amount * rate;

    msg.innerText = `${amount} ${fromcrr.value} = ${final} ${tocrr.value}`;
})