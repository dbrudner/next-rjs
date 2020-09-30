import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { RecurlyProvider, Elements, CardElement, useRecurly } from '@recurly/react-recurly';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://js.recurly.com/v4/recurly.js"></script>
        <link href="https://js.recurly.com/v4/recurly.css" rel="stylesheet" type="text/css"/>
      </Head>

      <main className={styles.main}>
        {/* Checking for the window's existence because this can only be run client-side */}
        {typeof window !== "undefined" && <RecurlyProvider publicKey="ewr1-f6Ap7rHIVs482EHLK43CQd">
          <Elements>
            <MyPaymentForm />
          </Elements>
        </RecurlyProvider>}
      </main>
    </div>
  )
}

function MyPaymentForm() {
  const formRef = React.useRef();
  const recurly = useRecurly();

  function handleSubmit (event) {
    event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) {
        // handle error
      } else {
        // save the token.id, and submit it to the Recurly API from your server
      }
    });
  }

  return <form onSubmit={handleSubmit} ref={formRef}>
    <input type="text" data-recurly="first_name" placeholder="First name" />
    <input type="text" data-recurly="last_name" placeholder="Last name" />
    <CardElement />
  </form>
}
