import './index.css'
console.log('hello plugin 11')
setTimeout(() => {
  import('./sub.js').then(() => {
    console.log('import success')
  })
}, 200)
