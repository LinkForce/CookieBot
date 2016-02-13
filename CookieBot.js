///////////// REFERENCE /////////////////////////////////////////////////////
// CM.Cache.Objects
// CM.Cache.Upgrades
// //Loop nessas duas arrays pra achar o menor bci do jogo
// Game.Objects['Cursor'].bulkPrice
// // comparando com o bulkPrice pra ver se eu tenho dinheiro o suficiente
// Game.cookies // quantidade de cookies que eu tenho
// CM.Cache.Lucky //cookies necessários minimo para ter lucky! maximo
// CM.Cache.LuckyFrenzy // frenzy maximo
// setInterval(function(){Game.ClickCookie()},0) // clicka pra caralho
// if (Game.goldenCookie.life > 0 && Game.goldenCookie.wrath == 0) { 
	// Game.goldenCookie.click()
// } // click gold só gold
/////////////////////////////////////////////////////////////////////////////

 

var CookieBot = {}
CookieBot.clicker = 0;
CookieBot.goldenClicker = 0;
CookieBot.loopBuyBest = 0;
CookieBot.loopBuyWrathIfAvaible = 0;

CookieBot.buyBest = function (){	
	
if	(typeof CM === 'undefined'){
	console.log('Please run CookieMonster before bot.')
	return;
}

var lowestBci;
var lowestBciValue = 0;
var lowestBciCost = 0;
var lowestBciType;

for	(item in CM.Cache.Objects) {
	if ((CM.Cache.Objects[item].bci < lowestBciValue || lowestBciValue == 0) && Game.Objects['Cursor'].bulkPrice < Game.cookies ){
		lowestBciValue = CM.Cache.Objects[item].bci;
		lowestBci = item;
		lowestBciType = "Object";
	}
}

for	(item in Game.Upgrades) {
	if	(Game.Upgrades[item].pool != "" && Game.Upgrades[item].pool != "cookie"
		&& Game.Upgrades[item].pool != "tech")
			continue;
	
	if(typeof CM.Cache.Upgrades[item] === 'undefined')
		continue;
	
	if ((CM.Cache.Upgrades[item].bci < lowestBciValue || lowestBciValue == 0) && Game.Upgrades[item].basePrice < Game.cookies){
		lowestBciValue = CM.Cache.Upgrades[item].bci;
		lowestBci = item;
		lowestBciType = "Upgrade"
	}
}

switch (lowestBciType){
		case "Object":
			lowestBciCost = Game.Objects[lowestBci].bulkPrice;
		break;
		case "Upgrade":
			lowestBciCost = Game.Upgrades[lowestBci].basePrice;
		break;
	}	

if ((Game.cookies - lowestBciCost) > CM.Cache.LuckyFrenzy){
//if (true){
	switch (lowestBciType){
		case "Object":
			Game.Objects[lowestBci].buy();
		break;
		case "Upgrade":
			Game.Upgrades[lowestBci].buy();
		break;
	}	
	console.log('Bought ' + lowestBci.toString());
} else {
	console.log('Bought Nothing. Waiting for Lucky Frenzy Value');
}
}

CookieBot.startClicker = function(){
	var bigCookie = document.getElementById('bigCookie');
	CookieBot.clicker = setInterval(function(){bigCookie.click()},0)
}

CookieBot.startGoldenClicker = function(){
	CookieBot.goldenClicker = setInterval(function(){
		if (Game.goldenCookie.life > 0 && Game.goldenCookie.wrath == 0 && Game.goldenCookie.l.style.display != 'none') {
			Game.goldenCookie.click();
		}		
	},3000)
}

CookieBot.startLoopBuyBest = function (time) {
	CookieBot.loopBuyBest = setInterval(function(){CookieBot.buyBest()},time)
	
}

CookieBot.stopClicker = function (){
	clearInterval(CookieBot.clicker);
}

CookieBot.stopGoldenClicker = function (){
	clearInterval(CookieBot.goldenClicker);
}

CookieBot.stopLoopBuyBest = function (){			
	clearInterval(CookieBot.loopBuyBest);
}

CookieBot.buyWrathIfAvaible = function (){
	if (Game.elderWrath > 0 && Game.Upgrades['Elder Pledge'].unlocked == 1 && Game.pledgeT == 0){
		Game.Upgrades['Elder Pledge'].buy();		
	}	
}

CookieBot.startLoopBuyWrathIfAvaible = function () {
	CookieBot.loopBuyWrathIfAvaible = setInterval(function(){CookieBot.buyWrathIfAvaible()},5000)
	
}

CookieBot.stopLoopBuyWrathIfAvaible = function (){
	clearInterval(CookieBot.loopBuyWrathIfAvaible);
}
