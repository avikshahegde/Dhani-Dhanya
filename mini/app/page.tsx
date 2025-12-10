"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, TrendingDown, DollarSign, Package, BarChart3, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/lib/context/app-context"

export default function HomePage() {
  const { datasetUploaded, datasetSummary, products } = useAppContext()

  // Calculate real stats from actual data
  const urgentItems = products.filter((p) => p.daysToExpiry <= 2).length
  const itemsWithDiscounts = products.filter((p) => p.discount > 0).length
  const avgDiscount = products.length > 0 ? products.reduce((sum, p) => sum + p.discount, 0) / products.length : 0
  const totalRevenue = products.reduce((sum, p) => sum + (p.originalPrice - p.currentPrice) * p.stock * 0.1, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-green-700 mb-6">Dhani Dhanya</h1>
          <p className="text-2xl text-green-800 max-w-3xl mx-auto leading-relaxed">
            Smart insights for fresh goods - Reduce waste, maximize revenue
          </p>
        </div>

        {!datasetUploaded ? (
          /* No Dataset State */
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto glass-dark rounded-3xl p-12 shadow-2xl">
              <AlertCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-green-900 mb-6">No Dataset Uploaded</h2>
              <p className="text-xl text-green-800 mb-10 leading-relaxed">
                Upload your inventory dataset to start analyzing fresh goods and enable dynamic pricing.
              </p>
              <Link href="/upload">
                <Button size="lg" className="gap-3 bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-6 rounded-xl shadow-lg">
                  <Upload className="h-6 w-6" />
                  Upload Dataset
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards - Real Data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <Card className="glass-dark border-green-300 shadow-xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-medium text-green-900">Items at Risk</CardTitle>
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-red-600">{urgentItems}</div>
                  <p className="text-base text-green-700 mt-2">Expiring ≤2 days</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-green-300 shadow-xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-medium text-green-900">Revenue Impact</CardTitle>
                  <DollarSign className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">${totalRevenue.toFixed(0)}</div>
                  <p className="text-base text-green-700 mt-2">Potential recovery</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-green-300 shadow-xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-medium text-green-900">Items Tracked</CardTitle>
                  <Package className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">{products.length}</div>
                  <p className="text-base text-green-700 mt-2">Total products</p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-green-300 shadow-xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-medium text-green-900">Avg Discount</CardTitle>
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">{avgDiscount.toFixed(1)}%</div>
                  <p className="text-base text-green-700 mt-2">Applied automatically</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Card className="glass-dark hover:shadow-2xl transition-all duration-300 border-green-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                    <Package className="h-7 w-7" />
                    Inventory Dashboard
                  </CardTitle>
                  <CardDescription className="text-lg text-green-700 mt-3">View real-time inventory and dynamic pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl">View Dashboard</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="glass-dark hover:shadow-2xl transition-all duration-300 border-green-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                    <DollarSign className="h-7 w-7" />
                    User Side
                  </CardTitle>
                  <CardDescription className="text-lg text-green-700 mt-3">View customer interface with dynamic pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/pos">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl">
                      Open User Side
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="glass-dark hover:shadow-2xl transition-all duration-300 border-green-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                    <BarChart3 className="h-7 w-7" />
                    Configure Rules
                  </CardTitle>
                  <CardDescription className="text-lg text-green-700 mt-3">Set up dynamic pricing rules and thresholds</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/settings">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl">
                      Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">How Dhani Dhanya Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center glass-dark rounded-2xl p-8 shadow-xl">
              <div className="bg-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-900">Upload Real Data</h3>
              <p className="text-lg text-green-800 leading-relaxed">Upload your actual inventory dataset with product and sales information</p>
            </div>

            <div className="text-center glass-dark rounded-2xl p-8 shadow-xl">
              <div className="bg-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-900">Real-time Analysis</h3>
              <p className="text-lg text-green-800 leading-relaxed">
                AI analyzes your data and automatically adjusts prices based on expiry and demand
              </p>
            </div>

            <div className="text-center glass-dark rounded-2xl p-8 shadow-xl">
              <div className="bg-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-900">Track Results</h3>
              <p className="text-lg text-green-800 leading-relaxed">Monitor waste reduction and revenue recovery in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
