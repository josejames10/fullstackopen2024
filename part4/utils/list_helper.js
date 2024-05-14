const blog = require("../models/blog");

const dummy = (blogs) => {
    if(blogs.length===0){
        return 1
    }
  }

const totalLikes =(blogs) => {
  let total=0;
  for (let i=0; i< blogs.length; i++  ){
    total += blogs[i].likes
  }    
  return total
}
const favoriteBlog = (blogs) => {
  let favorite=0
  let indice=0
  for (let i=0; i< blogs.length; i++  ){
    if (favorite<=blogs[i].likes){
      favorite=blogs[i].likes
      indice=i
    }
  } 
  return {
    title: blogs[indice].title,
    author: blogs[indice].author,
    likes: blogs[indice].likes }
}
const mostBlogs = (blogs) => {
  let arry=[]
  for (let i=0; i< blogs.length; i++  ){
      let cantidadRepiticiones=0
     for(let j=0; j< blogs.length; j++){   
      if (blogs[i].author===blogs[j].author){
        cantidadRepiticiones += 1
    }
  }
     arry.push(cantidadRepiticiones)
  } 
  const max=arry.indexOf(Math.max(...arry))
  console.log(max)
  return {
    author:blogs[max].author,
    blogs: Math.max(...arry)
  }
}

const mostLikes= (blogs) => {
  let arry =[]
  for(let i=0; i<blogs.length;i++){
    let contador=0
    for(let j=0; j<blogs.length; j++){
      if(blogs[j].author==blogs[i].author){
        contador += blogs[j].likes
      }
    }
         arry.push(contador) 
  }
  const max=arry.indexOf(Math.max(...arry))
      return {
        author:blogs[max].author,
        likes: Math.max(...arry)
        }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }