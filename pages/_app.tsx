import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import { LoaderContainer } from '../components/loader/Loader';
import '../styles/app.css';
// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return <div>
    <Provider store={store}>
      <Component {...pageProps}/>
      <LoaderContainer></LoaderContainer>
    </Provider>
  </div>
}
  
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp