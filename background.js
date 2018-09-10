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

var checkSite_in_progress = false;

var _debug = 1; // 0=quiet, 1=verbose, 2=more verbose, 3= very very verbose, 4=even more. 5 very very verbose
if (_debug) {
    console && console.info("DEBUG LEVEL", _debug);
}

var DOMAIN = "possedex.info";

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
capital     : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAA CXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4gEDDyoQwQ0NBgAACBlJREFUWMOtl1tsHOUVx38z sxevb3uz19ndrO34kkAM9sYmJCGhiEoJpVQxNKlAeQHRF0IfmgpRcZHoGyAeivpWBCoV7UPDA0lV 2hADIpAoIY3xZR+IL7G9ruPN2rve2bVnb/bOfH1wvPWytpOHHmmkmfPd/uf8z3fOGWl0dFSwhciy zKVLl7BarezduxfDMACQJAlJkhDif8vXv9+tmLYalCQJTdM4e/YT6uvr2bNnDyaTCSEEqVSKTCaN w+Ekn89jNpuxWq0oivL/AyDLMkNDQ4RCIWpqapmcnMBud9DXd56LF78BJF544SSRyCyalqatrY3d u3djsViKQO7kFWkrCgzD4O233yIcnkKSJGw2G9lsFl3XCQaDfP311xw92svDDz9MKrXI0tIS4+Oj 7Ny5i+bmHdjtdmpqarYEYdrq8KGhQQYHB3j++V/icDh4/fXXOHz4MG+88TsaG5s4derXXLp0EU3T mJiYYGEhTjQa5eWXf8vVq1cxDIOHHjqA3799UxDyZtzPzc3xxRdfkMvl6OoK8sQTP+Oee+7B5XLT 2NiEoih0dXURiUTwer28+uqrnDz5InV1dbhcLhYXU0Sjt/j888+5cePG5jT/UCGEIBQKoWkagUAA IQT5fJ66ujqOH/8FX375JaHQMABNTU3YbDaOHHmMAwceYnFxEafTiSwr5HI5ZFlG0zQuXvyGcDiM JElbA5AkiXA4zLffXmFwcIDu7h58Pj8fffRnUqkUR4/24nDYOX36NAAejweAWGwegJGREQKBRrLZ DLquF/dMp9NcuXKZRCJRBkJef7imafT397O8vEwsFmN2dpYTJ04wODjIX/7yET6fj2PHjtPXd57v v/8eh8OB2WwmmUySyWQIh6dobm4mmUyVcC5JEolEgoGB7ygUCpt7YGxsjFhsvphkxsfHcDpdPP74 T/nwwz/R33+Np576OdXV1Zw+/TfMZgtWq5VUKsXc3ByJRAKfz08yqZZZKkkSk5NT3LoVKRmT1wYz mQw3boyXIC8UCgwND9PUvAOvz8/pjz/m+vXr3Hd/FxcuXKC//zt8/gDzsQUuX7lKTa0Tq9WKpmkb 8p3P5xgdHStmU7idB2RZJhye4ty5c0XuAATgrV6k2z9LhdlYXSgEc+lavrpuZ0eDoMsXp2BI5Asm Ehkbc8sB4snC7dXlAV5ba6e3txe73Y4QYjUPCCGIRucoFAolyCXgRzumONA4jSGkoi5XMKFmH2Bf YJo9vll0Y5XJFUNhLDbN2ev3E0tXoUilIFYDUiORWMDhcCCEWKXAMAxUVS1LFkJIzKQc5AomDCEV n/SyBW3ZwrTqJKZVspS3kC+YUCSD3Q3zPH3/EEFvBJNslHlB13VUNVn8Nq0ps9ls2WSzouOuTLOe TQFUW/Mcaprkn+Nd3Fy5D1FI80B9iAcDMxhCos29QK01z3TSSSpnQ6K0YmYy6aKx8prSMPQS9wvA airQ5l7ArOglwCyKjr82SZ3LyVMnTtG+p5dkrqJkLRKUh+GqrKwUSgHAauUrubtAetnCpyP3El2q QZLWWyFRYdKpFlNEb0Vobm4ilqtnRZe5GzGZTEVj5TVFRYWtPGqB2UU7BUNGkQTybRACcFdluNc1 xcTEOIHtfvK2TqZVe3HOZiJJEpWVtlIAsizjdDrKkweQL5i4OtPESMzDRMJNvrBaQHVDxqRAdDpE Qk3Qvf8wF2fuI5m1roJlYyCKouBwOIvfxUTk8TRgMpVXZ0NIXP5PE+9f20ff+E4EFOno9kfoqL7M 8NAgwWAX/s5nODv6ICMxD/NaFbohwQ8CsLKyErfbXaS7mAcaGhpwOBzE4/ENs1jBkNGWrSSztmJw GQKW8lYqLVYUWebIkSP8S9f5w98/pnXHdrKFTNkN8Hq9JU1KEUBVVRUtLa3E4/ENXSdLguhSDX8N HaDSlGFlpUCtw02Vp5NH9u4tundPMMgHH7zPwUeOoOXHS+qCxWKhvb0dRVFKAazJrl27mJi4wcLC woZeEELg9AcZHg6Ry2Z581ev43I5sVosxTk+n4+21lbGx0YJBAKoauJ292zQ2NjE9u2Bktsmr9/c brfT3d2D2WzesIWSJAmX00lkdga/34t3W0PJ4UtLS8zNzdHR0cHw8BBudx0Wi6VYA3p6VvdeL6Yf WtjW1oaqqgwMfFcGwmKxIMsS8/NztLY+WdTHYjE+++wcZ858QiQSQdcNlpYWWVxM4XK5UFWV/fv3 4/F4yvYsC3tFUejp6UHXdUKhYXRdL/6AVFVVkclkSKfTbNu2jdHRUfr6zvPpp/9gZGSEQ4cOcfLk i9y8eZMzZz5hcHCQgwcPYjabaWtr39CrZQCEEJjNZvbt20d1dRUDAwNomgaA3W4nHo+jaRrvvvt7 YrEYy8vLdHUFaW9vp6Ojg2effQ6AlpYW3nvvjxw7dhyv17tpV7xhWy6EQFEUOju78HgaCIWGCYfD 2O125ufncbvdSJLMY4/9hGAwSEPDNq5d+zfnz3/Gc889j8/no6amlng8Tjwew+/3l/QZdwSwXrxe L/X19USjUUwmhYoKGy+99DJ1dXWoqsrU1BSTk5O0t7ejqioXLnxFc3Mz77zzNu3tO2lsbCrpgMoC +04/p+tvAKyWbkVRSCaTqKoKCCoqbNTW1vLWW28yMzPDysoyXq+XU6d+QyDQhBCbA7i78nWbFiFE sWo6HA5aWlpoaWktZrdHH/0xt25F2LlzF6+88hqNjVsfflcU3AnQmhiGQWdnJ08//Qy9vU9SX1+/ pevX5L8bOMsEuz+CngAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAldEVY dGRhdGU6Y3JlYXRlADIwMTgtMDEtMDNUMTY6NDA6NDUrMDE6MDDe7UZ0AAAAJXRFWHRkYXRlOm1v ZGlmeQAyMDE4LTAxLTAzVDE2OjQwOjQ1KzAxOjAwr7D+yAAAAABJRU5ErkJggg==',
etat        : 'data:image/png;base64,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',
independant : 'data:image/png;base64,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',
rien        : 'data:image/png;base64,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',
};

let bandeau_msgs = {
    inconnu     : "Inconnu",
    capital     : "Liens capitalistiques",
    etat        : "Liens étatiques",
    independant : "Indépendant financièrement",
    rien        : "rien"
};

let owner_msgs = {
    inconnu     : "Ce site n'est pas référencé dans notre base de données.",
    capital     : "Voici les liens capitalistiques avec les principaux actionnaires du média que vous consultez :",
    etat        : "Ce média est la propriété du ou des états suivants :",
    independant : "Ce site n'a pas de lien capitalistique ou étatique à notre connaissance",
    rien        : "rien"
};

// vars to show in prefs
var colors = {
    inconnu     : "#00a86b", // c'est que de l'info :)
    capital     : "#00a86b", // c'est que de l'info :)
    etat        : "#00a86b", // c'est que de l'info :)
    independant : "#00a86b", // c'est que de l'info :)
    rien        : "#00a86b" // c'est que de l'info :)
    //"#A2A9AE", // gris
    //"#D50303", // rouge
    //"#F5A725", // jaune
    //"#129AF0", // bleu
    //"#468847", // vert
};
// let possedex_colors = [ "#A2A9AE", "#129AF0", "#D50303", "#F5A725", "#468847" ];
// let possedex_descs = [ "inclassable", "parodique", "pas fiable du tout", "peu fiable", "fiable" ];

var base_url = "http://"+DOMAIN+"/mdiplo.json";
var CURRENT_VERSION = '0.1.0';
var always_refresh = false;
var urls = "";
var note = null;
var classement = null;
var notule = ""
var active_url = "";
var clean_url = "";

var owner_msg = '';

var proprietaires = '';
var fortunes      = '';
var marques       = '';
var influences    = '';
var proprietaires = '';
var interets      = '';
var conflits      = '';
var subventions   = '';
var publicite     = '';
var sources       = [];

var note          = '';
var updated_human = '';
var color         = '';
var possedex_color = '';
var possedex_desc  = '';
var message       = '';
var bandeau_msg   = '';
var icone         = '';

function onInstall() {
    if (1 <= _debug) {
        console && console.log("Le Possedex est installé");
    }
    Possedex.loadData();
    var last_update = new Date();

    browser.storage.local.set({
        'infobulles': {
            'inconnu'     : false,
            'capital'     : true,
            'etat'        : true,
            'independant' : true
        },
        'persistant'  : false,

        "installed" : CURRENT_VERSION,
        'last_update': last_update.getTime()
        },
        function(){
            dbg(1, "installed :)");
        }
    );
    browser.tabs.create({
        active : true,
        url    : "install.html"
    });
}


browser.storage.local.get(['installed'], function(data){
    var install = data.installed;
    if (true || install != CURRENT_VERSION) {
        onInstall();
    }
});


let Possedex = {
    data : {},
    regex_url_seule : new RegExp(/^(http[s]?:\/\/([^/]+)\/[^" ,]+)[^"]{1,2}$/g),

    loadJSON : function(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success) {
                        if (4 <= _debug) {
                            console && console.info("raw json");
                            console && console.log(xhr.responseText);
                        }
                        success(JSON.parse(xhr.responseText));
                    }
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    },

    loadData: function(){

        if (1 <= _debug) {
            console && console.info('start loadData()');
            //console && console.info('NO DEBUG');
        }
        browser.storage.local.get('last_update', function(data){
            var new_update = new Date();
            if (2 <= _debug) {
                console && console.log("found last update : ", data, "base url=", base_url+"?"+new_update.getTime());
            }
            Possedex.loadJSON(base_url+"?"+new_update.getTime(),
                function(data) {
                    if (2 <= _debug) {
                        console && console.info("storing urls...", data['urls']);
                    }
                    browser.storage.local.set({'urls': data['urls']}, function() {
                    });
                    if (2 <= _debug)
                        console && console.info("set objets to", data['objets']);
                    browser.storage.local.set({'objets': data['objets']}, function() {
                    });
                    if (3 <= _debug)
                        console && console.info("set last_update to", new_update.getTime());
                    browser.storage.local.set({'last_update': new_update.getTime()}, function() {
                    });

                },
                function(data) {
                    console && console.error("error on loadJSON with "+base_url);
                    console && console.info(data);
                }
            );
        });
    },

    removeAfterLastSlash: function(url){
        if(url.lastIndexOf('/') !== -1) {
            return url.substring(0, url.lastIndexOf('/'));
        }
        else {
            return url;
        }
    },

    lastSlash: function(url) { // remove the last slash at the end of the string
        if(url.lastIndexOf('/') == url.length-1) {
            return url.substring(0, url.length-1);
        }
        else {
            return url;
        }
    },

    url_cleaner : function(url){
        return url
            .replace("http://", "")
            .replace('www.', "")
            .replace("https://", "")
            .replace("\n", "");
    },

    getAllChildrenForEntity: function(entity, medias = []) {
        // console && console.log("start getAllChildrenForEntity");
        for(item_index in entity.possessions) {
            item = entity.possessions[item_index];
            // console && console.info(item);
            entity_id = Possedex.getEntityIdFromNom(item.nom);
            entity = Possedex.data.objets[entity_id]
            if (entity.type != 3) {
                // console && console.log("A creuser");
                medias = Possedex.getAllChildrenForEntity(entity, medias);
                // console && console.log(entity);
            } else {
                // console && console.log("A ajouter");
                // console && console.log(entity);
                medias.push(entity);
            }
        }
        return medias;
    },

    getAllParentsForEntity: function(entity, medias = []) {
        console && console.log("start getAllParentsForEntity");
        for(item_index in entity.est_possede) {
            console && console.group("Une boucle de est_possede de "+entity.nom);
            item = entity.est_possede[item_index];
            parentId = Possedex.getEntityIdFromNom(item.nom);
            parentEntity = Possedex.data.objets[parentId]
            //console && console.log("Dealing with item.nom = "+item.nom);
            //console && console.log(parentEntity);
            if (parentEntity.type != 1) {
                console && console.log("A creuser pour "+parentEntity.nom);
                a_creuser = Possedex.getAllParentsForEntity(parentEntity, medias);

            } else {
                console && console.info("Tiens, cette entité est une personne physique");
                console && console.log(parentEntity);
                medias.push(parentEntity);
            }
            console && console.groupEnd();
        }
        console && console.warn("au final");
        console && console.warn(medias);
        return medias;
    },

    getEntityIdFromNom: function(str) {
        if (Possedex.data.urls.hasOwnProperty(str)) {
            return Possedex.data.urls[str];
        } else {
            for(id in Possedex.data.objets) {
                //console && console.log("check id="+id);

                if (Possedex.data.objets[id].nom == str) {
                    //console && console.info("TROUVé : "+id);
                    return id;
                }
            }
            return false;
        }
    },

    youtubeChannel: function(url) {
        var elms = url.split('/');
        if(elms.length > 2){
            return elms[0] + '/' + elms[1] + "/" + elms[2];
        }
        else{
            return url;
        }
    },

    debunkSite: function (url, tab_id, display){
        if (3 <= _debug) {
            console && console.group('START debunk site '+url);
        }

        infosToGet = [
            'urls',
            "objets",
            "already_visited",
            "infobulles",
            "persistant",
            "last_update"
        ];
        browser.storage.local.get(infosToGet, function(data) {
            if (3 <= _debug) {
                console && console.info("debunkSite : var results");
                console && console.log(data);
            }

            if ("urls" in data) {
                if (_debug > 4) {
                    console && console.log("urls is in data");
                }
                urls = data.urls;
                objets = data.objets;

                entity_id = Possedex.getEntityIdFromNom(url)

                if (entity_id == false) {

                    if (2 <= _debug) {
                        console && console.info("site non trouvé avec l'url suivante :", url);

                    }
                    //browser.browserAction.setIcon({
                    //    path: "icone.png",
                    //    tabId: t
                    //});
                    // Optional : add a badge text and badge bg with the icon
                    //browser.browserAction.setBadgeText({"text" : ""});
                    //browser.browserAction.setBadgeBackgroundColor({'color' : "#D50303"});
                    return;
                }

                if (2 <= _debug) {
                    console && console.info("Site id pour "+url+", entity_id = "+entity_id);
                }

                entity = Possedex.data.objets[entity_id];
                if (2 <= _debug) {
                    console && console.log("contenu", entity);
                }


                classement     = entity.possedex.classement;   // classement possedex
                console && console.log(entity.possedex);
                notule         = entity.possedex.desc;                   // description originale
                slug           = entity.possedex.slug;                   // nom normalisé

                //owner_msg      = owner_msgs[classement];               // message "ce media est la propriété ..."

                if (entity.hasOwnProperty('est_possede')) {
                    entity.proprietaires = []
                    console && console.log("POUET POUET");
                    entity.est_possede.forEach(function(el, i) {
                        console && console.log("POUET POUET");
                        console && console.log(el);
                        entity.proprietaires.push({
                            "url" : 'http://'+DOMAIN+'#'+el.nom,
                            "nom" : el.nom + ' ('+el.valeur +(parseInt(el.valeur)?'%':'') +')'
                            //+ " (" + fortunes1 + ")"
                        });
                    })
                }

                subventions    = entity.possedex.subventions;            // Montant des subventions d'état
                publicite      = entity.possedex.pub;                    // Pub ?

                var raw_sources = entity.possedex.sources;                // Nos sources (urls séparés par virgule et/ou espace)

                if (3 <= _debug) {
                    console && console.info("sources avant markdown", sources);
                }
                // Markdown style
                var regex = new RegExp(/\[([^\]]*?)\]\(([^\)]*?)\)[, ]{0,2}/gm);
                match = regex.exec(raw_sources);
                sources = [];
                while (match != null) {
                    title = match[1];
                    url   = match[2];
                    sources.push({
                        "url"   : url,
                        "title" : title
                    });
                    match = regex.exec(raw_sources);
                }

                if (3 <= _debug) {
                    console && console.log("sources apres markdown", sources);
                }

                // URL toute seule
                match = Possedex.regex_url_seule.exec(raw_sources);
                while (match != null) {
                    sources.push({
                        "url"   : match[1],
                        "title" : match[2]
                    });
                    match = regex.exec(raw_sources);
                }

                if (3 <= _debug) {
                    console && console.log("sources apres urls simples", sources);
                }

                updated_human  = updated.toLocaleString('fr');

                if (2 <= _debug) {
                    console && console.group("tout s'est bien passé");
                    console && console.log('nom            =',entity.nom                     );
                    console && console.log('updated        =',entity.possedex.updated_human  );
                    console && console.log('classement     =',entity.possedex.classement     );
                    console && console.log('notule         =',entity.possedex.notule         );
                    console && console.log('slug           =',entity.possedex.slug           );
                    console && console.log('proprietaires  =',entity.possedex.proprietaires  );
                    console && console.log('interets       =',entity.possedex.interets       );
                    console && console.log('conflits       =',entity.possedex.conflits       );
                    console && console.log('subventions    =',entity.possedex.subventions    );
                    console && console.log('sources        =',entity.possedex.sources        );
                    console && console.groupEnd();
                }

                // display results
                Possedex.sendToOutput(entity);


                if (url.match(/youtube.com/)) {

                    if (null == classement)
                        classement  = '';                             // propriétaires

                    //browser.browserAction.setIcon({
                    //    path: "img/icones/icon-" + (classement) + ".png", // note
                    //    tabId: t
                    //});

                    if ("" == proprietaires)
                        proprietaires  = "Youtube est une propriété de la Holding Alphabet (Google)";                             // propriétaires
                    if ("" == interets)
                        interets       = "Le groupe Alphabet(Google) a de nombreux intérêts internationnaux. Son business model est fortement basé sur la publicité et son quasi-monopole de la publicité. Google exerce de nombreuses pressions sur les états et l'Union Européenne.";                               // intérets
                    if ("" == conflits)
                        conflits       = "Youtube peut être un outil de partage de connaissances. Les vidéastes et utilisateurs de la plateforme youtube ne sont pas forcément soumis à Google, mais… ";  // exemple de conflits / complicité idéologique
                    if ("" == subventions)
                        subventions    = "";             // Montant des subventions d'état
                    if ("" == sources)
                        sources        = "";             // Nos sources (urls séparés par virgule et/ou espace)
                }
            }

            var today = new Date();
            last_update = data.last_update;
            if(always_refresh || (today.getTime() - last_update)/1000/60/60 >= 24) {

                if (1 <= _debug) {
                    console && console.log("refresh every hour or refresh forced");
                }
                Possedex.loadData();
            } else {
                if (2 <= _debug) {
                    human_date = new Date(last_update).toString();
                    console && console.log("(not refresh) use data found in cache (from "+human_date+")");
                }
            }
        });
        if (3 <= _debug) {
            console && console.groupEnd();
        }
    },

    sendToOutput : function(obj) {
        // // change l'icone bouton du navigateur
        //browser.browserAction.setIcon({
        //    path: "img/icones/icon-" + classement + ".png", // note
        //    tabId: tabId
        //});

        console && console.log("if envoyer le message");
        if(true || display == true){  // note
            console && console.log("debut envoyer le message");
            console && console.log("classement");
            console && console.log(classement);
            console && console.log("messages");
            console && console.log(messages);
            browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                msg = {
                    show_popup    : true, // @TODO: put in config
                    nom           : entity.nom,
                    nom_url       : 'http://'+DOMAIN+'#'+entity.nom,
                    proprietaires : entity.proprietaires,

                    color       : colors[entity.possedex.classement],
                    message     : messages[entity.possedex.classement],
                    bandeau_msg : bandeau_msgs[entity.possedex.classement],
                    icone       : icones[entity.possedex.classement],
                    persistant  : Possedex.data.persistant
                };
                console && console.log("envoyer le message");
                console && console.log(msg);

                // sendMessage to the content.js listener
                browser.tabs.sendMessage(tabs[0].id, msg, function(response) { // note
                    //console && console.log("message envoyé");
                    //console && console.log(response);
                });
            });
        }
    },

    rien : function() {
    }
}




function checkSite(do_display){

    if (checkSite_in_progress == true)
        return;

    checkSite_in_progress = true;

    browser.tabs.query({currentWindow: true, active: true}, function(tabs){

        // {{{ check if research is needed
        if (!tabs.length) {
            checkSite_in_progress = false;
            return;
        }

        var tab;
        for (active_tab of tabs) {
            tab = active_tab;
        }
        active_url = Possedex.lastSlash(tab.url);
        if (_debug > 5) {
            console && console.warn("active url", active_url);
        }

        if(active_url.indexOf("chrome-extension://") == 0) {
            checkSite_in_progress = false;
            return;
        }
        // }}}

        // @TODO: move youtube part in getEntityIdFromNom
        // YOUTUBE
        if(active_url.indexOf("youtube.com/") > -1){
            if(active_url.indexOf("channel") == -1){
                browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    browser.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, function(response){
                        clean_url = response.farewell.replace('https://www.', "");
                        debunkSite(clean_url, tab.id, do_display);
                    });
                });
            }
            else {
                clean_url = Possedex.youtubeChannel(url_cleaner(active_url));
                debunkSite(clean_url, tab.id, do_display);
            }
        }
        // @TODO: move facebook/twitter part in getEntityIdFromNom
        else if(active_url == 'https://www.facebook.com' || active_url == 'https://twitter.com' || active_url == 'https://www.youtube.com'){
            clean_url = Possedex.url_cleaner(active_url);
            debunkSite(clean_url, tab.id, do_display);
        }
        // OTHER URLS
        else {
            matches = []

            // @TODO: recursiv last slash
            clean_url = Possedex.url_cleaner(active_url);
            find_url = urls[clean_url];

            // {{{ this might be removed (redundant with after the for())
            if (find_url) {
                matches.push(find_url);
            }
            // }}} this might be removed (redundant with after the for())

            if (4 <= _debug) {
                console && console.group("for oneUrlInDb in urls");
            }

            for (var oneUrlInDb in urls) {
                if (!urls.hasOwnProperty(oneUrlInDb)) {
                    continue;
                }
                var index = active_url.indexOf(oneUrlInDb);
                // si l'url est un sous domaine ou avec un chemin
                if(index != -1) {
                    if (4 <= _debug) {
                        console && console.info("url FOUND !", oneUrlInDb, index);
                    }
                    if((
                        active_url.indexOf('http://www.'+ oneUrlInDb) == 0
                        || active_url.indexOf('https://www.'+ oneUrlInDb) == 0
                        || active_url.indexOf('http://'+ oneUrlInDb) == 0
                        || active_url.indexOf('https://'+ oneUrlInDb) == 0
                    )
                        && index != 0
                        && (active_url[index-1] == "/" || active_url[index-1] == ".")
                        && oneUrlInDb != "facebook.com"
                        && oneUrlInDb != "twitter.com") {
                        // current active_url contains the current url from
                        // the loop (oneUrlInDb)
                        matches.push(oneUrlInDb);
                        if (_debug > 4) {
                            console && console.warn("URL MATCHES !!!!");
                        }
                    }
                }
            }

            if (4 <= _debug) {
                console && console.groupEnd();
            }
            // {{{ take best accurate url (the longuest)
            var tampon = "";
            for(var url_i=0;url_i<matches.length;url_i++){
                if(matches[url_i].length > tampon.length){
                    tampon = matches[url_i];
                    if (4 <= _debug) {
                        console && console.log("tampon update to use longer url :", tampon);
                    }
                }
            }
            clean_url = tampon; // this contains the longest url match
            // }}} take best accurate url (the longuest)
            if (4 <= _debug) {
                console && console.log("call debunkSite");
                console && console.log("clean_url", clean_url);
                console && console.log("tab id",  tab.id);
                console && console.log("do display", do_display);
            }
            debunkSite(clean_url, tab.id, do_display);
        }
        checkSite_in_progress = false;
    });
}


browser.tabs.onActivated.addListener(function (activeInfo) {
    if (1 <= _debug) {
        console && console.log("listener onActivated");
    }
    checkSite(false);
});

// This event happens everytime but seems required to update logo color
// onload
// déclenché quand un onglet est mis à jour
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (1 <= _debug) {
        console && console.log("onUpdated");
    }
    checkSite(changeInfo.status && (changeInfo.status == "complete"));
});

// déclenché quand la fenêtre actuelle change
browser.windows.onFocusChanged.addListener(function (windowId) {
    if (1 <= _debug) {
        console && console.log("onFocusChanged");
    }
    checkSite(false);
});

// déclenché quand l'icone d'action du navigateur est cliqué
browser.browserAction.onClicked.addListener(function (tab) {
    if (1 <= _debug) {
        console && console.log("onClicked");
    }
    checkSite(false);
});


// déclenché quand un onglet est créé
browser.tabs.onCreated.addListener(function (tab) {
    if (1 <= _debug) {
        console && console.log("onCreated");
    }
    checkSite(true);
});

