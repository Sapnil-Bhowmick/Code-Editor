import React from 'react'
import { DataContext } from '../context/codecontext'


const Results = () => {

  const { html, css, js } = React.useContext(DataContext)
  const [src, setSrc] = React.useState('');


  React.useEffect(() => {
    const timeout = setTimeout(() => {
        setSrc(srcCode);
    }, 250);

    return () => clearTimeout(timeout);
}, [html, css, js])


  const srcCode = `
  <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
  </html>

`

// console.log('src_code' , srcCode)


  return (

      <iframe
        className='iframe'
        srcDoc={srcCode}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
      />

  )
}

export default Results
