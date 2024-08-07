
//generate rendez vous code 
function generaterdvCode(name: string, date: string, ville: string, pres: string) {//type: string

    let all_initials = "";
    //annee
    let splited_date = date.split("-")
    let year = splited_date[0].slice(2, 4);
    const dateCode = year + splited_date[1];
    //name
    let splittedName = name.split(" ");
    let init = splittedName.map((el) => el.charAt(0)).join("");
    let initials = init.slice(0, 2);
    //ville
    let initial_ville = (ville[0] + ville.slice(-2)).trim();
    //let initial_quartier =  quarter[0] + quarter[1] + quarter.slice(-2) ;
    //prestation
    let initial_pres = pres.slice(0,2);
     //type
    //let initial_type = type.slice(0,2);
    all_initials = ('RDV' + year + dateCode + initials +  initial_ville +  initial_pres ).toLocaleUpperCase();//+ initial_type
    return all_initials.toLocaleUpperCase();
}

export default generaterdvCode;
