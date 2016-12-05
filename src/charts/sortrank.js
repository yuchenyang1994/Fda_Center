export default (array)=>{
  return array.sort((a,b)=>b['value']-a['value'])
};