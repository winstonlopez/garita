'use strict'

class People{
    constructor(name, surname){
        this.name = name;
        this.surname = surname;
        this.credit = 0;
        this.items =[];
    }

    addItem(item){                     
        this.items.push(item);
        this.credit += item.price;
    }

    pay(cash){
        this.credit -= cash;
    }
    addPhoto(url){
        this.photo = url;
    }
}
//----------------------------------------------------
class Item{
    constructor(item, price){
        this.name = item;
        this.price = +price;
        this.date = new Date();
        this.total = this.price;
        this.quantity = 1;
    }

    addTotal(){
        return this.quantity * this.price;
    }

    showDate(){
        const event = this.date;
        const options = {weekday: `long`, year: `numeric`, month: `long`, day: `numeric`};

        return event.toLocaleDateString(undefined, options);

    }

}

function AddPeople(){
    let name = prompt('Enter Name: ', 'name');
    if(name == null) return;
    let surname = prompt(`Enter Surname: `, `Surname`);
    if(surname == null)return;
    peopleList.push(new People(name, surname));
    listTable(peopleList);
}

function showSearch(){

    if(leftContainer.style.width == '0px' || leftContainer.style.width == 0){
        leftContainer.style.width = `500px`;
        leftContainer.style.minWidth = `500px`;
        mid.style.marginLeft = '501px';
        
        
        
        mid.innerHTML = '<';
        return}

    leftContainer.style.width = "0px";
    leftContainer.style.minWidth = `0px`;
    mid.style.marginLeft = '0px';
    
    
    
   
    mid.innerHTML = '>';

}

mid.addEventListener("click", showSearch)

smallMenu.addEventListener("click", function(){
    if(retractible.style.height == "280px"){
        retractible.style.height = "0px";
        return;
    }
    retractible.style.height = "280px";
})






//-----------------------------------------------------samples
let peopleList = [];    //put all people with credits here
let itemList = [];      //make this a set to eliminate duplicates

peopleList.push(new People(`winston`, 'Lopez'));
peopleList.push(new People(`carmela`, 'Lopez'));
peopleList.push(new People(`titania`, 'Lopez'));
peopleList.push(new People(`light`, 'Lopez'));
peopleList.push(new People(`lelouch`, 'Britannia'));
peopleList.push(new People(`kurokutoy`, 'otoy'));
peopleList.push(new People(`ben`, 'Dover'));
peopleList.push(new People(`jack`, 'Ma'));



itemList.push(new Item(`milo`, 10));
itemList.push(new Item(`bear brand swak`, 15));

//---------------Search Function-----------------
//--------create it with table----------------




function search(name, arr){
    return (arr.find(item=> item.name.includes(name)));
}

search(`winston`, peopleList).addPhoto('images/profiles/winston.jpg');



//---------------------Table Creator-----------------------------------
function createTable(arr, elem){
    if(arr.length <= 0){
        let message = document.createElement('p');
        message.className = 'noCredit';

        message.innerText = 'No Credits Found';
        elem.append(message);
        return;
    }
    let table = document.createElement('table');        //create table element
        table.className = "table";                      //apply css

    let headers = ['Count', `Item`, `Price`, `Date`, `Total`];


    for(let i = 0 ; i < arr.length ; i++){  //iterate contents of array, then put on table body
        let row = table.insertRow(i);       //create a row
        row.insertCell(0).innerHTML = arr[i].quantity;
        row.insertCell(1).innerHTML = arr[i].name;      //first column
        row.insertCell(2).innerHTML = arr[i].price;
        row.insertCell(3).innerHTML = arr[i].showDate();
        row.insertCell(4).innerHTML = arr[i].addTotal();     //second column
    }

    //create table head
    let header = table.createTHead();
    let headerRow = header.insertRow();

    for(let i =0; i < headers.length; i++){
        let headerCell = document.createElement("th");      //th like td but for headers
        let span = document.createElement('span');
        headerCell.innerHTML = headers[i];
        headerCell.prepend(span);
        span.append(span.nextSibling);
        headerRow.appendChild(headerCell);
    }

    function total(){
        let price = table.querySelectorAll('td')
        return price;
    }
 
        elem.append(table);


}

//-----create a function that creates div with table and search bar---

function creditContent(){

let searchBar = document.createElement('input');



}



// create a search function

let searchP = peopleList.find(item => item.name.includes(`winston`));
let searchItem = itemList.find(item => item.name.includes(`milo`));
let searchItem2 = itemList.find(item => item.name.includes('bear brand'));

searchP.addItem(searchItem);
searchP.addItem(searchItem);
searchP.addItem(searchItem2);

console.log(searchP);



function hideNav(){
    let nav = document.getElementById(`mainMenu`);
    nav.style.display = 'none'; //hide nav, we are going to use this later for responsive website
}


function buttonclick(){

    let x;
    if(searchInput.value == ''  || searchInput.value == undefined || !searchInput.value){return} else x = searchInput.value.toLowerCase();
    let result = peopleList.filter(item => item.name.toLowerCase().includes(x));  //filter returns an array of matching items
    if(result.length == 0){
        let empty = document.createElement('span');
        empty.className = `empty`;
        tableList.innerHTML = ``; //clear space
        empty.innerHTML = "<center>No Entries Found</center>";
        document.getElementById('tableList').append(empty);
        return;
        };
        console.log(result);
    listTable(result);
    

};
searchButton.addEventListener('click', buttonclick);

searchInput.addEventListener('keyup', function(event){
    event.preventDefault();

    if(event.keyCode == 13){
        buttonclick();
    }
});





//----table for nav

function listTable(arr){

    let table = document.createElement("table");
    table.classList.add('table');

    let names = sorter(arr);    //sort names, get names from database

    for(let i = 0 ; i < arr.length ; i++){ 
        let row = table.insertRow();
        row.insertCell().innerText = capitalize(names[i][0]);
        row.firstChild.data = search(names[i][0], arr); 
    }

    let elem = document.getElementById("tableList");
    elem.innerHTML = '';    //clear
    elem.append(table);

    leftContainer.style.width = '500px';
    leftContainer.style.minWidth = "500px";

    mid.innerHTML = '<';
    mid.style.marginLeft = '501px';

}




//function to show details
function showDetail(){



}

//sort name function, then return an array

function sorter(arr){

    let nameArray = []; //put names in an array first

    for(let i = 0; i < arr.length; i++){
        nameArray.push([arr[i].name, arr[i].surname]);
    }

    return nameArray.sort();
}

let containerTable = document.getElementById('tableList');   //this is the container of table
let selectedTD; //undefined

let selectedName;   //container for selected name;


//highlighter event
containerTable.addEventListener('click', function(event){                         //add event listener to the container
    let ta = this.querySelector('table');               //find a table element

    if(!ta){console.log('no table'); return};           //check if table exist

    let target = event.target.closest('td');  //get where the click was bubble on td, if not on table nothing happens
    if(!target){return};
    if(!ta.contains(target)) return;        //check if the target is inside the table
    //console.log(target.tagName);

    if(target.tagName != 'TD') return;  //if the event is not on the table data
    //console.log(target.data);
    selectedName = target.innerText;      //placeholder for show function
    if(selectedTD){                     //if there is a selected table data, remove highlight
        selectedTD.classList.remove('highlight');   //this will be skipped if selectedTD is undefined
    }
    selectedTD = target;    //next define it with the target TD element, then add the highlight
    selectedTD.classList.add('highlight');

    showDataTemplate(contentDiv, target);
    showPhoto(target);
    createTable(target.data.items, contentDiv);
 

});

//find the content div

let contentDiv = document.getElementById('rightContainer');


//show the details on right side
function showDataTemplate(elem, target){
    elem.innerHTML =''; //clear screen

    let topside = document.createElement('div'); //create div header
    topside.className = 'topside';

    elem.append(topside);   //append on target element

    let photo = document.createElement('div');  //div for photo
    photo.className = 'nameTag';

    topside.append(photo);  //put inside container

    let details = document.createElement('div');
    details.className = 'details';

    details.innerHTML =  `${target.data.surname}, ${target.data.name}`;   //undefined on test

    topside.append(details);

}

//nametag pictures

function showPhoto(targetElem){
    let box = contentDiv.querySelector('.nameTag');
    let profileImage = document.createElement('img');
    profileImage.src = search(targetElem.data.name, peopleList).photo;
    box.append(profileImage);
}

function capitalize(arr){
    let copy = arr[0].toUpperCase() + arr.slice(1);
    return copy;
}

function listItem(arr){

    let table = document.createElement('table');
    table.className = 'table';

    let header = table.createTHead();
    let hRow = header.insertRow();

    let headers = ["Item Name", "Price"];
    for(let i = 0; i < headers.length; i++){
    hRow.insertCell().innerText = headers[i];
    }

    let tBody =table.createTBody();
    for(let i = 0; i < arr.length; i++){
        let row = tBody.insertRow();
        row.insertCell(0).innerText = arr[i].name;
        row.insertCell(1).innerText = arr[i].price;
    }

    tableList.innerHTML = '';   //clear
    tableList.append(table);
}


mainMenu.querySelectorAll('span')[1].addEventListener('click', function(){
    listItem(itemList);

    leftContainer.style.width = '500px';
    leftContainer.style.minWidth = "500px";

    mid.innerHTML = '<';
    mid.style.marginLeft = '501px';

})



//create a function that separates items and people-----------------next project

