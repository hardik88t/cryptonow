export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last updated: January 17, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            CryptoNow is a demonstration cryptocurrency trading platform. This privacy policy explains how we handle information in this demo application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
          <p className="mb-4">
            This is a demo application that does not collect, store, or process any personal data. All trading functionality is simulated and no real transactions occur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4">
            We use CoinGecko API to fetch real-time cryptocurrency data. Please refer to{" "}
            <a 
              href="https://www.coingecko.com/en/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-profit hover:underline"
            >
              CoinGecko's Privacy Policy
            </a>{" "}
            for information about their data practices.
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
