export default function NewsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">News & Analysis</h1>
        <div className="text-sm text-muted-foreground">
          Latest crypto news and market insights
        </div>
      </div>
      
      <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">News & Analysis Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Crypto news feed, market analysis, educational content, and expert insights to keep you informed.
          </p>
        </div>
      </div>
    </div>
  )
}
