function main(){
//карты игрока
var ownCardNomPlayer = new Array(2,3);
var ownCardMasPlayer = new Array(1,1);

//карты на столе
var tableCardNom     = new Array(3,5,12,6,9);
var tableCardMas     = new Array(2,3, 1,1,1);

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

//хэш карт 0 - карта закрыта, 1 - открыта
var hash = new Object();
hash = genHash(alCardMas,alCardNom);

//массив приоритетов
var pryor    		= new Array("None", "Pair", "two pair", "Troika", "Street", "Flash", "fulhouse", "kare",  "Street Flash", "Flash Rojal");
//сколько осталось карт
var coun_list_pryor = new Object();
coun_list_pryor     = {"None":5, "Pair":3, "two pair":1, "Troika":2, 
				  	   "Street":0, "Flash":0, "fulhouse":0, "kare":1, 
				  	   "Street Flash":0,  "Flash Rojal":0};

if (forceOwn == forceTab)
	tagForce = 1;
	
nomLastCards = coun_list_pryor[pryor[forceOwn]];
if (nomLastCards == 0)
	tagCards = 1;				  	   

var itter;
var masOne = new Array();
var masTwo = new Array();
for(itter=forceOwn; itter<pryor.length; itter++){
	if(itter == 0){}
	if(itter == 1){}
	if(itter == 2){}
	if(itter == 3){}
	if(itter == 4){}
	if(itter == 5){}
	if(itter == 6){}
	if(itter == 7){}
	if(itter == 8){}
	if(itter == 9){}
	}

printMas(setOwmPl);			  	   
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

//порождаем массив в количестве count и с началом в BeginItem
function genMas(BeginItem, count){
var mas = new Array();
var i;
for (i=0; i<count; i++)
		mas[i] =  parseInt(BeginItem) + i;
return mas;
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
mainMas = stdset(mas);
var len = mas.length;
if (len < (5 - isum))
	return 0;
var tempMas    = new Array();
var prMas      = new Array();
var listStreet = new Array();
var promMas    = new Array();
tempMas        = insert_nul(mas, isum);
var gen        = genMas(tempMas[0],  tempMas.length);
var ind;
var set        = tempMas.length - 5;
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

//для сортировки
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

function printMas(mas){
for(i=0;i<mas.length;i++)
	qvlib.MsgBox(mas[i]);
}

//сравнение массивов
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

//отбора массива по старшей карте
function otMas(mas, card){
var len = mas.length;
if (mas[len-1]>card)
	return mas
else
	return 0;
}

//отбор масива массивов
function otMasMas(mas, card){
var leng    = mas.length;
var is;
var temp    = new Array();
var sortMas = new Array();
var h       = 0; 
for(is=0;is<leng;is++){
	temp = mas[is];
	if (otMas(temp,card) != 0){
		sortMas[h] = new Array();
		sortMas    = temp;
		h++;
		}
	};	
return sortMas;
}

//разбираем строку карт flag = 0 или 1 0-масть 1 - номинал
function parse_string(strCards, flag){
var masCard   = Array();
var temp      = Array();
var masiv     = Array();
masCard       = strCards.split(";");
var lent      = masCard.length;
var iq;
for(iq=0;iq<lent;iq++){
	temp      = masCard[iq].split("/");
	masiv[iq] = parseInt(temp[flag]);
	};
return masiv;
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

//строим пары
function makePair(mas){
var len      = mas.length;
var pareCard = new Array();
var tempCard = new Array();
var h        = 0;
var i;
var j;
for(i=0;i<len;i++){
	for(j=0;j<len, j!=i;j++){
		pareCard[hh] = new Array();
		pareCard[hh].push(mas[i]);
		pareCard[hh].push(mas[j]);
		hh++;		
		};
	};
return pareCard;
}

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

//печать
function print(v){
alert(v);
}


/* -------- старые функции  --------------*/
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

//кол-во ненулевых элементов
function getNotNulEll(mas){
var lenh  = mas.length;
var count = 0;
for(iss = 0; iss < lenh; iss++){
	if(mas[iss] != 0)
		count++;
	};
return count;
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

//массив номиналов данной масти
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

//пишем в переменную y значение i
function Test(i, y){
v = ActiveDocument.Variables(y);
v.SetContent(i,true)
};

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
			if (pars.length>0){
				
				//fraze="fulhouse";
				noPair = 1;
				fraze = 6;
				//Test(fraze,"myP");
				var temps  = pars.length-1;
				fulhouse[0] = pars[temps];
				temps = filh.length-1
				fulhouse[1] = filh[filh.length-1];
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

//есть ли пары нов
function Pair(mas, с){
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
if (it.length>2){
	return it.slice(-2);
	}
else{
	return it ;
	}
return 0;
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
