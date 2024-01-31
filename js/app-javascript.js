/// récupérer mes inputs type tel
const INPUT_TEL = document.querySelectorAll("input[type='tel']");
const HT = document.querySelector("#montantHT");
const TVA = document.querySelector("#montantTVA");
const TTC = document.querySelector("#montantTTC");
const TAUX_TVA = document.querySelector("#tauxTVA");
const TOTAL_TVA = document.querySelector("#totalTva");
const LIST_BUTTONS = document.querySelectorAll("input[type='button']");

/// capter le moment ou je change une valeur dans un de mes input tel (quand je tape dans un input)

for (let i = 0; i < INPUT_TEL.length; i++) {
    INPUT_TEL[i].addEventListener("keyup", function () {

        // récupère l'id d'un input (montantHT, montantTVA, montantTTC)
        // appel calculTVA() en lui passant l'id
        calculTVA(this.id);

    })
}

for (let i = 0; i < LIST_BUTTONS.length; i++) {
    LIST_BUTTONS[i].addEventListener("click", function () {

        // récupère l'id d'un input (montantHT, montantTVA, montantTTC)
        // appel calculTVA() en lui passant l'id
        TAUX_TVA.value = this.value;
        calculTVA("montantHT");

    })
}

function cleanValue(rawAmount, symbol) {
    return parseFloat(rawAmount.replace(symbol, "").trim());
}

function formatValue(rawAmount) {
    return rawAmount.toFixed(2) + " €";
}

function calculTVA(id) {

    let ht = cleanValue(HT.value, "€"), 
    ttc = cleanValue(TTC.value, "€"), 
    tva = cleanValue(TVA.value, "€"), 
    tauxTVA = cleanValue(TAUX_TVA.value, "%") / 100;

    if (id === "montantHT") {

    // montantHT
        // montant TTC
        // montant TVA
    
        tva = ht * tauxTVA;
        ttc = ht + tva;


    }
    else if (id === "montantTVA") {

    // montantTVA
        // montant TTC
        // montant HT
        ht = tva / tauxTVA;
        ttc = ht + tva;
    }
    else if (id === "montantTTC") {

    // montantTTC
        // montant TVA
        // montant HT
        ht = ttc / (1 + tauxTVA);
        tva = ttc - ht;

    } else {

    // tauxTVA
        // montant TVA
        // montant HT
        // montant TTC

    }

    HT.value = formatValue(ht);
    TVA.value = formatValue(tva);
    TTC.value = formatValue(ttc);

    TOTAL_TVA.innerHTML = "<p>Montant HT = " + formatValue(ht) + "</p>" ;
    TOTAL_TVA.innerHTML += "<p>Montant TVA = " + formatValue(tva) + "</p>" ;
    TOTAL_TVA.innerHTML += "<p>Montant TTC = " + formatValue(ttc) + "</p>" ;

}


