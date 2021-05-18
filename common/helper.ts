export const getRandString=(min:number, max:number):string =>{
  return (Math.floor(Math.random() * (max - min + 1) ) + min)+"";
}

// const defaultCaculaterPrice="KM"
// const optionCaculaterPrice={
//   KM:(defaultPrice:number,distant:number)=>{return defaultPrice*distant},
//   KG:(defaultPrice:number,m:number)=>{return defaultPrice*m}
// }
// export const getFunctionCaculaterPrice(option:any,n:string):any=>{
//   return option[n]||defaultCaculaterPrice
// }
// getFunctionCaculaterPrice(optionCaculaterPrice,"KG")