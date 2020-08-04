/*          POSSEDEX
            VERSION 1 / MARS 2017
            VERSION 2 / JANVIER 2018
            VERSION 3 / AOUT 2018
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
    'use strict';

    var infobulle = {}
    const timers = {
        removeTimeout : null
    }

    const heights = [213, 180, 212, 203, 213];

    // Helpers function
    function closeInfoBulle(){
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

    function createChild(parent, tag){
        const elem = document.createElement(tag);
        parent.appendChild(elem);
        return elem;
    }

    function appendText(parent, text){
        const elem = document.createTextNode(text);
        parent.appendChild(elem);
        return parent;
    }

    function isVisible(elem){
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    }

    function css(elem, styles, important){
        let i, l;
        const merged = {};
        styles = [].concat(styles);
        for(i = 0, l = styles.length; i<l; i++)
            for(let style in styles[i])
                merged[style] = styles[i][style] + ((important) ? ' !important' : '');

        var balise = '';
        for(var attr in merged)
            balise += attr+':'+merged[attr]+';';

        elem.setAttribute('style', balise);
        return elem;
    }


    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // Supprimer infobulle si existant
        clearRemoveTimeout();
        // removeElement(infobulle);

        if (request.show_popup){ // debunker
            // Ajout du contenu

            forEach(document.querySelectorAll('body *'), function(elem){
                var style = window.getComputedStyle(elem);
                if(style.position != 'static' && style.zIndex == '2147483647')
                    elem.style.zIndex = '2147483646';
            });
            const apply_style = browser.extension.getBackgroundPage().Possedex.styles;


            const body = document.querySelector('body');

            // Création de la structure du popup
            //console && console.log("infobulle - structure");
            const infobulle = createChild(body, 'div');
            infobulle.className = "possedex-infobulle";
            var header = createChild(infobulle, 'header');

            var title = createChild(header, 'h1');
            var picto = createChild(title, 'span');
            var title_link = createChild(title, 'a');

            var close = createChild(title, 'div');
            var content = createChild(infobulle, 'div');
            var main_text = createChild(content, 'div');

            var proprietaires = createChild(content, 'div');

            var proprietaires_h = createChild(proprietaires, 'h2');
            if (request.proprietaires.length == 1) {
                appendText(proprietaires_h, 'Ce média appartient à');
            } else {
                appendText(proprietaires_h, 'Ce média appartient à');
            }

            for (var i in request.proprietaires) {
                var proprio_div = createChild(proprietaires, 'div');
                css(proprio_div, [
                    apply_style.reset,
                    apply_style.resetText,
                    apply_style.proprio
                ]);
                var proprio_a = createChild(proprio_div, 'a');
                css(proprio_a,   [apply_style.reset, apply_style.resetText, apply_style.proprio_a]);
                proprio_a.target    = "_blank"; // no html
                proprio_a.innerText = ' '+request.proprietaires[i].nom; // no html
                proprio_a.href      = request.proprietaires[i].url; // no html

            }

            var more = createChild(content, 'p'); // TODO

            // Ajout du style
            var forceImportant = false;
            //var currentColor = request.color; // note
            //var currentColor = '#888888'; // note


           ;


            // @TODO: add option to fix on bottom, or on right
            css(infobulle, [apply_style.reset, apply_style.infobulle], forceImportant);

            css(header, [apply_style.reset, apply_style.header], forceImportant);

            css(title, [apply_style.reset, apply_style.resetText, apply_style.title ], forceImportant);

            css(title_link, [{}, apply_style.title_link], forceImportant);

            css(picto, [apply_style.reset, apply_style.resetText, apply_style.picto], forceImportant);

            css(close, [apply_style.reset, apply_style.resetText, apply_style.close], forceImportant);

            css(content, [apply_style.reset, apply_style.content], forceImportant);

            css(main_text, [apply_style.reset, apply_style.resetText, apply_style.main_text], forceImportant);
            css(proprietaires_h, [apply_style.reset, apply_style.resetText, apply_style.proprietaires_h], forceImportant);

            css(more, [apply_style.reset, apply_style.resetText, apply_style.more], forceImportant);

            // Ajout du contenu
            title_link.target = "_blank";
            title_link.href = request.possedex_link;
            appendText(title_link, request.nom); // note
            // le picto= un carré avec border-radius + un caractere
            // appendText(picto, 'i');
            appendText(close, 'Fermer');
            main_text.innerText = request.message; // no html
            //console && console.log("infobulle - le message");
            //console && console.log(request);

            var more_icone = new Image();
            more_icone.src = request.icone; // note
            css(more_icone, [apply_style.reset, apply_style.more_icone], forceImportant);
            // @FIXME do not insert direct HTML.
            more.innerHTML = "<span style='vertical-align:middle;'>+ d'infos en cliquant sur &nbsp;</span>";
            more.appendChild(more_icone);
            // Bind des event au clique

            close.addEventListener('click', closeInfoBulle);
            if (!request.persistant) {
                // note : theses log are displayed in the classic console
                infobulle.addEventListener('mouseenter', clearRemoveTimeout);
                infobulle.addEventListener('mouseleave', removeAterTime);
                removeAterTime();
            } else {
                //console && console.log("persistant is enabled");
            }
        }
        else {
            if (request.text == 'report_back') {
               sendResponse({farewell: document.querySelector(".yt-user-info").getElementsByTagName('a')[0].href});
               //console.log("URL CHANNEL ---> " + document.querySelector(".yt-user-info"));
            }

        }
      });

    /*browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.text === 'report_back') {
            sendResponse({farewell: document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href});
            //console.log("URL CHANNEL ---> " + document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href);
        }
    });*/

})();

