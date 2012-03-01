function main(){
var ss  = new Array(4,6,7,8,11);
var sss = new Array();
//qvlib.MsgBox("sdsd");
sss     = streets_dif(ss,2);
printMas(sss);
return 0;
}

//порождаем массив
function genMas(BeginItem, count){
var mas = new Array();
var i;
for (i=0; i<count; i++)
		mas[i] =  parseInt(BeginItem) + i;
return mas;
}

//заполняем нулями упорядоченый масив
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

//массивы одинаковой длины
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
var prMas    = new Array();
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

//разбираем строку карт
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
var temp = i.toString() + "/" + j.toString();
return  temp;
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

//

//генерируем карты из номиналов
function genCardfromNom(masNom, hash, isum){
var len  = masNom.length;
var card = new Array();
var i;
if (isum == 1)
	for(i=0;i<leng;i++){}
		
if (isum == 2)
	return 0;

return 0;
}
