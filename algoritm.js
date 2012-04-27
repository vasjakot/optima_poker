function Select_EN(){
	ActiveDocument.Variables("vSuitFull").SetContent ("suit_full_en", true);
	ActiveDocument.Variables("vComb").SetContent ("comb_en", true);
	 
	ActiveDocument.Fields("Languages").UnLock();
	ActiveDocument.Fields("Languages").Select ("English");
	ActiveDocument.Fields("Languages").Lock();
}

// --- расчет комбинаций
function get_3(){
var v = ActiveDocument.GetVariable("vCount");//кол-во открытых карт
var numc = v.GetContent().String;
if ((numc<5)&& (numc>5))
	return 0;
var v = ActiveDocument.GetVariable("N");//кол-во противников
var numberPlayer = v.GetContent().String;
var v = ActiveDocument.GetVariable("vSel");//если есть коллизии
var warn = v.GetContent().String;
if (warn>0){
	qvlib.MsgBox("Неправильный выбор карт, попробуйте еще раз");
	return 0;
	}
//qvlib.MsgBox("правильный выбор");
//у нашего игрока

var nomin = new Array();//номинал карты
var mast = new Array();//масть карты

//на столе
var flopn = new Array();//масть карты
var flopm = new Array();//масть карты

i=0
//берем данные из открытых карт для нашего игрока
while (i < numc){
   	s = i+1;
   	str = "vSel";
   	str += s.toString();
   	str1 = str + "1";
	v = ActiveDocument.GetVariable(str);
	nomin[i] = v.GetContent().String;
	v = ActiveDocument.GetVariable(str1);
	mast[i] = v.GetContent().String;
   	i++;
   }

var fulCard = new Array();
fulCard = genColod(nomin, mast);
len = fulCard.length;

var tekNominPlayer = new Array();
tekNominPlayer = nomin;
var tekMastPlayer = new Array();
tekMastPlayer = mast;
var main = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var main1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
main1 = getProbably(tekNominPlayer, tekMastPlayer, main1);
var ssss = 0;
for(is=0;is<len;is++){
		temp = fulCard[is];
		tekMast = parseInt(temp.substr(0,1));
		tekNom = parseInt(temp.substr(1,2));
		tekNominPlayer.push(tekNom);
		tekMastPlayer.push(tekMast);
		for(js=is+1;js<len;js++){
			ssss++;
			temp = fulCard[js];
			tekMast = parseInt(temp.substr(0,1));
			tekNom = parseInt(temp.substr(1,2));
			tekNominPlayer.push(tekNom);
			tekMastPlayer.push(tekMast);
			main = getProbably(tekNominPlayer, tekMastPlayer, main);
			tekNominPlayer.pop();
			tekMastPlayer.pop();
			}
		tekNominPlayer.pop();
		tekMastPlayer.pop();
		}
		
for(is=0;is<9;is++)
	if(main1[is] == 1)
		main[is] = main[0]
		
var ev = new Array();
for(is=1;is<main.length;is++){
	ev[is-1] = ((main[is]/main[0])*100).toFixed(2);
	}
//qvlib.MsgBox(ev);
// ---
ActiveDocument.Variables("vSelGet3").SetContent (ev, true);

return ev;
}


function get_4(){
var v = ActiveDocument.GetVariable("vCount");//кол-во открытых карт
var numc = v.GetContent().String;
if ((numc<5)&& (numc>5))
	return 0;
var v = ActiveDocument.GetVariable("N");//кол-во противников
var numberPlayer = v.GetContent().String;
var v = ActiveDocument.GetVariable("vSel");//если есть коллизии
var warn = v.GetContent().String;
if (warn>0){
	qvlib.MsgBox("Неправильный выбор карт, попробуйте еще раз");
	return 0;
	}
//qvlib.MsgBox("правильный выбор");
//у нашего игрока

var nomin = new Array();//номинал карты
var mast = new Array();//масть карты

//на столе
var flopn = new Array();//масть карты
var flopm = new Array();//масть карты

i=0
//берем данные из открытых карт для нашего игрока
while (i < numc){
   	s = i+1;
   	str = "vSel";
   	str += s.toString();
   	str1 = str + "1";
	v = ActiveDocument.GetVariable(str);
	nomin[i] = v.GetContent().String;
	v = ActiveDocument.GetVariable(str1);
	mast[i] = v.GetContent().String;
   	i++;
   }

var fulCard = new Array();
fulCard = genColod(nomin, mast);
len = fulCard.length;

var tekNominPlayer = new Array();
tekNominPlayer = nomin;
var tekMastPlayer = new Array();
tekMastPlayer = mast;
var main = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var main1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

main1 = getProbably(tekNominPlayer, tekMastPlayer, main);
//qvlib.MsgBox(main1);
var ssss = 0;

for(is=0;is<len;is++){
		temp = fulCard[is];
		tekMast = parseInt(temp.substr(0,1));
		tekNom = parseInt(temp.substr(1,2));
		tekNominPlayer.push(tekNom);
		tekMastPlayer.push(tekMast);
		main = getProbably(tekNominPlayer, tekMastPlayer, main);
		tekNominPlayer.pop();
		tekMastPlayer.pop();
		}
for(is=0;is<9;is++)
	if(main1[is] == 1)
		main[is] = main[0]
//qvlib.MsgBox(main);
var ev = new Array();
for(is=1;is<main.length;is++){
	ev[is-1] = ((main[is]/main[0])*100).toFixed(2);
	}
//qvlib.MsgBox(ev);
// ---
ActiveDocument.Variables("vSelGet4").SetContent (ev, true);

return ev;
}


function getProbably(nom, mas, stain){

var leng = nom.length; 

//массив с номиналами
var chekNom   = new Array();
chekNom       = cheked(nom, 2, 14);
var restNom   = getNotNulEll(chekNom);

//с мастями
var chekMas   = new Array();
chekMas       = cheked(mas, 1, 4);
var restMas   = getNotNulEll(chekMas);
// есть ли стриит
var noStreet = 1;

if (chekNom<5)
	noStreet = 0;
//есть ли каре
var noKare = 1;
if (maxElement(chekNom) < 4)
	noKare = 0;
//есть ли Флэш	
var noFlash = 1;
if (maxElement(chekMas)<5)
	noFlash = 0;

var ssh         = 0;
var strong      = new Array();

var tempNominal = new Array();
tempNominal = equal(nom);
//проверeка на стрееты
if (noStreet == 1){
	listStreet = streets(tempNominal);
	//qvlib.MsgBox(listStreet);
	ssh = listStreet.length;
	if ((ssh > 0)&&(noFlash == 1)){
		tempNominal = equal(nom);
		listStreetFlash = streetFlash(listStreet, tempNominal, mas);
		//qvlib.MsgBox(listStreetFlash);
		s = listStreetFlash.length;
		if (s > 0){
				stain[8]++;
			}
		}
	}
//проверка на Карэ
if (noKare == 1){
	var kar = Pair(nom,4);
	if (kar.length > 0)
		stain[7]++;
	}

var noFul   = 0;
var fulhouse = new Array();
var filh = Pair(nom,3);
var pars = Pair(nom,2);
//var twopar = Pairs(nom,2);
	if (filh.length>0){
			if (filh.length>1){
				stain[6]++;
				noFul = 1;
			}	
			else{
				if (pars.length>0){
					stain[6]++;
					noFul = 1;
					}
			}			
	}

if (noFlash == 1){
	var f = flash(mas);
	if (f.length>0){
		stain[5]++;
		}
	};
	
if (ssh>0)
	stain[4]++
if (filh.length>0)
	stain[3]++
else{
	if (kar.length > 0)
		stain[3]++;
	}
if (pars.length > 1)
	stain[2]++
else{
	if ((noFul == 1) || ((kar.length>0)&&(pars.length > 0))||(filh.length>1))
		stain[2]++
	}
if (pars.length > 0){
	stain[1]++}
else{
	if ((filh.length>0) || (kar.length>0))
		stain[1]++
	}
stain[0]++;
return stain;
}

//главная функция
function push_me(){
var v = ActiveDocument.GetVariable("vCount");//кол-во открытых карт
var numc = v.GetContent().String;
var v = ActiveDocument.GetVariable("N");//кол-во противников
var numberPlayer = v.GetContent().String;
var v = ActiveDocument.GetVariable("vSel");//если есть коллизии
var warn = v.GetContent().String;
if (warn>0){
	qvlib.MsgBox("Неправильный выбор карт, попробуйте еще раз");
	return 0;
	}
//qvlib.MsgBox("правильный выбор");
//у нашего игрока

//собственные карты нашего игрока
var ownnomin = new Array();
var ownmast  = new Array();
i=0;
while (i < 2)
   {
   	s = i+1;
   	str = "vSel";
   	str += s.toString();
   	str1 = str + "1";
	v = ActiveDocument.GetVariable(str);
	ownnomin[i] = v.GetContent().String;
	v = ActiveDocument.GetVariable(str1);
	ownmast[i] = v.GetContent().String;
   	i++;
   }

var nomin = new Array();//номинал карты
var mast = new Array();//масть карты

//на столе
var flopn = new Array();//yjvbyfk карты
var flopm = new Array();//масть карты

i=0;
//берем данные из открытых карт для нашего игрока
while (i < numc)
   {
   	s = i+1;
   	str = "vSel";
   	str += s.toString();
   	str1 = str + "1";
	v = ActiveDocument.GetVariable(str);
	nomin[i] = v.GetContent().String;
	v = ActiveDocument.GetVariable(str1);
	mast[i] = v.GetContent().String;
   	i++;
   }
   
//берем данные из открытых карт стола
var s =0;
for(i=3;i<=numc;i++){
 	str = "vSel";
   	str += i.toString();
   	str1 = str + "1";
	v = ActiveDocument.GetVariable(str);
	flopn[s] = v.GetContent().String;
	v = ActiveDocument.GetVariable(str1);
	flopm[s] = v.GetContent().String;
   	s++;
 }
//var str = "sd";
//qvlib.MsgBox(str.substr(0,1));
//qvlib.MsgBox(str.substr(1,2));
if (numc<6)
	return 0;

//массив приоритетов
var pryor = new Array("None", "Pair", "two pair", "Troika", "Street", "Flash", "fulhouse", "kare",  "Street Flash", "Flash Rojal");

//все карты
var fulCard = new Array();
fulCard = genColod(nomin, mast);


var tekNominPlayer = new Array();
tekNominPlayer = nomin;
var tekMastPlayer = new Array();
tekMastPlayer = mast;
var tekNominAg = new Array();
tekNominAg = flopn;
var tekMastAg = new Array();
tekMastAg = flopm;
var len = fulCard.length;
//qvlib.MsgBox(len);
//return 0;
var temp;
var set;
var fraze;
var is = 0;
var js = 0;
var koef = 1/len;
//вероятность противника
var Per=0;
var prog1;
var prog2;
var tekss;
var fraze2;
tekss = (len-1)*(len-2);
koef1 = (2*100)/tekss;
var maPar = numberPlayer*koef*koef1;

var ssss = 0;
var tts;
var countWin = 0;

if (numc == 5){
var main = new Array(0,0,0,0,0,0,0,0,0);
	return 0;
	}


if (numc == 6){
	for(is=0;is<len;is++){
		temp = fulCard[is];
		tekMast = parseInt(temp.substr(0,1));
		tekNom = parseInt(temp.substr(1,2));
		tekNominPlayer.push(tekNom);
		tekMastPlayer.push(tekMast);
		tekNominAg.push(tekNom);
		tekMastAg.push(tekMast);
		set = getNewStrongHandNew(tekNominPlayer,tekMastPlayer,fraze);
		prog1 = set.pop();
		for(js=0;js<len;js++){	
			if (js != is){
				temp = fulCard[js];
				tekMast = parseInt(temp.substr(0,1));
				tekNom = parseInt(temp.substr(1,2));
				tekNominAg.push(tekNom);
				tekMastAg.push(tekMast);
				for(ks=js+1; ks<len ;ks++){
					if (ks != is){
						temp = fulCard[ks];
						tekMast = parseInt(temp.substr(0,1));
						tekNom = parseInt(temp.substr(1,2));
						tekNominAg.push(tekNom);
						tekMastAg.push(tekMast);
						set1 = getNewStrongHandNew(tekNominAg,tekMastAg,fraze2);
						prog2 = set1.pop();
						if (prog1<prog2){
							countWin++;}
						if (prog1 == prog2) {
							tts = comparedForce(set, set1, tekNom, tekMast, tekNominAg, tekMastAg, prog1);
							if (tts == 1)
								countWin++;
							}
						tekNominAg.pop();
						tekMastAg.pop();
						}
					}
				tekNominAg.pop();
				tekMastAg.pop();
				}
			}
			tekNominPlayer.pop();
			tekMastPlayer.pop();
			tekNominAg.pop();
			tekMastAg.pop();
		}
	Per = countWin*maPar;
	if (Per>100)
		Per = 100;
	var myPer = 100 - Math.round(Per);
	//записываем наши вероятности
	Test(Math.round(Per),"agProbab");
	Test(myPer,"plProbab");
	};
/*
if (numc == 7){
	maPar =  numberPlayer*koef1;
	set = getNewStrongHandNew(tekNominPlayer,tekMastPlayer,fraze);
	prog1 = set.pop();
	//qvlib.MsgBox(prog1);
	for(js=0;js<len;js++){	
			temp = fulCard[js];
			//qvlib.MsgBox(js);
			tekMast = parseInt(temp.substr(0,1));
			tekNom = parseInt(temp.substr(1,2));
			tekNominAg.push(tekNom);
			tekMastAg.push(tekMast);
			for(ks=js+1; ks<len ;ks++){
				//ssss++;
				temp    = fulCard[ks];
				tekMast = parseInt(temp.substr(0,1));
				tekNom  = parseInt(temp.substr(1,2));
				tekNominAg.push(tekNom);
				tekMastAg.push(tekMast);
				set1    = getNewStrongHandNew(tekNominAg,tekMastAg,fraze2);
				prog2   = set1.pop();
				//qvlib.MsgBox(prog2);
				if (prog1<prog2){
					countWin++;}
				if (prog1 == prog2) {
					//qvlib.MsgBox(prog2);
					tts = comparedForce(set, set1, tekNom, tekMast, tekNominAg, tekMastAg, prog1);
					if (tts == 1)
						countWin++;}
//					if (tts == 0)
//						qvlib.MsgBox(prog2);
				tekNominAg.pop();
				tekMastAg.pop();
			}
			tekNominAg.pop();
			tekMastAg.pop();
	}
	Per = countWin*maPar;
//	qvlib.MsgBox(Per);
	if (Per>100)
		Per = 100;
	var myPer = 100 - Math.round(Per);
	//записываем наши вероятности
	Test(Math.round(Per),"agProbab");
	Test(myPer,"plProbab");
	}
*/
if (numc == 7){
	//qvlib.MsgBox(ownmast);
	var gg = 0;
	gg = main_fun(ownnomin,ownmast, flopn, flopm);
	}

}


//вычисляем сильную руку нов
function getNewStrongHandNew(nom, mas, fraze){
var leng = nom.length; 

//массив с номиналами
var chekNom   = new Array();
chekNom       = cheked(nom, 2, 14);
var restNom   = getNotNulEll(chekNom);

//с мастями
var chekMas   = new Array();
chekMas       = cheked(mas, 1, 4);
var restMas   = getNotNulEll(chekMas);
// есть ли стриит
var noStreet = 1;

if (chekNom<5)
	noStreet = 0;
//есть ли каре
var noKare = 1;
if (maxElement(chekNom) < 4)
	noKare = 0;
//есть ли Флэш	
var noFlash = 1;
if (maxElement(chekMas)<5)
	noFlash = 0;

var ssh         = 0;
var strong      = new Array();

var tempNominal = new Array();
tempNominal = equal(nom);
//проверeка на стриты
if (noStreet == 1){
	listStreet = streets(tempNominal);
	ssh = listStreet.length;
	if ((ssh > 0)&&(noFlash == 1)){
		tempNominal = equal(nom);
		listStreetFlash = streetFlash(listStreet, tempNominal, mas);
		s = listStreetFlash.length;
		if (s > 0){
				strong = listStreetFlash;
				if (strong[strong.length-1] =="14"){
							fraze = 9;
					}
				else{
				//fraze = "Street Flash";
				fraze = 8;
				//Test(fraze,"myP");
					}
				strong.push(fraze);
				//qvlib.MsgBox(strong)
				return strong;
			}
		else{
			strong = listStreet;
			//fraze = "Street";
			fraze = 4;
			//Test(fraze,"myP");
			}
		}
	}
//проверка на Карэ
if (noKare == 1){
	var kar = Pair(nom,4);
	if (kar.length > 0){
		//fraze = "kare";
		fraze = 7;
		//Test(fraze,"myP");
		kar.push(fraze);
		return kar;
		}
	}

var noPair = 0;
var fulhouse = new Array();
var filh = Pair(nom,3)
var pars = Pair(nom,2);
	if (filh.length>0){
			if ((pars.length>0)||(filh.length == 2)){
				//fraze="fulhouse";
				noPair = 1;
				fraze = 6;
				//Test(fraze,"myP");
				if (filh.length == 2){
					fulhouse[0] = filh[0];
					fulhouse[1] = filh[1];
					}
				else{
					var temps  = pars.length-1;
					fulhouse[0] = pars[temps];
					temps = filh.length-1
					fulhouse[1] = filh[filh.length-1];
					}
				fulhouse.push(fraze);
				return fulhouse;
			}			
	}

if (noFlash == 1){
	var f = flash(mas);
	if (f.length>0){
		var newF = new Array();
		newF.push(f);
		//fraze="flash";
		fraze = 5;
		//Test(fraze,"myP");
		newF.push(fraze);
		return newF;		
		}
	};
	
if (ssh>0){	
	//fraze = "Street";
	fraze = 4;
	//Test(fraze,"myP");
	strong.push(fraze);
	return strong;
	}	

if (filh.length>0){
	//fraze = "Troika"
	fraze = 3;
	//Test(fraze,"myP");
	filh.push(fraze);
	return filh;
	};


if (pars.length == 2){
	//fraze = "dvoika";
	fraze = 2;
	//Test(fraze,"myP");
	pars.push(fraze);
	return pars;
	}
if (pars.length == 1){
	//fraze = "pair";
	fraze = 1;
	//Test(fraze,"myP");
	pars.push(fraze);
	return pars;
	}

//fraze = "None";
fraze = 0;
var empty = new Array();
empty.push(fraze);
//Test(fraze,"myP");
return empty;
}

function temp_sums2(){
var tableQ  = ActiveDocument.GetSheetObject( "ADM_TB" );
var RowsQ   = tableQ.GetRowCount();
var nominal = Array();
var mastj   = Array();
var fraze2;
var temp;
var RowIter;
for(RowIter = 0;RowIter <= RowsQ-1; RowIter++){
	code    = tableQ.GetCell(RowIter, 0).Text;
	nominal = parse_string(code, 0);
	mastj   = parse_string(code, 1);
	set1    = getStrongHand(nominal, mastj,fraze2);
	sila    = ActiveDocument.GetVariable("myP");
	temp    = sila.GetContent().String;
 	//qvlib.MsgBox(temp);
 	//qvlib.MsgBox(RowIter);
	tableQ.SetInputFieldCell(RowIter, 1, temp);
	};
return 0;
}



function main_fun(ownCardNomPlayer, ownCardMasPlayer, tableCardNom, tableCardMas){
//карты игрока
/*
var ownCardNomPlayer = new Array(8,6);
var ownCardMasPlayer = new Array(1,1);
*/
//карты на столе
//кикер
/*
var tableCardNom     = new Array(7,10,11,13,2);
var tableCardMas     = new Array(4,2, 4,4,1);
*/

//пара
//1 пара на столе

/*
var tableCardNom     = new Array(7,11,11,13,2);
var tableCardMas     = new Array(4,1, 4,4,1);
*/
//пара у нас
/*
var tableCardNom     = new Array(7,10,11,13,2);
var tableCardMas     = new Array(4,4, 4,4,1);
ownCardNomPlayer[1]  = 8;
ownCardMasPlayer[1]  = 2;
*/
//только одна карта пары у нас
/*
var tableCardNom     = new Array(7, 8, 11,13,2);
var tableCardMas     = new Array(4, 2, 4,4,1);
ownCardNomPlayer[1]  = 8;
ownCardMasPlayer[1]  = 1;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 1;*/

//работаем на двух парах
//карты частично у игрока наполовину
/*var tableCardNom     = new Array(7, 8, 10,13,2);
var tableCardMas     = new Array(4, 2, 3,4,1);
ownCardNomPlayer[1]  = 8;
ownCardMasPlayer[1]  = 1;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 1;

*/
//у нас две карты пары
/*
var tableCardNom     = new Array(7, 10, 10,13,2);
var tableCardMas     = new Array(4, 2, 3,4,1);
ownCardNomPlayer[1]  = 8;
ownCardMasPlayer[1]  = 1;
ownCardNomPlayer[0]  = 8;
ownCardMasPlayer[0]  = 2;
*/
//все на столе
/*
var tableCardNom     = new Array(7, 10, 10,8,8);
var tableCardMas     = new Array(4, 2, 3,1,2);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 2;
ownCardMasPlayer[0]  = 1;
*/
//одна карта у нас
/*
var tableCardNom     = new Array(7, 10, 10,2,8);
var tableCardMas     = new Array(4, 2, 3,1,2);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 8;
ownCardMasPlayer[0]  = 1;
*/
//на тройке
/*
//только одна карта у нас
var tableCardNom     = new Array(7, 10, 10,2,8);
var tableCardMas     = new Array(4, 2, 3,1,2);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 1;
*/
//две карты у нас
/*
var tableCardNom     = new Array(7, 10, 13,2,8);
var tableCardMas     = new Array(4, 2, 4,1,2);
ownCardNomPlayer[1]  = 10;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 1;
*/
//нет карт у нас
/*
var tableCardNom     = new Array(7, 10, 10,10,11);
var tableCardMas     = new Array(4, 2, 3,4,4);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 2;
ownCardMasPlayer[0]  = 1;
*/

//стриит
/*
var tableCardNom     = new Array(7, 8, 9,10,14);
var tableCardMas     = new Array(4, 2, 3,3,3);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 11;
ownCardMasPlayer[0]  = 4;
*/
/*
var tableCardNom     = new Array(7, 12, 9,10,13);
var tableCardMas     = new Array(4,  2, 3, 2,3);
ownCardNomPlayer[1]  = 6;
ownCardMasPlayer[1]  = 1;
ownCardNomPlayer[0]  = 8;
ownCardMasPlayer[0]  = 1;
*/
/*
var tableCardNom     = new Array(7, 8, 9,10,11);
var tableCardMas     = new Array(4, 2, 3,3,4);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 14;
ownCardMasPlayer[0]  = 3;
*/
//флэш
/*
var tableCardNom     = new Array(2, 13, 9,10,5);
var tableCardMas     = new Array(3, 3, 3,3,3);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 11;
ownCardMasPlayer[0]  = 4;
*/
/*
var tableCardNom     = new Array(2, 13, 9,11,5);
var tableCardMas     = new Array(3, 3, 3,4,3);
ownCardNomPlayer[1]  = 13;
ownCardMasPlayer[1]  = 4;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 3;
*/
/*
var tableCardNom     = new Array(2, 13, 13,11,5);
var tableCardMas     = new Array(3, 3, 4, 4,3);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 10;
ownCardMasPlayer[0]  = 3;
*/
//фулхаус
/*
var tableCardNom     = new Array(2, 13, 13,13,5);
var tableCardMas     = new Array(3, 3, 4, 2,3);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 9;
ownCardMasPlayer[0]  = 4;
*/
/*
var tableCardNom     = new Array(2, 13, 13,13,13);
var tableCardMas     = new Array(3, 3, 4, 2,1);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 9;
ownCardMasPlayer[0]  = 4;
*/

//каре
/*
var tableCardNom     = new Array(2, 13, 13,2,13);
var tableCardMas     = new Array(3, 3, 4, 2,1);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 13;
ownCardMasPlayer[0]  = 2;
*/
/*
var tableCardNom     = new Array(14, 13, 13,14,13);
var tableCardMas     = new Array(3, 3, 4, 2,1);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 13;
ownCardMasPlayer[0]  = 2;
*/
//стриит флэш
/*
var tableCardNom     = new Array(3, 4, 5,6,7);
var tableCardMas     = new Array(4, 4, 4, 4,4);
ownCardNomPlayer[1]  = 9;
ownCardMasPlayer[1]  = 3;
ownCardNomPlayer[0]  = 13;
ownCardMasPlayer[0]  = 2;
*/



//все открытые карты
var alCardNom        = ownCardNomPlayer.concat(tableCardNom);
var alCardMas        = ownCardMasPlayer.concat(tableCardMas);

//считаем силу стола и нашего игрока
var fraze;
var fraze1;
var setOwmPl         = getNewStrongHandNew(alCardNom,alCardMas,fraze);
var setTable         = getNewStrongHandNew(tableCardNom, tableCardMas, fraze1);
var forceOwn         = setOwmPl.pop();
var forceTab         = setTable.pop();
var tagForce         = 0;
var tagCards         = 0;
var nomLastCards;
var set              = setOwmPl;
//хэш карт 0 - карта закрыта, 1 - открыта
var hash = new Object();
hash = genHash(alCardMas,alCardNom);

//массив приоритетов
var pryor    		= new Array("None", "Pair", "two pair", "Troika", 
								"Street", "Flash", "fulhouse", "kare",  
								"Street Flash", "Flash Rojal");
//сколько осталось карт
var coun_list_pryor = new Object();
coun_list_pryor     = {"None":5, "Pair":3, "two pair":1, "Troika":2, 
				  	   "Street":0, "Flash":0, "fulhouse":0, "kare":1, 
				  	   "Street Flash":0,  "Flash Rojal":0};

	
//ищем кикер в оствшихся картах 	
var lastCardNomPl   = new Array();
var lastCardMasPl   = new Array();
var lastCardNomTab  = new Array();
var lastCardMasTab  = new Array();
var tempMas         = new Array();
var itter;
var masStreet;
var tempCardNom;
//если пара
if ((forceOwn == 1) ||(forceOwn == 3)){
	if (set[0] != alCardNom[0]){
		lastCardNomPl.push(alCardNom[0]);
		lastCardMasPl.push(alCardMas[0]);
		}
	if (set[0] != alCardNom[1]){
		lastCardNomPl.push(alCardNom[1]);
		lastCardMasPl.push(alCardMas[1]);
		}
	for(itter=0;itter<5;itter++){
		if (tableCardNom[itter] != set[0]){
			lastCardNomTab.push(tableCardNom[itter]);
			lastCardMasTab.push(tableCardMas[itter]);
			}
		}
	}

	
//если две пары или фулхаус
if ((forceOwn == 2)||(forceOwn == 6)){
	if ((set[0] != alCardNom[0]) && (set[1] != alCardNom[0])){
		lastCardNomPl.push(alCardNom[0]);
		lastCardMasPl.push(alCardMas[0]);
		}
	if ((set[0] != alCardNom[1]) && (set[1] != alCardNom[1])){
		lastCardNomPl.push(alCardNom[1]);
		lastCardMasPl.push(alCardMas[1]);
		}
	for(itter=0;itter<5;itter++){
		if ((tableCardNom[itter] != set[0]) && (tableCardNom[itter] != set[1])){
			lastCardNomTab.push(tableCardNom[itter]);
			lastCardMasTab.push(tableCardMas[itter]);
			}
		}
	}

//если карэ, set возвращает карту
if (forceOwn == 7){
    var tempCardMas ;
	var kar = Pair(alCardNom,4);

	if (alCardNom[0] != kar[0]){
		lastCardNomPl.push(alCardNom[0]);
		lastCardMasPl.push(alCardMas[0]);
		}
	if (alCardNom[1] != kar[0]){
		lastCardNomPl.push(alCardNom[1]);
		lastCardMasPl.push(alCardMas[1]);
		}
	for(itter=0;itter<5;itter++){
		if (tableCardNom[itter] != kar[0]){
			lastCardNomTab.push(tableCardNom[itter]);
			lastCardMasTab.push(tableCardMas[itter]);
			}
		}
	}
	
//если флэш, set[0] возвращает масть
if (forceOwn == 5){
	var tempMas1 = new Array();
	tempMas  = getNom(alCardNom,alCardMas,set[0]);
	tempMas.sort(CompareForSort);
	tempMas1 = equal(tempMas);
	tempMas.slice(tempMas.length, tempMas.length-5);
	var flashArray = new Array();
	flashArray = equal(tempMas);
	
	if (alCardMas[0] != set[0]){
		lastCardNomPl.push(alCardNom[0]);
		lastCardMasPl.push(alCardMas[0]);
		}
	if (alCardMas[1] != set[0]){
		lastCardNomPl.push(alCardNom[1]);
		lastCardMasPl.push(alCardMas[1]);
		}
	for(itter=0;itter<5;itter++){
		if (tableCardMas[itter] != set[0]){
			lastCardNomTab.push(tableCardNom[itter]);
			lastCardMasTab.push(tableCardMas[itter]);
			}
		}
	}
//найдем масть стреет флэша
if(forceOwn == 8){
	var masMas = new Array();
	var masStreet ;
	var tttt = alCardNom.length;
	for(itter=0;itter<5;itter++)
		masMas[itter] = 0;
		
	for(itter=0;itter<tttt;itter++)
		masMas[alCardMas[itter]] = masMas[alCardMas[itter]] +1;
		
	for(itter=0;itter<5;itter++){
		if (masMas[itter]>4)
			masStreet = itter;
		};
	}

if (forceOwn == forceTab)
	tagForce = 1;



//однокарточный массив
var masOne = new Array();
//двухкарточный массив
var masTwo = new Array();
//временный массив
var pp = new Array();
var ppn = new Array();
var ppt = new Array();
var flMasOne = new Array();
var flNomOne = new Array();
var flMasTwo = new Array();
var flNomTwo = new Array();

var stMasOne = new Array();
var stNomOne = new Array();
var stMasTwo = new Array();
var stNomTwo = new Array();

var startEl;
var h;
var s;
var ex = 0;
var lenh;
var numE;
//работаем на текущей силе
if(forceOwn == 0){
		//если кикер
		pp = masPrior(alCardNom,5);
		if (ownCardNomPlayer[0]>ownCardNomPlayer[1]){numE = 0;}else{numE = 1;};
		//если не элемент
		if (isEl(numE, pp) == 1)
			startEl = alCardNom[pp[pp.length-1]]+1;
		else
			startEl = alCardNom[numE]+1;
		for(itter = startEl;itter<15;itter++)
			masOne.push(itter);
		}

//у нас пара
if(forceOwn == 1){
	//ищем те пары на которых противник выйграет в общем случае
	lenh = lastCardNomPl.length;
	ppn  = lastCardNomPl.concat(lastCardNomTab);
	for(itter=0;itter<lastCardNomTab.length;itter++){
		if(tableCardNom[itter] > set[0])
			masOne.push(tableCardNom[itter]);	
		};
	//пара у нас
	if (lenh == 0){
	   h = masTwo.length;
	   for(itter=set[0]+1;itter<15;itter++){
	       masTwo[h] = new Array();
		   masTwo[h].push(itter);
		   masTwo[h].push(itter);
		   h++
	       }
	   };
     //одна карта у нашего игрока то надо сравнивать по кикеру
	if (lenh > 0){
		ppt = masPrior(ppn,3);
		if (lenh == 1){
			numE = 0;
			};
		if (lenh == 2){
			if (ppn[0]>ppn[1]){numE = 0;}else{numE = 1;};
			}
		if (isEl(numE, ppt) == 1)
			startEl = ppn[ppt[2]]+1
		else
			startEl = ppn[numE]+1;
		h = masTwo.length;
		if (lenh == 1){
			for(itter=startEl;itter<15;itter++){
				masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(set[0]);
				h++
				}
			};
		//у нас 2 карты карт
		if (lenh == 2){
			for(itter=startEl;itter<15;itter++)
				masOne.push(itter);
			}
		}
	}






//у нас две пары
if(forceOwn == 2){
    //set[0]>set[1]
	lenh    = lastCardNomPl.length;
	ppn     = lastCardNomPl.concat(lastCardNomTab);
	ppt     = masPrior(ppn,1);
	var sss = new Array();
	h = masTwo.length;
	for(itter = 0; itter<lastCardNomTab.length; itter++){
	   for(itter1 = itter+1; itter1<lastCardNomTab.length; itter1++){
	       if (lastCardNomTab[itter]>lastCardNomTab[itter1]){
	           var firstC = lastCardNomTab[itter];
	           var secC = lastCardNomTab[itter1];
	           }
	        else{
              var firstC = lastCardNomTab[itter1];
	           var secC = lastCardNomTab[itter];
	           };
	       if( (firstC>set[1]) || ((firstC == set[1]) && (secC>set[0]))){
	           masTwo[h] = new Array();
    			masTwo[h].push(secC);
    			masTwo[h].push(firstC);
    			h++;
	           }
	       }
	   }

	//карты лежат на столе то обределяем последний кикер
	if (lenh == 2){
		if (ppn[0]>ppn[1]){numE = 0;}else{numE = 1;};
		if (isEl(numE,ppt) == 1){
			startEl = ppn[ppt[0]]+1
			}
		else{
			startEl = ppn[numE]+1;
			};
		for(itter=startEl;itter<15;itter++)
				masOne.push(itter);
		}

	
	//одна карта у нас
	if (lenh == 1){
		var tenCar;
		
		if ( lastCardNomPl[0] == set[0])
			tenCar = 0
		else
			tenCar = 1;
		var promCar;
		if (tenCar == 0)
		  promCar =  1
		 else
		  promCar = 0;
		h = masTwo.length;
        for(itter = set[tenCar]+1;itter<15;itter++){
            masTwo[h] = new Array();
			masTwo[h].push(itter);
			masTwo[h].push(itter);
			h++;
            }
		
		if (isEl(tenCar,ppt) == 1){
			startEl = ppn[ppt[0]]+1
			}
		else{
			startEl = ppn[tenCar]+1;
			};
		
		h = masTwo.length;
		for(itter=startEl;itter<15;itter++){
      	        masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(set[promCar]);
				h++;
			}
		}
	
	//если две карты у нас то ничья на паре в любом случае
	if (lenh == 0){
	   if (ownCardNomPlayer[0] == ownCardNomPlayer[1]){
	       if (ownCardNomPlayer[0]  == set[1])
	           startEl =  set[1]+1;
    	   if (ownCardNomPlayer[0]  == set[0])
	           startEl =  set[0]+1;
	       h = masTwo.length;
		   for(itter=startEl;itter<15;itter++){
	          masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(itter);
				h++;
			  }
	       }
	   }
	}


	

//у нас тройка
if(forceOwn == 3){
	lenh    = lastCardNomPl.length;
	ppn     = lastCardNomPl.concat(lastCardNomTab);
	ppt     = masPrior(ppn,2);
	h = masTwo.length;
	for(itter=0;itter<lastCardNomTab.length;itter++){
		if(lastCardNomTab[itter] > set[0]){
 	      masTwo[h] = new Array();
			masTwo[h].push(lastCardNomTab[itter]);
			masTwo[h].push(lastCardNomTab[itter]);
			h++;
			};
		};
	//если карты на столе выигрываем на кикере
	if (lenh == 2){
		if (ppn[0]>ppn[1]){numE = 0;}else{numE = 1;};
		if (isEl(numE,ppt) == 1){
			startEl = ppn[ppt[0]]+1
			}
		else{
			startEl = ppn[numE]+1;
			};
		for(itter=startEl;itter<15;itter++)
			masOne.push(itter);
		};
	//одна карта у нас то добавляем ее также противнику и смотрим выигрываем ли мы на кикере
	if  (lenh == 1){
	   if (lastCardNomPl[0] > set[0]){numE = 0;}else{numE = 1;};
		if (isEl(numE,ppt) == 1)
			startEl = ppn[ppt[numE]]+1
		else
			startEl = ppn[numE]+1;
		h = masTwo.length;
		for(itter=startEl;itter<15;itter++){
		        masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(set[0]);
				h++;
			}
		}
	//кода у нас две карты - мы проигрываем
	}
	



//у нас стрит
if(forceOwn == 4){
	//set - пять последовательных карт set[0]-set[4]
	if (set[4]<14){
    	var ttStMas;
    	tempSt = equal(tableCardNom);
    	ttStMas = streets_dif(tableCardNom,1);
    	
    	for(itter=0;itter<ttStMas.length;itter++){
    	      tempSt.push(ttStMas[itter]);   
    	      var listSt = streets(tempSt);
    	      if (listSt[4]>set[4]){
    	           masOne.push(ttStMas[itter]);
	          }
    	   }
    	tempSt = equal(tableCardNom);
    	ttStMas = streets_dif(tableCardNom,2);
    	//printv(ttStMas);
    	for(itter=0;itter<ttStMas.length;itter++){
    	       var firs1 = ttStMas.pop();
    	       var firs2 = ttStMas.pop();
               tempSt.push(firs1);
               tempSt.push(firs2);
               var listSt = streets(tempSt);
               h = masTwo.length;
    	      if (listSt[4]>set[4]){          
    	           masTwo[h] = new Array();
    	           masTwo[h].push(firs1);
       	           masTwo[h].push(firs2);
	          }
	       }    
	    }
	 }


//у нас флэш
if(forceOwn == 5){
	//var pp = 0;//что-то делать
	lenh    = lastCardNomPl.length;
	var highCard;
	var ttg;
	//все карты на столе
	if ((lenh == 1)||(lenh == 2)){
		 highCard = flashArray[flashArray.length - 1]+1;
		 ttg = flNomOne.length;
		 for(itter = highCard;itter<15;itter++){
		 	flNomOne[ttg] = itter;
		 	flMasOne[ttg] = set[0];
		 	ttg++;
		 	}
		}
	//у нас есть 2 карты этой масти
	if (lenh == 0){
		//tempMas1 все карты данной масти которые на столе
		if (ownCardNomPlayer[0]>ownCardNomPlayer[1])
			highCard = ownCardNomPlayer[0]+1
		else
			highCard = ownCardNomPlayer[1]+1;
		ttg = flNomTwo.length;
		var itter1;
		for(itter = highCard; itter<15;itter++){
			for(itter1 = itter+1;itter1<15;itter1++){
				if ((isEl(itter,tempMas1) == 1) && (isEl(itter1,tempMas1) == 1)){
					flNomTwo[ttg] = new Array();
					flNomTwo[ttg].push(itter);
					flNomTwo[ttg].push(itter1);
					flMasTwo[ttg] = new Array();
					flMasTwo[ttg].push(set[0]);
					flMasTwo[ttg].push(set[0]);
					}
				}
			}
		}
	}
/*
alert("сила равна");
alert(forceOwn);
alert("теперь");
//первый масив
alert("asf");
printv(flNomOne);
printv(flMasOne);
//
alert("asf");
printv(flNomTwo);
printv(flMasTwo);


return 0;		*/




//у нас фулхаус set[0] наибольшая пара, set[1] фулхаус
if(forceOwn == 6){
	lenh    = lastCardNomPl.length;
	var templen = lastCardNomTab.length;
	//если фулхаус на столе то выигрываем когда у нас сильнее пара 
	if (lenh == 2){
		h = masTwo.length;
		for(itter = set[0]+1;itter<15;itter++){
		  masTwo[h] = new Array();
			masTwo[h].push(iter);
			masTwo[h].push(iter);
			h++;
			}
		}
	if (lenh == 1){
		//если у нас трешка
		if (templen == 0)
			lastCardNomTab[0] = set[0];
			
		if (lastCardNomTab[0]>set[1]){
			h = masTwo.length;
			 masTwo[h] = new Array();
			masTwo[h].push(lastCardNomTab[0]);
			masTwo[h].push(lastCardNomTab[0]);
			};
		if (set[0] == lastCardNomPl[0]){
			if (lastCardNomTab[0]>set[0]){
				h = masOne.length;
				masOne.push(lastCardNomTab[0]);
				}
			h = masTwo.length;
			for(itter = set[0]+1;itter<15;itter++){
			      masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(itter);
				h++;
				}
			}
		}
	//две карты у нас
	if (lenh == 0){
		if (templen == 1){lastCardNomTab[1] == set[0]};
		//пара всегда есть
		
		if ((lastCardNomTab[0] == lastCardNomTab[1]) &&(lastCardNomTab[0]>set[1]))
			masOne.push(lastCardNomTab[0]);
			
		if (lastCardNomTab[0]>set[1]){
			h = masTwo.length;
			 masTwo[h] = new Array();
			masTwo[h].push(lastCardNomTab[0]);
			masTwo[h].push(lastCardNomTab[0]);
			h++;
			};
		if (lastCardNomTab[1]>set[1]){
		   masTwo[h] = new Array();
			masTwo[h].push(lastCardNomTab[1]);
			masTwo[h].push(lastCardNomTab[1]);
			h++;
			}
		//пара у нас
		if ((ownCardNomPlayer[0] == set[0])&&(ownCardNomPlayer[1] == set[0])){
			if (lastCardNomTab[0]>set[0])
				masOne.push(lastCardNomTab[0]);
			if (lastCardNomTab[1]>set[0])
				masOne.push(lastCardNomTab[1]);
			h = masTwo.length;
			for(itter = set[0]+1;itter<15;itter++){
			     masTwo[h] = new Array();
				masTwo[h].push(itter);
				masTwo[h].push(itter);
				h++;
				}
			}
		}
	}

//считаем что фулхаус все ок

//каре
if(forceOwn == 7){
	lenh    = lastCardNomPl.length;
	
	//если на столе
	if (lenh == 2){
		ppn     = lastCardNomPl.concat(lastCardNomTab);
		ppt     = masPrior(ppn,1);
		if (ppn[0]>ppn[1]){numE = 0;}else{numE = 1;};
		if (isEl(numE,ppt) == 1){
			startEl = ppn[ppt[0]]+1
			}
		else{
			startEl = ppn[numE]+1;
			};
		for(itter=startEl;itter<15;itter++)
				masOne.push(itter);
		}
	//одна карта у нас
	else{
		if ((lastCardNomTab[0] == lastCardNomTab[1])&&(lastCardNomTab[0]>set[0])){
			h = masTwo.length;
			masTwo[h] = new Array();
			masTwo[h].push(lastCardNomTab[0]);
			masTwo[h].push(lastCardNomTab[0]);
			}
		}
	}



//street flash
if(forceOwn == 8){
    if (set[4]<14){
    var ttStMas;
    var arOfNew = new Array();
    var hh = 0;
    for(itter=0;itter<tableCardMas.length;itter++){
        if (tableCardMas[itter] == masStreet){
            arOfNew[hh] = tableCardNom[itter];
            hh++
            }
        }
	tempSt = equal(arOfNew);
	ttStMas = streets_dif(arOfNew,1);
	
	for(itter=0;itter<ttStMas.length;itter++){
	      tempSt.push(ttStMas[itter]);   
	      var listSt = streets(tempSt);
	      if (listSt[4]>set[4]){
	           stNomOne.push(ttStMas[itter])
        	   stMasOne.push(masStreet)
	       }
	   }
	tempSt = equal(arOfNew);
	ttStMas = streets_dif(arOfNew,2);
	//printv(ttStMas);
	for(itter=0;itter<ttStMas.length;itter++){
	       var firs1 = ttStMas.pop();
	       var firs2 = ttStMas.pop();
           tempSt.push(firs1);
           tempSt.push(firs2);
           var listSt = streets(tempSt);
           h = masTwo.length;
	      if (listSt[4]>set[4]){
	           stNomTwo[h] = new Array();
 				stMasTwo[h] = new Array();
       			stNomTwo[h].push(firs1);
		     	stNomTwo[h].push(firs2);	
   				stMasTwo[h].push(masStreet);
       			stMasTwo[h].push(masStreet);
	       }       
      }
     }
   } 

/*
alert(forceOwn);
alert(stNomOne);
alert(stMasOne);
alert(stNomTwo);
alert(stMasTwo);
*/





var chekMas   = new Array();
chekMas       = cheked(tableCardMas, 0, 4);
var restMas   = getNotNulEll(chekMas);
var fff = maxElement(chekMas);
var flagMast;
for(itter=0;itter<5;itter++){
    if (chekMas[itter] == fff)
        flagMast = itter;
    }
var dvoika = Pair(tableCardNom,2);
var troika = Pair(tableCardNom,3);

		
for(itter=forceOwn+1; itter<9; itter++){
	//у нас кикер
	if(itter == 1){
		//у нас только старшая карта делаем нас на паре
		var dlin = tableCardNom.length;
		for(itter1=0;itter1<dlin;itter1++)
			masOne.push(tableCardNom[itter1]);
		}
	if(itter == 2){
		//у нас может быть ничего а может быть пара выигрывать надо на двух парах
		var pars = dvoika;
		var dlin = tableCardNom.length;
		if (pars.length>0){
			for(itter1=0;itter1<dlin;itter1++){
				if (pars[0] != tableCardNom[itter1])
					masOne.push(tableCardNom[itter1]);
				}
			}
		else{
			var itter2;
			h = masTwo.length;
			for(itter1=0;itter1<dlin;itter1++){
				for(itter2=itter1+1;itter2<dlin;itter2++){
    				masTwo[h] = new Array();
					masTwo[h].push(tableCardNom[itter1]);		
					masTwo[h].push(tableCardNom[itter2]);
					h++;
					}
				}
			}
		}
	if(itter == 3){
		//у нас две пары или одн, делаем нас на тройках
		var dlin = tableCardNom.length;
		var pars = dvoika;
		if (pars.length == 0){
			h = masTwo.length;
			for(itter1=0;itter1<dlin;itter1++){
				for(itter2=itter1+1;itter2<dlin;itter2++){
				    masTwo[h] = new Array();
					masTwo[h].push(tableCardNom[itter1]);		
					masTwo[h].push(tableCardNom[itter2]);
					h++;
					}
				}
			}
		if (pars.length == 1){
			h = masTwo.length;
			masOne.push(pars[0]);
			for(itter1=0;itter1<dlin;itter1++){
				for(itter2=itter1+1;itter2<dlin;itter2++){
					if ((pars[0] != tableCardNom[itter1]) && (pars[1] != tableCardNom[itter2]) ){
					   masTwo[h] = new Array();
						masTwo[h].push(tableCardNom[itter1]);		
						masTwo[h].push(tableCardNom[itter2]);
						h++;
						}
					}
				}
			}
		if (pars.length == 1){
			h = masTwo.length;
			masOne.push(pars[0]);
			masOne.push(pars[1]);
			for(itter1=0;itter1<dlin;itter1++){
				if ((pars[0] != tableCardNom[itter1]) && (pars[0] != tableCardNom[itter2]) && (pars[1] != tableCardNom[itter1]) && (pars[1] != tableCardNom[itter2])){
				    masTwo[h] = new Array();
					masTwo[h].push(tableCardNom[itter1]);		
					masTwo[h].push(tableCardNom[itter2]);
					h++;
					}
				}
			}
		}
	if(itter == 4){
		//добиваем до стрита у нас ниже
		var tempStretMas;
		tempStretMas = streets_dif(tableCardNom,1);
		for(itter1=0; itter1<tempStretMas.length;itter1++)
			masOne.push(tempStretMas[itter1]);
		tempStretMas = streets_dif(tableCardNom,2);
		for(itter1=0; itter1<tempStretMas.length;itter1++){
			var tempiko = equal(tempStretMas[itter1]);
			masTwo.push(tempiko);
			}
		}
	if(itter == 5){
		//ищем 5 карт одной масти, запросто set[0] масть
		//alert(maxElement(chekMas));
		
		if (fff == 4 ){
		  	var tempMasiv = new Array();
		     for(itter1=0;itter1<tableCardNom.length;itter1++){
		          if (flagMast == tableCardMas[itter1])
		              tempMasiv.push(tableCardNom[itter1])
		          };
			//var tempMasiv  = getNom(tableCardNom,tableCardMas,flagMast);
			for(itter1=2;itter1<15;itter1++){
				if (isEl(itter1,tempMasiv)  == 1){
					flNomOne.push(itter1);
					flMasOne.push(flagMast);
					}
				}
			}
		if (fff == 3 ){
		      var tempMasiv = new Array();
			var tempMasiv  = getNom(tableCardNom,tableCardMas,flagMast);
			h= flNomTwo.length;
			for(itter1=2;itter1<15;itter1++){
				for(itter2=itter1+1;itter2<15;itter2++){
					if ((isEl(itter1,tempMasiv)  == 1)&&(isEl(itter2,tempMasiv)  == 1)){
						flNomTwo[h] = new Array();
						flNomTwo[h].push(itter1);
						flNomTwo[h].push(itter2);
						flMasTwo[h] = new Array();
						flMasTwo[h].push(flagMast);
						flMasTwo[h].push(flagMast);
						h++;
						}
					}
				}
			}
		}
	if(itter == 6){
		//делаем на фулхаусе
		var dlin = tableCardNom.length;
		var pars = troika;
		if (pars.length>0){
			for(itter1=0;itter1<dlin;itter1++){
				if (pars[0] != tableCardNom[itter1])
					masOne.push(tableCardNom[itter1]);
				}
			}
		else{
			h = masTwo.length;
			pars = dvoika;
			if (pars.length == 1){
				for(itter1=0;itter1<dlin;itter1++){
					if (pars[0] != tableCardNom[itter1]){
					   masTwo[h] = new Array();
						masTwo[h].push(tableCardNom[itter1]);
						masTwo[h].push(tableCardNom[itter1]);
						h++;
						}
					}
				}
			if (pars.length == 2){
				h = masTwo.length;
				masOne.push(pars[0]);
				masOne.push(pars[1]);
				for(itter1=0;itter1<dlin;itter1++){
					for(itter2=itter1+1;itter2<dlin;itter2++){
						if ((pars[0] != tableCardNom[itter1]) && (pars[1] != tableCardNom[itter2])){
						  masTwo[h] = new Array();
							masTwo[h].push(tableCardNom[itter1]);
							masTwo[h].push(tableCardNom[itter1]);
							h++;
							}
						}
					}
				}
			}
		};
	if(itter == 7){
		//делаем на каре
		var dlin = tableCardNom.length;
		var pars = troika;
		if (pars.length>0){
			masOne.push(pars[0]);
			}
		else{
			pars = dvoika;
			h = masTwo.length;
			for(itter1=0;itter1<pars.length;itter1++){
    			masTwo[h] = new Array();
				masTwo[h].push(pars[itter1]);
				masTwo[h].push(pars[itter1]);
				}
			};
		}
	if(itter == 8) {
		//делаем на стритфлеше
		if (maxElement(chekMas) == 4 ){
			var mm = flash_new(tableCardNom,4);
			var tempMasiv1  = getNom(tableCardNom,tableCardMas,mm);
			tempStretMas = streets_dif(tempMasiv1,1);
			h = stNomOne.length;
			for(itter1=0; itter1<tempStretMas.length;itter1++){
				stNomOne[h] = new Array();
				stMasOne[h] = new Array();
				stNomOne[h].push(tempStretMas[itter1]);
				stMasOne[h].push(masStreet);
				h++;
				}
			};
		if (maxElement(chekMas) == 3 ){
			var mm = flash_new(tableCardNom,3);
			var tempMasiv1  = getNom(tableCardNom,tableCardMas,mm);
			tempStretMas = streets_dif(tempMasiv1,2);
			h = stNomTwo.length;
			for(itter1=0; itter1<tempStretMas.length;itter1++){
				var tempa = tempStretMas[itter1];
				stNomTwo[h] = new Array();
				stNomTwo[h] = tempa;
				stMasTwo[h] = new Array();
				stNomTwo[h].push(mm);
				stNomTwo[h].push(mm);
				h++;
				};
			};
		};
	};
	
var tempMas = new Array();
var tempMas = stdset_new( undefMas(masOne));
var lenOne = tempMas.length;
var cc = new Object();
cc = makePair(tempMas);
var first;
var second;

for(itter=0;itter<masTwo.length;itter++){
	tempMas = undefMas(masTwo[itter]);
	if (tempMas.length == 2){
		first = tempMas[0];
		second = tempMas[1];
		/*if ((first>second) && ()){
			}*/
		}
	}


/*
alert(forceOwn);
alert("идут");
alert(masOne);
printv(masTwo);

//printMas(setOwmPl);	

alert("идут стритфлэши");
if (stNomOne.length>0){
    alert(stNomOne);
    alert(stMasOne);
	}
if (stNomTwo.length>0){
    alert(stNomTwo);
    alert(stMasTwo);
    }

alert("идут flash");
if (flNomOne.length>0){
    printv(flNomOne);
    //printv(flMasOne);
    }
//
if (flNomTwo.length>0){
    printv(flNomTwo);
    //printv(flMasTwo);
    }
    */

}

function undefMas(mas){
var len = mas.length;
var i;
var outp = new Array();
for(i=0;i<mas.length;i++){
	if (mas[i] != undefined)
		outp.push(mas[i]);
	}
return outp;
}

function alert(v){
qvlib.MsgBox(v);
}

//печать
function printv(v){
var itt;
for(itt=0;itt<v.length;itt++)
	alert(v[itt]);
}

function parse_string(strCards, flag){
var masCard = Array();
var temp    = Array();
var masiv   = Array();
masCard  = strCards.split(";");
var lent = masCard.length;
var iq;
for(iq=0;iq<lent;iq++){
	temp = masCard[iq].split("/");
	masiv[iq] = parseInt(temp[flag]);
	};
return masiv;
}

function comparedForce(force1, force2, nom1, mast1, nom2, mast2, prog){
var st = 0;

if (prog == 1){
	if (force1[0]<force2[0])
			st = 1	
	};
if (prog == 2){
	if (force1[1]<force2[1])
			st = 1;
	if ((force1[1]==force2[1]) &&(force1[0]<force2[0]))
			st = 1;
	//if ((force1[1]==force2[1]) &&(force1[0]==force2[0]))
		//qvlib.MsgBox("sfd");
			//st = 1;
	//qvlib.MsgBox("sfd");
	//qvlib.MsgBox(st);
	return st;
	};
if (prog == 3){
	if (force1<force2)
			st = 1;
	return st;
	};
if (prog == 5){
	var tempM1 = new Array();
	tempM1     = getMastCard(nom1, mast1, "M");
	var tempM1 = new Array();
	tempM1     = getMastCard(nom2, mast2, "M");
	var t1     = tempM1[force1];
	var t2     = tempM1[force2];
	if (maxElement(t2)>maxElement(t1))
		st = 1;
	return st;
	};
if (prog == 6){
	if (force1[1]<force2[1])
			st = 1;
	if ((force1[1]==force2[1]) &&(force1[0]<force2[0]))
			st = 1;
	return st;
	};
if (prog == 7){
	if (force1<force2)
			st = 1
	return st;
	};
if (prog == 8){
	if (force1[4]<force2[4])
		st = 1;
	return st;
	};
return st;
}

//максимальный элемент множества
function maxElement(masive){
var inc;
var temp = masive[0];
for(inc=1;inc<masive.length;inc++)
	if(masive[inc]>temp)
		temp = masive[inc];
return temp;
}

//генерируем отстаток карт
function genColod(nom, mas){
var tempMas = new Array();
tempMas = genCards(nom,mas);
var fulCards = new Array();
var h=0;
var temp;
var i;
var j;
var tempCount = mas.length;
var cnt = 0;
for(i=1;i<=4;i++){
	for(j=2;j<=14;j++){
		temp = i.toString() + j.toString();
		if (isEl(temp, tempMas) == 1){
				fulCards[h] = temp;
				h++;
			}
		else{
			//qvlib.MsgBox(temp);
			}
		}
	}
//qvlib.MsgBox("erfew");
//qvlib.MsgBox(h);
return fulCards;
}

//есть ли элемент в массиве
function isEl(el, mas){
var len = mas.length;
var flag=1;
for(i=0;i<len;i++){
	if (mas[i] == el)
		return 0;
	}
return 1;
}

//генерируем хэш карт
function genCards(nom,mas){
var len = nom.length;
var i;
var masive = new Array();
for(i=0;i<len;i++){
	masive[i] = mas[i]+nom[i]
	};
return masive;
}

// возвращает массив массивов
function getMastCard(nom, mas, keyWord){
var leng      = nom.length;
var ist       = 0;
var first     = new Array();
var secon     = new Array();
if (keyWord  == "M"){
	beginItem = 1;
	endItem   = 4;
	first     = mas;
	second	  = nom;
	}
else{
	beginItem = 2;
	endItem   = 14;
	first     = nom;
	second	  = mas;
	};

var cardMass = new Array();

for(ist = beginItem; ist <= endItem; ist++)
	cardMass[ist] = new Array();

for(ist = 0; ist < leng; ist++)
	cardMass[first[ist]].push(secon[ist]);
return cardMass;	
}

//ненулевые номиналы или мастей
function getNotNulEll(mas){
var lenh  = mas.length;
var count = 0;
for(iss = 0; iss < lenh; iss++){
	if(mas[iss] != 0)
		count++;
	};
return count;
}

//перенабираем новый массив
function equal(nom){
var i;
var temp;
var mas = new Array();
for(i=0;i<nom.length;i++){
	temp   = nom[i];
	mas[i] = temp;
	}
return mas;
}

//стрит флэш
function streetFlash(listStreet, nom, mast){
var s = flash(mast);
//qvlib.MsgBox(s);
if (s.length == 0)
	return 0;
var list = getNom(nom,mast,s);
var StreetFlash = new Array();
StreetFlash = streets(list);
return StreetFlash;
}

function getNom(nominal,masti,nomerMast){
var i;
var h=0;
//qvlib.MsgBox(masti);
//qvlib.MsgBox(nominal);
var masiv = new Array();
for(i=0;i<nominal.length;i++){
	if (masti[i] == nomerMast){
		masiv[h] =  nominal[i];
		h++;
		};
	}
return masiv;
}

//проверка на flash
function flash(mas){
var mainMas = new Array();
mainMas = cheked(mas, 1, 4);
//qvlib.MsgBox(mainMas);
var flag=0;
var nF = new Array();
for (i = 0; i <= 4; i++){
	if (mainMas[i]>4){
		nF.push(i);	}
		};
return nF;
}

//проверка на flash
function flash_new(mas,ss){
var mainMas = new Array();
mainMas = cheked(mas, 1, 4);
//qvlib.MsgBox(mainMas);
var flag=0;
var nF = new Array();
for (i = 0; i <= 4; i++){
	if (mainMas[i] == ss){
		nF.push(i);	}
		};
return nF;
}



function streets(mas){
var mainMas = new Array();
mainMas = stdset(mas);
var len = mainMas.length;
if (mainMas[len-1] == 14)
	mainMas = addOne(mainMas)
len = mainMas.length;
if (len<5)
	return 0;
var temp;
var temp1;
var diff;
var listStreet = new Array();
var ssv;
for(ssv=len; ssv>=5; ssv--){
	temp      = mainMas[ssv-1];
	temp1     = mainMas[ssv-5];
	diff 	  = parseInt(temp) - parseInt(temp1);
	if ( diff == 4){
			listStreet = mainMas.slice(ssv-5,ssv);
			return listStreet;
		}
	}
return listStreet;

}


//сколько нужно карт данной масти чтобы был флэш
function flash_dif(nom, mas, isum){
var flashMas = cheked(mas,1,4);
var lenh     = flashMas.length;
var is;
var flag     = new Array;
for(is = 0; is < lenh; is++){
	if (flahMas == isum)
		flag.push(is);
	};
return flag;
}

//сколько карт нужно до стрита
function streets_dif(mas,isum){
var mainMas = new Array();
var len = mainMas.length;
if (mainMas[len-1] == 14)
	mainMas = addOne(mainMas)
mainMas = stdset(mas);
var len = mas.length;
if (len < isum)
	return 0;
var temp;
var temp1;
var temp2;
var temp3;
var diff;
var izt;
var tempMas    = new Array();
var listStreet = new Array();
for(ssv = len; ssv >= isum; ssv--){
	temp      = mainMas[ssv-1];
	temp1     = mainMas[ssv-isum];
	diff 	  = parseInt(temp) - parseInt(temp1);
	if ( diff == (isum - 1)){
			temp3 = 5-isum+ssv;
			for(izt=ssv;izt<temp3;izt++){
				tempMas.push(izt+ssv);}
			listStreet.push(tempMas);
		}
	}
return listStreet;
}

//генерируем массив стритов
function genMas(BeginItem, count){
var mas = new Array();
var i;
for (i=0; i<count; i++)
		mas[i] =  parseInt(BeginItem) + i;
return mas;
}


//есть ли пары
function Pair(mas, с){
var mainMas = new Array();
mainMas = cheked(mas, 2, 14);
var flag=0;
var it = new Array();
var h = 0;
for (i = 2; i <= 14; i++){
	if (mainMas[i]==с){ 
		it[h] = i;
		h++;
		}
	};
if (it.length>2){
	return it.slice(-2);
	}
else{
	return it ;
	}
return 0;
}

//строим массив совпадений (по номиналу и например по мастям)
function cheked(mas, countBegin, countEnd){
var mainMas = new Array();
var s = mas.length;
for (i = countBegin; i <= countEnd; i++)
	{
		mainMas[i] = 0;
		for(j=0;j<s;j++){
			if (i == mas[j])
				mainMas[i] = mainMas[i] + 1;
		};
	};
return mainMas;
}

//строим множество, на входе непустой массив
function stdset(mas){
mas.sort(CompareForSort);
var j=0;
var flag = mas[j];
var set = new Array();
set[j] = flag;
for(i=1;i<mas.length;i++){
	if (flag != mas[i]){
		j++;
		set[j] = mas[i];
		flag   = mas[i]
		};
	}
return set;
}

//сеты упорядочены
function compareSet(set1, set2, n){
var flag = 1;
var i;
for(i=0; i<n;i++){
	if (set1[i] != set2[i])
		flag = 2;
	};
return flag;
}

function setDifference(set1, set2){
var n = set1.length;
var m = set2.length;
var list = new Array();
var temp1 = new Array();
var temp2 = new Array();
var flag = 0;
var h=0;
var i;
var j;
for(i=0; i<n; i++){
	temp1 = set1[i];
	for(j=0;j<m;j++){
		temp2 = set2[j];
		if (temp1[0] == temp2[0]){
			if (compareSet(temp1, temp2, 5) == 1){
				list[h] =new Array();
				list[h] = temp1;
				h++;
				flag = 1;
				}
			}
		}
	}
return list;
}

//добавляем 1 в нвчало если есть туз
function addOne(mas){
var h = 1 ;
var newmas = new Array();
newmas[0] = 1;
for (i = 0;i<mas.length; i++){
	newmas[h] = mas[i];
	h++;}
return newmas;
}

//выводим массив
function printMas(mas){
for(i=0;i<mas.length;i++)
	qvlib.MsgBox(mas[i]);
}

//функция сравнения
function CompareForSort(param1, param2){
var first = parseInt(param1);
var second = parseInt(param2);
if (first == second)
    return 0;
if (first < second)
    return -1;
else
   return 1;
}

function Test(i, y){
v = ActiveDocument.Variables(y);
v.SetContent(i,true)
};

function get () {
var v = ActiveDocument.GetVariable("vCalc");//кол-во открытых карт
var numc = v.GetContent().String;
If (numc == 1)
	return push_me ();
ActiveDocument.Variables("vCalc").SetContent (0,true)	
}


//max
function getMax(a,b){
if (a<b)
	return b
else
	return a;
}

//min
function getMin(a,b){
if (a<b)
	return a
else
	return b;
}

//колво вхождений елемента в массив
function numIsEl(el,mas){
var i;
var flag = 0;
for(i=0;i<mas.length;i++){
	if (el == mas[i])
		flag++;
	};	
return flag;
}

/*приоритет в номиналах карт, берем массив выводим массив i-й элемент которого есть i-по порядку убывания
предполагается что массив с неповторяющимися элементами
kol = 1,2,3,5 - кол-во больших номиналов которые мы ищем
*/
function masPrior(mas,kol){
var pr      = new Array();
var tempMas = new Array();
var stron   = new Object();
var len     = mas.length;
tempMas     = equal(mas);
var i;
for(i=0;i<len;i++)
	stron[tempMas[i]] = i;
tempMas.sort(CompareForSort);
for(i=0;i<len;i++)
	pr[i] = stron[tempMas[len-i-1]];

return pr.slice(0,kol)
}

//сравнить первый и второй массив
function compMass(mas1,mas2){
var len = mas1.length;
var i;
for(i=0;i<len;i++){
	if (mas1[i]<mas2[i])
		return 0;
	if (mas1[i]>mas2[i])
		return 1;
	};
return -1;
}


//заполняем нулями упорядоченый масив  sum - это шаг 1 или 2
function insert_nul(mas, sum){
var j			  = 0;
var tek			  = 0;
var temp          = mas[0];
var limit         = mas.length - 1;
var masDiferenc   = new Array(); 
var end;
var tenp          = mas[mas.length - 1] + parseInt(sum);
if (tenp <= 14)
	end           = tenp
else
	end           = 14;
while (j<= end){
	if (mas[tek] != j){
			masDiferenc.push(0);
		}
	else{
		tek++;
		masDiferenc.push(j);
		};
	j++
	}
//alert(mas);
return masDiferenc;
};

//массивы одинаковой длины, вычисляем массив рзностей
function difMasiv(mas1, mas2, sum){
var leng   = mas1.length;
var j;
var temp;
var chek   = 0;
var difMas = new Array();
for(j=0;j<leng;j++){
	if (mas1[j] != mas2[j]){
		chek++;
		t = parseInt(mas1[j]) - parseInt(mas2[j]);
		difMas.push(t);
		}
	}
if (chek == sum)
	return difMas
else
	return 0;
}

//сколько карт нужно до стрита
function streets_dif(mas,isum){
var mainMas = new Array();
var len     = mainMas.length;
if (mainMas[len-1] == 14)
	mainMas = addOne(mainMas)
mainMas = stdset_new(mas);
var len = mas.length;
if (len < (5 - isum))
	return 0;
//alert(mainMas);
var tempMas    = new Array();
var prMas      = new Array();
var listStreet = new Array();
var promMas    = new Array();
tempMas        = insert_nul(mainMas, isum);
//alert(tempMas);
var gen        = genMas(tempMas[0],  tempMas.length);
//alert(gen);
var ind;
var set        = tempMas.length - 4;
for (ind = 0; ind < set; ind++){
	promMas	   = difMasiv(gen.slice(ind,ind+5), tempMas.slice(ind,ind+5), isum);
	if (promMas.length>0){
		if (eqMas(promMas, prMas) == 0){
			listStreet.push(promMas);
			prMas = promMas;
			}
		}
	};
  

return listStreet;
}

//строим множество, на входе непустой массив
function stdset_new(mas){
var mas1 = new Array();
mas1 = equal(mas);
mas1.sort(CompareForSort);
var j=0;
var flag = mas1[j];
var set = new Array();
set[j] = flag;
for(i=1;i<mas1.length;i++){
	if (flag != mas1[i]){
		j++;
		set[j] = mas1[i];
		flag   = mas1[i]
		};
	}
return set;
}

function eqMas(mas1, mas2){
if (mas1.length != mas2.length)
	return 0;
var nt   = mas1.length;
var j
for(j=0;j<nt;j++)
	if (mas1[j] != mas2[j])
		return 0;
return 1;
}

//индекс карты
function strCard(i,j){
return  i.toString() + "/" + j.toString();;
}


//ХешКарты генерируем
function genHash(mas,nom){
var i;
var j;
var str;
var leng      = nom.length;
var hashCards = new Object();
var tempOb    = new Object();
for(i=0;i<leng;i++){
	str                    = mas[i].toString() + "/" + nom[i].toString();
	tempOb[str.toString()] = 1;
	};
for(i=1;i<5;i++){
	for (j=2;j<15;j++){
		str 		   = i.toString() + "/" + j.toString();
		if (tempOb[str.toString()] == 1)
			hashCards[str.toString()] = 1
		else
			hashCards[str.toString()] = 0;
		};
	};
return hashCards;
}

//генерируем карты из номиналов hash-хешь карт 1 - если карта открыта 0 - иначе
function genCardfromNom(masNom, hash, isum){
var len      = masNom.length;
var card     = new Array();
var tempMas  = new Array();
var tempCard = new Array();
var is;
var j;
var k;
var temp;
var firstCard;
var secondCard;
var str;
var str1;
var flag;
if (isum == 1){
	for(is=0;is<len;is++){
		temp = masNom[is];
		for(j=1;j<5;j++){
			str = strCard(j,temp)
			if (hash[str] == 0)	
				card.push(str);
			}
		}
	}
if (isum == 2){
	var h = 0;
	for(is=0;is<len;is++){
		tempMas    = masNom[is];
		firstCard  = tempMas[0];
		secondCard = tempMas[1];
		if (firstCard == secondCard){
			for(j=1;j<5;j++){
				for(k=1;k<5, j!=k;k++){
					str     = strCard(j,firstCard);
					str1    = strCard(k,secondCard);
					if ((hash[str] == 0)&&(hash[str1] == 0)){	
						card[h]    = new Array();
						card[h].push(str);
						card[h].push(str1);
						h++;
						}
					}
				} 
			}
		else{
			for(j=1;j<5;j++){
				for(k=1;k<5;k++){
					card[h] = new Array();
					str     = strCard(j,firstCard);
					str1    = strCard(k,seconfCard);
					if ((hash[str] == 0) && (hash[str1] == 0)){
						card[h]    = new Array();	
						card[h].push(str);
						card[h].push(str1);
						h++;
						}
					}
				} 
			}	
		}	
	}
return card;
}

//сравнение массивов
function compareTwoMas(mas1,mas2){
	if (((mas1[0] == mas2[1]) && (mas1[1] == mas2[0])) || ((mas1[0] == mas2[0]) && (mas1[1] == mas2[1])))
		return true
	else
		return false;
}

//какая пара круче, первый упорядочен 1 если mas2 больше 0 иначе
function comparePairTwo(mas1,mas2){
var tempMas = equal(mas2);
tempMas.sort(CompareForSort);
if (mas1[0]<mas2[0])
	return 1;
if ((mas1[0] == mas2[0]) &&(mas1[0]<mas2[0]))
	return 1;
return 0;
}

//строим пары значения mas в пределах  BeginItem, EndItem
function makePair(mas,BeginItem, EndItem){
var len      = mas.length;
var pareCard = new Array();
var tempCard = new Array();
var NewObj = new Object();
var h        = 0;
var i;
var j;
for(i=BeginItem;i<EndItem;i++){
	NewObj[i] = new Object;
	for(j=BeginItem;j<=i;j++){
		NewObj[i][j] = 0;
		}
	}
for(i=0;i<len;i++){
	for(j=BeginItem;j<=mas[i];j++)
		NewObj[mas[i]][j] = 1;
		
	for(j=BeginItem;j<=mas[i];j++){
		NewObj[j][mas[i]] = 1;
		}
	}

return NewObj;
};

//ищем в парах
function findPare(mas, paire){
var leng = paire.length;
var i;
for(i=0;i<leng;i++){
	if (compareTwoMas(mas,paire[i])){
		return 1;
		}
	}
return 0;
}

//вычитаем пары
function setMinPare(pare1, pare2){
var pare    = new Array();
var len     = pare1.length;
var tempMas = new Array();
var i;
for(i=1;i<len;i++){
	tempMas = pare1[i];
	if (findPare(tempMas, pare2)== 0)
		pare.push(tempMas);
	};
return pare;
}

//кол-во элементов в массиве не равных fl
function getNotNulEllMas(mas, fl){
var lenh  = mas.length;
var count = 0;
for(iss = 0; iss < lenh; iss++){
	if(mas[iss] != fl)
		count++;
	};
return count;
}

//кол-во элементов в хеше не равных fl
function getNotNulEllHash(hash, fl){
var count = 0;
for(var key in hash){
	if(hash[key] != fl)
		count++;
	}
return count;
}

//по хешу ищем карты данной масти flag = 0 или 1 0 - масть 1 - номинал
function getFromHashCard(elMas, hash, flag){
var mas = new Array();
var car;
for(var key in hash){
	//если карта закрыта
	if (hash[key] == 0){
		car = parse_string(key,flag);
		if (car == elMas){
			mas.push(key);
			}
		}
	}
return mas
}



//является ли элементом масива
function isEl(el, mas){
var len = mas.length;
var flag=1;
for(i=0;i<len;i++){
	if (mas[i] == el)
		return 0;
	}
return 1;
}

//есть ли пары нов
function Pairs(mas, с){
var mainMas = new Array();
mainMas = cheked(mas, 2, 14);
var flag=0;
var it = new Array();
var h = 0;
for (i = 2; i <= 14; i++){
	if (mainMas[i]>=с){ 
		it[h] = i;
		h++;
		}
	};
it.sort(CompareForSort);
if (it.length>2){
	return it.slice(-2);
	}
else{
	return it ;
	}
return 0;
}