import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all products
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY days_to_expiry ASC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST - Add or update products
export async function POST(request: Request) {
  try {
    const products = await request.json();
    
    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Expected an array of products' }, { status: 400 });
    }

    const values = products.map(p => [
      p.id,
      p.name,
      p.store,
      p.category,
      p.stock,
      p.daysToExpiry,
      p.originalPrice,
      p.currentPrice,
      p.discount,
      p.salesVelocity,
      p.alerts?.expiry || false,
      p.alerts?.stock || false,
      p.alerts?.salesVelocity || false,
      p.alerts?.other || false
    ]);

    const query = `
      INSERT INTO products (
        id, name, store, category, stock, days_to_expiry, 
        original_price, current_price, discount, sales_velocity,
        alert_expiry, alert_stock, alert_sales_velocity, alert_other
      ) VALUES ?
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        store = VALUES(store),
        category = VALUES(category),
        stock = VALUES(stock),
        days_to_expiry = VALUES(days_to_expiry),
        original_price = VALUES(original_price),
        current_price = VALUES(current_price),
        discount = VALUES(discount),
        sales_velocity = VALUES(sales_velocity),
        alert_expiry = VALUES(alert_expiry),
        alert_stock = VALUES(alert_stock),
        alert_sales_velocity = VALUES(alert_sales_velocity),
        alert_other = VALUES(alert_other)
    `;

    await pool.query(query, [values]);
    
    return NextResponse.json({ 
      success: true, 
      message: `${products.length} products saved to database` 
    });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
