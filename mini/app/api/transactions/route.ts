import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// GET all transactions
export async function GET() {
  try {
    const [transactions] = await pool.query<RowDataPacket[]>(`
      SELECT 
        t.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', ti.id,
            'product_id', ti.product_id,
            'product_name', ti.product_name,
            'quantity', ti.quantity,
            'unit_price', ti.unit_price,
            'original_price', ti.original_price,
            'discount', ti.discount,
            'subtotal', ti.subtotal
          )
        ) as items
      FROM transactions t
      LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
      GROUP BY t.id
      ORDER BY t.transaction_date DESC
      LIMIT 100
    `);
    
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST - Create new transaction
export async function POST(request: Request) {
  const connection = await pool.getConnection();
  
  try {
    const { cart, subtotal, tax, total } = await request.json();
    
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    await connection.beginTransaction();

    // Insert transaction
    const [transactionResult] = await connection.query<any>(
      'INSERT INTO transactions (subtotal, tax, total, items_count) VALUES (?, ?, ?, ?)',
      [subtotal, tax, total, cart.length]
    );

    const transactionId = transactionResult.insertId;

    // Insert transaction items
    const itemValues = cart.map((item: any) => [
      transactionId,
      item.id,
      item.name,
      item.quantity,
      item.price,
      item.originalPrice,
      item.discount,
      item.price * item.quantity
    ]);

    await connection.query(
      `INSERT INTO transaction_items 
       (transaction_id, product_id, product_name, quantity, unit_price, original_price, discount, subtotal) 
       VALUES ?`,
      [itemValues]
    );

    // Update product stock
    for (const item of cart) {
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.id]
      );
    }

    await connection.commit();
    
    return NextResponse.json({ 
      success: true, 
      transactionId,
      message: 'Transaction saved successfully' 
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving transaction:', error);
    return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
  } finally {
    connection.release();
  }
}
