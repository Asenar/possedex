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
"use strict";


var browser = browser || chrome;

var checkSite_in_progress = false;

const _debug = 0; // 0=quiet, 1=verbose, 2=more verbose, 3= very very verbose, 4=even more. 5 very very verbose
const _debug_show_level = true;
if (_debug) {
    dbg(1, "DEBUG LEVEL", _debug);
}

function dbg(level, str, obj = null) {
    if (level <= _debug) {
        const log = [];
        if (_debug_show_level) {
            log.push(level);
        }
        if (str) {
            log.push(str);
        }
        if (obj) {
            log.push(obj);
        }
        console && console.log(log);
    }
}

var DOMAIN     = 'possedex.info';

var Possedex = {};
import("./data/possedex.js")
    .then(module => {
        Possedex = module.Possedex;
    })
    .catch(err => {
        console.error(err);
    });

function reloadAndStoreDB() {
    return Possedex.loadJSON(
        base_url+"?"+(new Date()).getTime(),
        function(data) {
            const new_update = (new Date).getTime();

            browser.storage.local.set({'urls': data['urls']}, function() {
                console && console.info("urls set to ...", data['urls']);
            });
            browser.storage.local.set({'objets': data['objets']}, function() {
                console && console.info("objets set to", data['objets']);
            });
            browser.storage.local.set({'last_update': new_update}, function() {
                console && console.info("last_update set to", new_update);
            });
        },
        function(data) {
            console && console.error("error on loadJSON with "+base_url);
            console && console.info(data);
        }
    )
}



/***** constants and variables *****/
let col_updated             = 4;


let col_proprietaire1 =  8;
let col_fortune1      =  9;
let col_marque1       = 10;
let col_influence1    = 11;

let col_proprietaire2 = 12;
let col_fortune2      = 13;
let col_marque2       = 14;
let col_influence2    = 15;

/***** constants and variables *****/

let messages = {
 inconnu     : "non classé",
 capital     : "Ce média dépend d'intérêts industriels, financiers, ou de groupe de presse.",
 etat        : "Ce média dépend d'un ou plusieurs états",
 independant : "Ce média est indépendant vis à vis d'intérêts industriels, financiers, groupe de presse ou étatique.",
 rien        : "rien"
};
let icones = {
inconnu     : 'data:image/png;base64,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',
capital     : 'data:image/png;base64,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',
etat        : 'data:image/png;base64,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',
independant : 'data:image/png;base64,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',
rien        : 'data:image/png;base64,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',
};

// let bandeau_msgs = {
//     inconnu     : "Inconnu",
//     capital     : "Liens capitalistiques",
//     etat        : "Liens étatiques",
//     independant : "Indépendant financièrement",
//     rien        : "rien"
// };
//
// let owner_msgs = {
//     inconnu     : "Ce site n'est pas référencé dans notre base de données.",
//     capital     : "Voici les liens capitalistiques avec les principaux actionnaires du média que vous consultez :",
//     etat        : "Ce média est la propriété du ou des états suivants :",
//     independant : "Ce site n'a pas de lien capitalistique ou étatique à notre connaissance",
//     rien        : "rien"
// };

// vars to show in prefs
// var colors = {
//    inconnu     : "#00a86b", // c'est que de l'info :)
//    capital     : "#00a86b", // c'est que de l'info :)
//    etat        : "#00a86b", // c'est que de l'info :)
//    independant : "#00a86b", // c'est que de l'info :)
//    rien        : "#00a86b" // c'est que de l'info :)
    //"#A2A9AE", // gris
    //"#D50303", // rouge
    //"#F5A725", // jaune
    //"#129AF0", // bleu
    //"#468847", // vert
// };
// let possedex_colors = [ "#A2A9AE", "#129AF0", "#D50303", "#F5A725", "#468847" ];
// let possedex_descs = [ "inclassable", "parodique", "pas fiable du tout", "peu fiable", "fiable" ];

const base_url = "https://"+DOMAIN+"/mdiplo.json";

var CURRENT_VERSION = '0.1.0';
var always_refresh = false;
var urls = "";
var note = null;
var active_url = "";
var clean_url = "";

// var owner_msg = '';

// var proprietaires = '';
// var fortunes      = '';
// var marques       = '';
// var influences    = '';
// var proprietaires = '';
// var interets      = '';
// var conflits      = '';
// var subventions   = '';
// var publicite     = '';
// var sources       = [];

// var note          = '';
// var updated_human = '';
// var color         = '';
// var possedex_color = '';
// var possedex_desc  = '';
// var message       = '';
// var bandeau_msg   = '';
// var icone         = '';

function onInstall(tabId) {
    dbg(1, "Le Possedex est installé");

    browser.storage.local.set({
            'infobulles': {
                'inconnu'     : false,
                'capital'     : true,
                'etat'        : true,
                'independant' : true
            },
            'persist'  : false,

            "installed" : CURRENT_VERSION,
            'last_update': 0
        },
        function(){
            dbg(1, "installed :)");
        }
    );
    browser.tabs.create({
        active : true,
        //index  : Math.round(tabId+1),
        url    : "install.html"
    });
}
//currentTab = browser.tabs.getCurrent();

browser.storage.local.get(['installed'], function(data){
    const install = data.installed;
    if (install !== CURRENT_VERSION) {
        onInstall();
    }
});




function checkSite(do_display){

    if (checkSite_in_progress === true) {
        console.warn("checkSite already in progress : cancelling …")
        return;
    }

    // checkSite_in_progress = true;

    browser.tabs.query({currentWindow: true, active: true}, function(tabs) {

        console.info('in checkSite, browser.tabs.query');
        const tab = tabs[0];
        dbg(4, "tab is ", tab);
        if (!tabs.length) {
            dbg(1, "tabs.length is empty")
            checkSite_in_progress = false;
            return;
        }


        // if (Possedex.isSpecialUrl(active_url)) {
        //     checkSite_in_progress = false;
        //     Possedex.handleSocialNetworkUrl(active_url);
        //     return false;
        // }

        return usePossedexFromExtension(tab, do_display);

    });
}

function usePossedexFromExtension(tab, do_display) {

    const infosToGet = [
        'urls',
        "objets",
        "infobulles",
        "persist",
        "last_update"
    ];
    browser.storage.local.get(infosToGet, function(data) {
        dbg(3, "debunkSite : var results", data);
        const {urls, objets, infobulles, persist, last_update} = data;

        Possedex.persist = persist;
        Possedex.last_update = last_update;
        if (!urls) {
            return refreshDbIfOutdated();
        }

        dbg(3, "debunkSite : url=", tab.url);
        dbg(3, "debunkSite : objets=", objets);
        dbg(3, "debunkSite : urls=", urls);
        Possedex.data = {
            objets:objets,
            urls: urls
        }
        Possedex.debunkSite(tab.url, function(entity){
            dbg(1, "start callback of debunkSite");
            if (!entity) {
                if (_debug > 1) {
                    console && console.warn("no entity");
                }
                return null;
            }
            //browser.browserAction.setIcon({
            //    path: "img/icones/icon-" + classement + ".png", // note
            //    tabId: tabId
            //});

            const msg = {
                show_popup    : true, // @TODO: put in config
                entity        : entity,
                nom           : entity.nom,
                possedex_link : 'https://'+DOMAIN+'#'+entity.nom,
                proprietaires : entity.proprietaires,
                color : "#00a86b",
                //color       : colors[entity.possedex.classement],
                //message     : messages[entity.possedex.classement],
                // bandeau_msg : bandeau_msgs[entity.possedex.classement],
                // icone       : icones[entity.possedex.classement],
                persist  : Possedex.data.persist,
                styles       : Possedex.styles
            };
            dbg(2, "sendMessage", tab.id);
            dbg(2, "sendMessage", msg);
            // sendMessage to the content.js listener
            browser.tabs.sendMessage(tab.id, msg)
            .then(response => {
                if (_debug > 0) {
                    console.log("Message from background to content.js is really sent : ", response);
                }
            }).catch(function(err) {
                console && console.error(err);
            })
            ;
        });
    })
}

// TODO: let the user choose to enable listeners

// Se déclenche lorsque l'onglet actif change.
// browser.tabs.onActivated.addListener(function (activeInfo) {
//     dbg(1, "listener onActivated");
//     checkSite(false);
// });


// C'est déclenché lorsqu'un onglet est mis à jour.
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    dbg(1, "onUpdated");
    checkSite(changeInfo.status && (changeInfo.status === "complete"));
});

// déclenché quand l'icone d'action du navigateur est cliqué
browser.browserAction.onClicked.addListener(function (tab) {
    dbg(1, "onClicked");
    checkSite(true);
});


// déclenché quand un onglet est créé
// browser.tabs.onCreated.addListener(function (tab) {
//     dbg(1, "onCreated");
//     checkSite(true);
// });

// déclenché quand la fenêtre actuelle change
// browser.windows.onFocusChanged.addListener(function (windowId) {
//     dbg(1, "onFocusChanged");
//     checkSite(false);
// });

// déclenché quand l'icone d'action du navigateur est cliqué
// browser.browserAction.onClicked.addListener(function (tab) {
//     dbg(1, "onClicked");
//     checkSite(false);
// });



function refreshDbIfOutdated (force = false) {
    const today = new Date();
    // last_update = last_update.last_update;
    const human_date = new Date().setTime(Possedex.last_update);
    console && console.log(Possedex.last_update);
    console && console.log(human_date);
    // last_update = data.last_update;
    if (force || (new Date().getTime() - Possedex.last_update)/1000/60/60 >= 24) {
        console && console.log("refresh in progress");
        reloadAndStoreDB();
        dbg(1, "refresh every hour or refresh forced");
    } else {
        dbg(2, "(not refresh) use data found in cache (from "
            + (new Date(Possedex.last_update).toString())
            + ")");
    }
    return {res: true};
}
