export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <div className="text-sm text-muted-foreground">
          Customize your trading experience
        </div>
      </div>
      
      <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Settings Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            User preferences, notification settings, price alerts, theme customization, and security settings.
          </p>
        </div>
      </div>
    </div>
  )
}
