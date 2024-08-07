function parse_time(h:string){
const now1 = new Date().toISOString()
const now = new Date(now1)
const year = now.getFullYear();
const month = now.getMonth(); 
const day = now.getDate()
const hour = Number(h.split(':')[0]);
const minute = Number(h.split(':')[1]);
const second = 0;
const millisecond = 0;
const specificDate = new Date(year, month, day, hour, minute, second, millisecond);
const accu_date = new Date(specificDate.getTime() + 60*60*1000)
return accu_date
}

function restrictTimeSelection(date:string) {
    var two_hour;
    const now = new Date();
    let selected_date = parse_time(date)
    //sil nest pas encore 7h
    if(now < parse_time('07:00')){
        let twoHoursFromNow = new Date(now.getTime() + 0 * 60 * 60 * 1000)
          two_hour = selected_date >= twoHoursFromNow;

    }else{
        let twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000)
          two_hour = selected_date >= twoHoursFromNow;
    }
    return two_hour;
    
  }

export default restrictTimeSelection;