"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function DatabaseStatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/db-test')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({ success: false, message: 'Connection failed' })
    }
    setLoading(false)
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      const data = await response.json()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading transactions:', error)
    }
  }

  useEffect(() => {
    checkStatus()
    loadProducts()
    loadTransactions()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Database Status</h1>
          <p className="text-gray-600">MySQL Connection and Data Overview</p>
        </div>

        <div className="grid gap-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Checking connection...</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {status?.success ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">{status.message}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-600 font-medium">{status?.message || 'Connection failed'}</span>
                      </>
                    )}
                  </div>
                  <Button onClick={checkStatus} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Products Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Products in Database</CardTitle>
              <CardDescription>Total products stored in MySQL</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{products.length}</div>
                  <div className="text-sm text-gray-500">Total Products</div>
                </div>
                <Button onClick={loadProducts} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload
                </Button>
              </div>
              
              {products.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Recent Products:</div>
                  {products.slice(0, 5).map((product: any) => (
                    <div key={product.id} className="flex justify-between text-sm border-b pb-2">
                      <span>{product.name}</span>
                      <Badge variant="outline">${product.current_price}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transactions Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions in Database</CardTitle>
              <CardDescription>Sales transactions stored in MySQL</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{transactions.length}</div>
                  <div className="text-sm text-gray-500">Total Transactions</div>
                </div>
                <Button onClick={loadTransactions} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload
                </Button>
              </div>
              
              {transactions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Recent Transactions:</div>
                  {transactions.slice(0, 5).map((transaction: any) => (
                    <div key={transaction.id} className="flex justify-between text-sm border-b pb-2">
                      <span>Transaction #{transaction.id}</span>
                      <div className="text-right">
                        <div className="font-medium">${transaction.total}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.transaction_date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
