function searchByTerm(query:string, listA:any[], ListB:any[]):any[]{
    const searchterm = query.search.toString();
    if(!query){
        ListB = listA;
    }
  ListB = listA.filter(
    Object =>
    Object?.keys().toLowerCase().includes(searchterm.toLocaleLowerCase()));
    return ListB;
  }


  export default searchByTerm;


