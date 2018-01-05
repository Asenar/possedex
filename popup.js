/*          DECODEX INSOUMIS
            LES INSOUMIS NUMERIQUES
            VERSION 1 / MARS 2017
            VERSION 2 / JANVIER 2018
            REMERCIEMENT A L'EQUIPE LES DECODEURS DU MONDE
            REMERCIEMENT AUX INSOUMIS QUI SE RECONNAITRONT








                                          .,,.
                                          +++######:
                                        #++######'+##
                                      '##++######++###
                                     ####+++####++#####
                                    ###########++++#####
                                   ######++;###+#''+####'
                                  ;+##++++++,   +++######
                                 +++++++''      `##+#####
                                ++++++++;        ,##+##++
                                ++++++++          ##++#++;
                               ########            #++++##
                               ##+++++;            ##+#+#+
                              ,##::###             ;#+#++#
                              ###:;##'              ######;
                              ###+###               ###+###
                             .#######               #######
                             ####'##:               ###'###
                             +######                #######
                             +###++#                ###+###
                            ,+###+++                +######
                            #####:;`                +##;###
                            #'+##::                ,#+#+##;
                            #+###+#                ##+#'##
                            #######                ##+#;##
                           .#+###+'                ##+#:##
                           +#+####.               #++##+#'
                           ##+####                #+#+#;#
                           #######               +#######
                           ##+####              ;#####+:`
                           ##+###+              ++####++
                           #######             #++##+++
                           ##+####            ####+++++
                           ##+###+          ,###++####
                           ##+###;         #####'+###
                           ######:       ';####++###.
                           ##+###,    ,#########++#,
                           ##+###::#####+#####+#++.
                           ######';#####+++#####+
                           ##+###++#####++######
                           +#'###+'+#+++++;++#,
                           ##+###:;####++++#;
                           #####++'####+++
                           ##+###+++##;
                           ##+###'
                           #######
                           ##+####
                           ##+++##
                           ##++###
                           +#+####.
                           .++####'
                            #+#####
                            +####+#
                            #+#####
                            '+####+
                             +#####
                             ######
                             .####+
                               ,:`
*/

var browser = browser || chrome;

var max_notes = 6;  // (de 0 à 5 = 6 notes)

function bulleStore(e){
    var infobulles;
    var classement = this.id.replace("check-alert-", "");
    var checked = this.checked;
    browser.storage.local.get('infobulles', function(results){
        infobulles = results.infobulles;
        if(checked) {
            infobulles[classement] = true;
        }
        else {
            infobulles[classement] = false;
        }
        browser.storage.local.set({
            'infobulles': infobulles
            }
        );
    });
}

function refreshDatabase(e){
    console && console.log("REFRESH REQUIRED");
    browser.storage.local.set({
        'last_update': ((new Date().getTime()) - 24*60*60*1000)
    });
    this.blur();
}

function linkInNewTab(a) {
	var href = a.href; // une fermeture ... sinon ça ne marche pas si le <a> contient par exemple une <img>
	a.addEventListener('click', function(e){
		if (href!==undefined) {
			browser.tabs.create({url:href});
			window.close();
		}
		e.preventDefault();
	});
	return a;
}

function createLink(toDOM,url,title) {
    var a = document.createElement("a");
	a.href = url; a.innerText = title;
	linkInNewTab(a);
	toDOM.appendChild(a);
	return a;
}

function main() {
    var background = browser.extension.getBackgroundPage();

    if(background.has_info == true) {
        // TODO afficher les infos manquantes avec popup.js et popup.html
        document.querySelector(".content #site-name").innerText = background.site_actif;
        document.querySelector("#notule").innerText = background.notule;
        document.querySelector("#last-update").style["color"] = background.color;
        document.querySelector("#last-update").style["color"] = background.color;
        document.querySelector("#last-update-date").innerText = background.updated_human;


        //if(background.decodex_note) {
        //    document.querySelector("#les-decodeurs #comment").innerText = "Les Décodeurs du Monde jugent eux ce site comme ";
        //    document.querySelector("#les-decodeurs #description").style["color"] = background.possedex_color;
        //    document.querySelector("#les-decodeurs #description").style["font-weight"] = "bold";
        //    document.querySelector("#les-decodeurs #description").innerText = background.possedex_desc;
        //}
        //else {
        //    document.querySelector("#les-decodeurs").innerText = "Les Décodeurs du Monde n'ont pas noté ce site. Ils le considèrent (peut être) comme fiable ou ne le connaissent pas.";
        //}

        document.querySelector("#owner-msg").innerText = background.owner_msg;
        //document.querySelector("#proprietaires span.content").innerText = background.proprietaires.join(",");

            console && console.group("la boucle proprietaire : ");
            console && console.log(background.proprietaires);
        for(var i in background.proprietaires) {
            console && console.log("proprietaire "+i);
            if (!background.proprietaires[i]) {
                document.querySelector("#proprietaire"+i).style = "display:none";
            } else {
                document.querySelector("#proprietaire"+i).style = "";
                document.querySelector("#proprietaire"+i+" .nom").innerText = background.proprietaires[i]
            }

            if (!background.fortunes[i]) {
                document.querySelector("#proprietaire"+i+" td.detail").style = "display:none";
            } else {
                if (background.fortunes[i].length) {
                    document.querySelector("#proprietaire"+i+" td.detail .d1").innerText = background.fortunes[i]
                } else {
                    document.querySelector("#proprietaire"+i+" td.detail .d1").style = "display:none";
                }
                if (background.marques[i].length) {
                    document.querySelector("#proprietaire"+i+" td.detail .d2").innerText = "[marque] "  + background.marques[i]
                } else {
                    document.querySelector("#proprietaire"+i+" td.detail .d2").style = "display:none";
                }
                if (background.influences[i].length) {
                    document.querySelector("#proprietaire"+i+" td.detail .d3").innerText = "[secteur] " + background.influences[i]
                } else {
                    document.querySelector("#proprietaire"+i+" td.detail .d3").style = "display:none";
                }

                document.querySelector("#proprietaire"+i+" td.detail").style = "";
            }

        }
            console && console.groupEnd();

        //document.querySelector("#fortunes span.content").innerText = background.fortunes.join(",");
        //document.querySelector("#brands span.content").innerText = background.marques.join(",");
        //document.querySelector("#influences span.content").innerText = background.influences.join(",");


        //document.querySelector("#interests span.content").innerText = background.interets;
        //document.querySelector("#conflicts span.content").innerText = background.conflits;
        //document.querySelector("#subsidies span.content").innerText = background.subventions;

        var source_wrapper = document.querySelector("#sources");
        var target_sources = document.querySelector("#sources .content");
        target_sources.innerText = "";

        if (background.sources.length == 0) {
            source_wrapper.style.display = "none";
        }
        else {
            source_wrapper.style.display = "block";
            for(var i in background.sources) {
                var obj = background.sources[i];
                createLink(target_sources, obj.url, obj.title);
            }
        }

        // background.sources.forEach(function(obj, i){
        //});


        document.querySelector("#possedex-window").style.display = "block";
        document.querySelector("#verif-insoumis").classList.remove("active");
        document.querySelector("#possedex-window").classList.add('active');
        var site_slug = background.site_actif.replace(/ /,'-');
        document.querySelector("#more-info").href = "http://www.acrimed.org/+-"+site_slug+"-+";
    }
    else {
        document.querySelector("#verif-insoumis").style.display = "block";
        document.querySelector("#possedex-window").classList.remove('active');
        document.querySelector("#verif-insoumis").classList.add("active");
        document.querySelector("#possedex-window").style.display = "none";

    }

    var params = document.querySelector("#params");
    params.addEventListener("click", function(){
        var parameters = document.querySelector("#parameters");
        if(params.classList.contains("active-p")){
            params.classList.remove("active-p");
            parameters.style.display = "none";
            document.querySelector(".active").style.display = "block";
        }
        else {
            params.classList.add("active-p");
            document.querySelector(".active").style.display = "none";
            parameters.style.display = "block";
        }
    });
    browser.storage.local.get('infobulles', function(results){
        classements = [ 'inconnu', 'capital', 'etat', 'independant' ];
        classements.forEach(function(classement){
            var thisCheckbox = document.getElementById('check-alert-' + classement);
            if (thisCheckbox) {
                if(results.infobulles[classement] == true){
                    thisCheckbox.checked = true;
                }
                else {
                    thisCheckbox.checked = false;
                }
            }
        });
    });
	
	//linkInNewTab(document.querySelector(".propos-par a"));
	//linkInNewTab(document.querySelector("#more-info-insoumis"));
	


classements = [ 'inconnu', 'capital', 'etat', 'independant' ];
    classements.forEach(function(classement){
        if (background.colors[classement]) {
            {
                var thisCheckbox = document.getElementById('check-alert-' + classement);
                if (thisCheckbox) {
                    thisCheckbox.style.color = background.colors[classement];
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    main();
    classements = [ 'inconnu', 'capital', 'etat', 'independant' ];
    classements.forEach(function(classement){
            var thisCheckbox = document.getElementById('check-alert-' + classement);
            if (thisCheckbox) {
                thisCheckbox.addEventListener('click', bulleStore);
            }
    });
    document.querySelector('#do-refresh-database').addEventListener('click', refreshDatabase);
});

function getObjectKeys(obj) {
    var keys = [];
    for(var key in obj){
        keys.push(key);
    }
    return keys;
}
