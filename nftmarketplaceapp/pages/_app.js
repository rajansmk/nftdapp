import '../styles/globals.css'
import "bulma/css/bulma.css"
 
import { Layout } from '../component'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
  
}

export default MyApp
