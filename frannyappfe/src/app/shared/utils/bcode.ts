//Generate a unique code for a beauty agent

function generateBeautifCode(date: string, bname: string, ville: string, quarter: string) {
    let all_initials = "";
    //annee
    let splited_date = date.split("-")
    let year = splited_date[0].slice(2, 4);
    const dateCode = year + splited_date[1] + splited_date[2];
    //name
    let splittedName = bname.split(" ");
    let init = splittedName.map((el) => el.charAt(0)).join("");
    let initials = init.slice(0, 2);

    //ville
    let initial_ville = ville[0] + ville.slice(-2);
    let initial_quartier =  quarter[0] + quarter[1] + quarter.slice(-2);

    all_initials = (dateCode + '/' + initials +'/' + initial_ville + '/' + initial_quartier).toLocaleUpperCase();
    return all_initials.toLocaleUpperCase();

}

export default generateBeautifCode;