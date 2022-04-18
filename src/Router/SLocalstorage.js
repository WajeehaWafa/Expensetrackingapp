function SaveIntoLocalStorage (tokenDetail){
    localStorage.setItem('userDetails' , JSON.stringify(tokenDetail) );
    return(tokenDetail)

};
export default SaveIntoLocalStorage;