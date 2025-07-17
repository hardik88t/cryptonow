export default function TermsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last updated: January 17, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Demo Application Notice</h2>
          <p className="mb-4">
            CryptoNow is a demonstration cryptocurrency trading platform created for educational and portfolio purposes. This application does not facilitate real cryptocurrency trading or financial transactions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Simulated Trading</h2>
          <p className="mb-4">
            All trading functionality within this application is simulated. No real money, cryptocurrency, or financial instruments are involved. Users cannot make actual purchases, sales, or transfers through this platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <p className="mb-4">
            Real-time cryptocurrency data is provided by CoinGecko API for demonstration purposes. Price data is accurate but should not be used for actual trading decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="mb-4">
            This application is provided "as is" for demonstration purposes only. It should not be used as financial advice or for making real investment decisions. Cryptocurrency trading involves significant risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            This is a demonstration project. For questions about this demo, please refer to the project documentation.
          </p>
        </section>
      </div>
    </div>
  )
}
