import './index.css'
console.log('hello plugin')
setTimeout(() => {
  import('./sub.js').then(() => {
    console.log('import success')
  })
}, 200)
