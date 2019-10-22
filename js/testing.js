// ! /!\ al momento non funziona, va in stack overflow /!\
// var myarr = [];

// function recur(ri) {
//   for (let i = ri; i < 5; i++) {
//     // check con gli altri valori 
//     let rand = Math.floor(Math.random() * 10); 
//     console.log(ri);
//     if(i == 0){
//       myarr.push(rand);
//     }else{
//       for (let j = 0; j<myarr.length; j++){
//         if(rand == myarr[j]){
//           return recur(i)
//         }else{
//           myarr.push(rand);
//         }
//       }
//     }
//   }
// }
// recur(0); 
var myarr = [];

function recur() {
  for (let i = 0; i < 5; i++) {
    let rand = Math.floor(Math.random() * 10); 
    
    if(i!=0){
      for(let j = 0; j < myarr.length-1; j++){
        while(rand == myarr[j]){
          rand = Math.floor(Math.random() * 10); 
          console.log(`r: ${rand} j: ${j}`);
        }
      }
      // console.log(true)
    }
    // console.log(`i: ${i} r: ${rand}`);
    myarr.push(rand);
    // myarr[i] = rand;
    // console.log(`i: ${i} value: ${myarr[i]}`); 
  }
}
recur(); 
console.log(myarr); 

