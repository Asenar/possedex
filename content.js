/*          POSSEDEX
            VERSION 1 / MARS 2017
            VERSION 2 / JANVIER 2018
            VERSION 3 / AOUT 2018
            VERSION 4 / NOVEMBRE 2018
            REMERCIEMENT A L'EQUIPE LES DECODEURS DU MONDE
            INFINIMENT MERCI AU MONDE DIPLOMATIQUE QUI A PUBLIÉ SA BASE
                             .y.
                            -dMm.
                           .mMMMd.
                          .dMMMMMd.     .:+oyyso-
                         `hMMMMMMMd` -odNMMMMMMMNy`             `..
                         sMMMm:dMMMddNMMMMmyoomMMMh    `.-/+oydmmN:
                        :NMMN/ .mMMMMMNd+-`   -NMMMyydmNNNMMMMMMMd.
                        hMMMy   -mMMMN:        sMMMMMMMMNNmhhNMMMo
                       -mMMM-    -mMMMy`       -NMMMy+/-.`` /NMMN.
                       /NMMM`     -mMMMy`      `hMMM+       sMMMh
                       -mMMMo`     :mMMMs`      sMMMd      .NMMN/
                        +NMMNy`     :NMMNs      /MMMm`     +MMMd.
                         :dMMMd:     :NMMMo`    `NMMN-    `dMMMo
                          .yMMMN+     :NMMNo     NMMN/    /NMMM.
                           `oNMMNy.    /NMMN+    dMMMo    yMMMh
                             :mMMMd-    /NMMN+   yMMMs   `NMMN/
                         `-://ohhhhy+////ymNMN/.-shhds:--+mmmd.
                       `/osoo+++++++++++oosshdsssoooooooooosss+/-`
                      `+so/:::::::::::::::/osss+:::::::::::://+os+-`
                      -ss/:----------------/ss+:--------------::+ss+-.```
                      .ss+:::::::--::::::::+sso::---------------::+osoooo-
                      `+sso+++///::::///+++oosso+//:::::::--------:::/+ss-
                     `/ss+/::::::::::::::::::+ssssoooooo+:------------/ss-
                     .os+:-------------------:oso-....os+-------------/ss-
                     `+so::----------:::::://+ss+`    +so:------------/ss-
                      .+so+////////:::::////+++os+.   -ss/------------/ss-
                       `-oso//:::::------------:os+   `/so/:----------/ss-
                        `oso:-----------------::oso    `+so/:---------/ss-
                         :ss+:::::::::::::::://+oss/.  ``/so+:--------/ss-
                          -+osoooooo++///::::::::/+so- -.`:oso/::-----/ss-
                            .-:::oso:-------------:os+` o+ `:oso+/::::/ss-
                                 /so/:------------:os+` /Ms. `-+ysssoooss-
                                 `+so+/:::::::::/+oso.  +MMd-  .hNmmh----`
                                  `:+oooossssooooo+:`   yMMMy`  -MMMN/
                                     `..:dmmm/...`      :NMMM:   sMMMm`
                                        :MMMm.           yMMMh   .dMMMs
                                        yMMMy       ``.:+yMMMN:   :NMMN:
                                       `mMMM/  ``-+shmMMMMMMNNy    sMMMm`
                                       /NMMN-:ohmMMMMNNmdyo+/--    .mMMMo
                                       sMMMMmMMMMNmyo/.`   `.:/+ossodMMMN:
                                      .mMMMMMNmy+.`    `-+ymNMMMMMMMMMMMMd`
                                      :MMMMNs:`  ``./oymNMMMMNdhyssyhmMMMMo
                                      yMMMNyoooyhdNNMMMMNMMMMo`      `dMMMd`
                                      -dNMMMMMMMMMNNNdy+:oMMMN:    `:hMMMN:
                                       `:+syyyyso/:.`     yMMMm` `/dMMMMd:
                                                          .dMMMhomMMMNh/
                                                           -NMMMMMMNy-
                                                            +NMMMms.
                                                             sMmo`
                                                             `/`

*/
var browser = browser || chrome;

const removeAfter = 10000; // En milliseconde
(function (){
    "use strict";

    const timers = {
        removeTimeout : null
    }

    const heights = [213, 180, 212, 203, 213];

    // Helpers function
    function closeInfoBulle() {
        let infobulle = document.getElementById("possedex-infobulle");
        clearTimeout(timers.removeTimeout);
        infobulle.style.opacity = 0;
        infobulle.style.transform = 'translate(0,-100%)';
        timers.removeTimeout = setTimeout(function(){
            removeElement(infobulle);
        }, 1000);
    }

    function clearRemoveTimeout(){
        clearTimeout(timers.removeTimeout);
    }

    function removeAterTime(){
        timers.removeTimeout = setTimeout(closeInfoBulle, removeAfter);
    }

    function removeElement(elem){
        if(elem) elem.parentNode.removeChild(elem);
    }

    function forEach(arr, fn){
        for (let i = 0, l = arr.length; i<l; i++)
            fn.call(arr, arr[i], i, l);
    }

    function createChild(parent, tag, elementClass){
        const elem = document.createElement(tag);
        parent.appendChild(elem);
        elem.className = elementClass;
        return elem;
    }

    function appendText(parent, text){
        const elem = document.createTextNode(text);
        parent.appendChild(elem);
        return parent;
    }

    function isVisible(elem){
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ); // Merci jquery
    }

    function css(elem, styles, important){
        const merged = {};
        styles = [].concat(styles);
        for(let i = 0, l = styles.length; i<l; i++)
            for(let style in styles[i])
                merged[style] = styles[i][style] + ((important) ? ' !important' : '');

        var balise = "";
        for(let attr in merged)
            balise += attr+":"+merged[attr]+";";

        elem.setAttribute("style", balise);
        return elem;
    }

    //import de la fueille de style css
    function importCSS() {
        const linkTag = document.createElement ("link");
        linkTag.href = getBrowser().extension.getURL("css/content.css");

        linkTag.rel = "stylesheet";
        document.getElementsByTagName ("head")[0]
            .appendChild (linkTag);
    }

    //pour pouvoir détecter le type de navigateur
     function getBrowser() {
        if (typeof chrome !== "undefined") {
            if (typeof browser !== "undefined") {
              return browser;
            } else {
              return chrome;
            }
        } else {
            console.log("Le navigateur n'est pas compatible avec l'extension possedex");
        }
    }

    function fixZIndexCurrentPage() {
        document.querySelectorAll('body *').forEach(function(elem){
            const style = window.getComputedStyle(elem);
            if(style.position !== 'static' && style.zIndex === 2147483647)
                elem.style.zIndex = 2147483646;
        });
    }

    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console && console.log("onMessage detected")
        // Supprimer infobulle si existant
        clearRemoveTimeout();
        // removeElement(infobulle);

        if (request.show_popup){

            fixZIndexCurrentPage();

            const apply_style = request.styles;
            // FIXME: importer une seule fois
            importCSS();

            const body = document.querySelector("body");

            // Structure du popup
            const infobulle = createChild(body, "div","possedex-infobulle");
            infobulle.id = "possedex-infobulle";

            const close = createChild(infobulle, "div","possedex-close");
            const content = createChild(infobulle, "div","possedex-content");
            const proprietaires = createChild(content, "div","possedex-prop");

            // Section propriétaire
            const proprietaires_h = createChild(proprietaires, "span" ,"possedex-proph");
            appendText(proprietaires_h, request.nom+" appartient à");

            for (let i in request.proprietaires) {

                let proprio_div = createChild(proprietaires, "div","possedex-propdiv");

                // Image
                let proprietaire_img = new Image();
                let img_link = "img/prop/"+ request.proprietaires[i].nom.replace(" ","") +".gif";
                proprietaire_img.src = getBrowser().extension.getURL(img_link);
                proprietaire_img.className = "possedex-propimg";
                proprio_div.appendChild(proprietaire_img);

                // Bloc nom et détails
                let proprio_text = createChild(proprio_div, "div","possedex-proptext");

                // Nom
                let proprio_a = createChild(proprio_text, "a","possedex-propa");
                proprio_a.target    = "_blank"; // no html
                proprio_a.innerText = " "+request.proprietaires[i].nom; // no html
                proprio_a.href      = request.proprietaires[i].url; // no html

                // Fortune
                if(request.proprietaires[i].fortune){
                    var proprio_rang = createChild(proprio_text,"span","possedex-propdetail");
                    if(request.proprietaires[i].fortune == 1){
                        var fortune_phrase = "1ère fortune de France";
                    } else {
                        var fortune_phrase = request.proprietaires[i].fortune + "ème fortune de France";
                    }
                    appendText(proprio_rang, fortune_phrase);
                }

                // Possessions
                var proprio_boite = createChild(proprio_text,"span","possedex-propdetail");
                // Liste des possessions avec le pourcentage entre parenthese
                let possessions_liste = request.proprietaires[i].possessions.map(a => a.nom + " ("+ a.valeur+"%)");
                // La transformer en phrase (si plusieurs entreprises : "x,x et x" au lieu de "x,x,x")
                var possessions_phrase = "Dirige "
                for (let j in possessions_liste) {
                    if (j === 0){
                        possessions_phrase += possessions_liste[j] ;
                    }
                    else{
                        if(j === (possessions_liste.length-1) ){
                            possessions_phrase += " et " + possessions_liste[j] ;
                        }
                        else {
                            possessions_phrase +=", "+ possessions_liste[j];
                        }
                    }
                }
                appendText(proprio_boite, possessions_phrase);


                // Medias
                var proprio_interet = createChild(proprio_div,"span","possedex-propint");



                /*
                for (var k in request.proprietaires[i].medias) {
                    if(k == 0){medias_phrase += request.proprietaires[i].medias[k] ;}
                    else{
                        if(k == (request.proprietaires[i].medias.length-1) ){ medias_phrase += " et " + request.proprietaires[i].medias[k] ;}
                        else{ medias_phrase +=", "+ request.proprietaires[i].medias[k]; }
                    }
                }
                */

                var medias_phrase = "";
                var nbmax = 2;

                for (let k=0; (k < request.proprietaires[i].medias.length) &&  (k < nbmax+1); k++) {
                    if (k === 0) {
                        medias_phrase += request.proprietaires[i].nom + " a des parts dans " + request.proprietaires[i].medias[k] ;
                    } else if (k === (request.proprietaires[i].medias.length-1) ){
                         medias_phrase += " et " + request.proprietaires[i].medias[k] ;
                    } else if (k === (nbmax) && (request.proprietaires[i].medias.length > nbmax)){
                         medias_phrase += " et " + (request.proprietaires[i].medias.length-nbmax) + " autres media";
                    } else {
                        medias_phrase +=", "+ request.proprietaires[i].medias[k];
                    }
                    // console.log(" k=" + k +" length="+ request.proprietaires[i].medias.length + " "+ medias_phrase);

                }

                appendText(proprio_interet, medias_phrase);

                console.log(request);

                /*
                console.log(request.proprietaires[i].media.length);

                // Test
                //chrome.extension.getBackgroundPage().console.log('saluttoi');
                console.log(request.proprietaires[i].possessions[0].nom);
                console.log(possessions_noms);
                */
            }

            /*
            // Lien vers plus de détail
            var more = createChild(content, "p", "possedex-more"); // TODO
            appendText(more, "+ d'infos en cliquant sur ");

            var more_icone = new Image();
            more_icone.src = request.icone; // note
            more_icone.className = "possedex-more_icon";
            more.appendChild(more_icone);
            */

            // Bind des event au clique
            close.addEventListener("click", closeInfoBulle);

            if (!request.persist) {
                // note : theses log are displayed in the classic console
                infobulle.addEventListener("mouseenter", clearRemoveTimeout);
                infobulle.addEventListener("mouseleave", removeAterTime);
                removeAterTime();
            } else {
                //console && console.log("persist is enabled");
            }

        } else {
            if (request.text === "report_back") {
               sendResponse({farewell: document.querySelector(".yt-user-info").getElementsByTagName("a")[0].href});
               //console.log("URL CHANNEL ---> " + document.querySelector(".yt-user-info"));
            }
        }
      });

    /*browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.text === "report_back") {
            sendResponse({farewell: document.getElementsByClassName("yt-user-info")[0].getElementsByTagName("a")[0].href});
            //console.log("URL CHANNEL ---> " + document.getElementsByClassName("yt-user-info")[0].getElementsByTagName("a")[0].href);
        }
    });*/

})();

