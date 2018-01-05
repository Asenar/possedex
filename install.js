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

function bulleStore(e){
    var infobulles;
    var infobulles_once;
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

function main(){
    var colors = [
        "#A2A9AE", // gris
        "#F5A725", // rouge
        "#D50303", // jaune
        "#129AF0", // bleu
        "#468847", // vert
        "#468847"  // INSOUMIS AUSSI :D
    ];

    browser.storage.local.get('infobulles', function(results){

    try {
        classements = [ 'inconnu', 'capital', 'etat', 'independant' ];
        classements.forEach(function(classement){
            var selector = document.getElementById('check-alert-' + classement);
            if (selector) {
                if(results.infobulles[classement] == true){
                    selector.checked = true;
                }
                else {
                    selector.checked = false;
                }
            }
        });
    } catch(e) {
        console && console.log("error in install.js for infobulles, check-alert"+classement);
        console && console.error(e);
    }

    });
}
document.addEventListener('DOMContentLoaded', function () {
    try {
        classements = [ 'inconnu', 'capital', 'etat', 'independant' ];
        classements.forEach(function(classement){
            var selector = document.getElementById('check-alert-' + classement);
            if (selector) {
                selector.addEventListener('click', bulleStore);
            }
        });
    } catch(e) {
        console && console.info("error in install.js for check-alert-"+classement);
        console && console.error(e);
    }
    main();
});
