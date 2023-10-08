// const search= document.getElementsByTagName('input')[0];


const getData = async()=>{
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=car`);
    const data = await response.json();
    // console.log(data.query.search);
    return data.query.search ;

}


const display = (data)=>{
    let result = "";
    data.forEach(element => {
        result+= `
        <div class="item col-3 my-4">
                <div class="card" >
                    <div class="card-body">
                      <h4 class="card-title my-3">${element.title}</h4>
                      <h5 class="card-subtitle mb-2 text-muted">${element.snippet}</h5>
                      <a href="#" class="card-link">Card link</a>
                    </div>
                  </div>
            </div>
        ` 
    });
    
    document.querySelector('.result').innerHTML=result;


}

const displayData=async()=>{
    const data= await getData();
    console.log(data);
    display(data);
}
displayData();