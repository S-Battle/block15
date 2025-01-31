const froyoTable = document.querySelector("#froyoTable");
let answerToPrompt =  prompt('Enter a list of comma-separated froyo flavors', 'vanilla,vanilla,vanilla,strawberry,coffee,coffee');

//gather prompt response into an array
let answers = answerToPrompt.split(',');
let updatedArray = [];
let froyoFlavors = {};

//clear white spaces, initial caps, caps after spaces
function formatArray(){
    for(let i = 0; i < answers.length; i ++){
        answers[i] = answers[i].trim();        
        answers[i] = answers[i].substring(0,1).toUpperCase() + answers[i].substring(1).toLowerCase();
        if(answers[i].indexOf("  ") !== -1){
            answers[i] = removeInnerSpaces(answers[i]);
        }   
        answers[i] = initialCapString(answers[i]);
    }
}

//function to add caps after spaces
function initialCapString(wordString){
    let word = wordString;
    let spaceCountArray = [];
    if (word.indexOf(" ") !== -1){        
        for(let i = 0; i < word.length; i++){
            if(word[i] === " "){
                spaceCountArray.push(i);
            }
        }
        for(let j = 0; j < spaceCountArray.length; j++){
           word = word.substring(0, spaceCountArray[ j] + 1) + word.substring(spaceCountArray[j] + 1, spaceCountArray [j]+ 2).toUpperCase() + word.substring(spaceCountArray[j]+2).toLowerCase();
     }
    }    
    return word;
}

//Function to remove stubborn spaces between two word entries......
function removeInnerSpaces(wordString){
    let word = wordString;    
    let initial = false;
    let wordArray = [] ;    
    let newString = "";

    for (let i = 0; i <  word.length; i++){
       if(word[i] !== " "){
        wordArray.push(word[i]);
        initial = false;
       }
       else if((word[i] === " ") &&(initial === false)){
        wordArray.push(word[i]);
        initial = true;
       }
       else if (initial === true && word[i] === " "){        
        wordArray.push('remove');
       }
    }

    for(let j = 0; j < word.length; j++){
        if(wordArray[j] !== "remove"){
            newString += wordArray[j];
        }
    }    
    return newString;
}

//add keys and values to froyoFlavors object
function buildFroyoObject(){
    for (let i = 0; i < answers.length; i++){
        if(updatedArray.indexOf(answers[i]) === -1){
            updatedArray.push(answers[i]);
            froyoFlavors[answers[i]] = 1;          
        }
        else{
            froyoFlavors[answers[i]] += 1;        
        }
    }
    return froyoFlavors;
}

//removal of items enterd improperly with comma and no data afterward, entered blank space
function removeImproperEntries(){
delete froyoFlavors[' '];
delete froyoFlavors[''];
}

//builds the table of froyo flavors and count of each flavor
function buildTable(){    
    for (flavors in froyoFlavors){
        let colorClass = flavorColorChooser(flavors);
        console.log(flavors);
        let newRow = document.createElement('tr');
        let newHeader = document.createElement('th');
        newHeader.setAttribute('class', `${colorClass}`);
        newHeader.innerText = flavors;  
        let newData = document.createElement('td');
        newData.setAttribute('class', colorClass);
        newData.innerText = froyoFlavors[flavors];      
        newRow.appendChild(newHeader);
        newRow.appendChild(newData);   
        froyoTable.appendChild(newRow);             
    }
}

function flavorColorChooser(flavor){

    let chosenClass = '' ; 

    switch(flavor){
        //Brown Flavors
        case "Chocolate":
        case "Cookie":
        case "Coffee":
        case "Peanut Butter":
        case "Peanutbutter":
        case "Mocha":
        case "Java":
        case "Dark Chocolate":
        case "Chocolate Chip":
        case "Brownie":
        chosenClass = 'brown'; 
        break;

        //Red Flavors
        case "Strawberry":
        case  "Watermelon":
        case "Cherry": 
        case "Fruit Punch": 
        case "Pomegranite":
        case "Apple":
        case "Apple Cinnamon":
        chosenClass = 'red';
        break;

        //Vanilla Flavor
        case "Vanilla":
        case "Cake Batter":
        case "Eggnog":
        case "Tart":        
        case "Cream":
        case "Cheesecake":
        case "Plain":
        case "Red Velvet":        
        chosenClass = 'vanilla';
        break;

        //Orange Flavor
        case "Orange":
        case "Mango":
        case "Peach":
        case "Nectarine":
        case "Pumpkin":
        case "Grapefruit":
        chosenClass = 'orange';
        break;

        //Green Flavor
        case "Mint":
        case "Green Tea":      
        case "Lime":  
        case "Melon":
        chosenClass = 'green';
        break;

        //Yellow Flavor
        case 'Banana':
        case 'Lemon':
        case 'Pineapple':
        chosenClass = "yellow";
        break;

        //Purple Flavor
        case "Blueberry":
        case "Animal Cracker":
        case "Rasberry":
        case "Blackberry":
        case "Plum":
        chosenClass = 'purple';
        break;

        default:
        chosenClass = 'default';
    }
    return chosenClass;
}


//functions in optimized order
formatArray();
froyoFlavors = buildFroyoObject();
removeImproperEntries();
buildTable();

//Object in console.log for view
console.log(froyoFlavors);