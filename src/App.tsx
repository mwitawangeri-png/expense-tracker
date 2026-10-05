import { useState, useEffect } from 'react';
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';
import { supabase } from './supabase';

interface Expense {
  id: string;
  description: string;
  amount: number;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', {ascending: true});
      
      if (error) {
        console.error('Error fetching expenses:', error);
      } else if (data) {
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, []);

  // This is the "endpoint" we provide to the child component
  const handleAddExpense = async (description: string, amount: number) => {

    const {data, error} = await supabase
    .from('expenses')
    .insert([{description, amount}])
    .select();

    if(error){
      console.error('Error saving expense:', error);
    }
    else if(data){
      setExpenses([...expenses, data[0]]);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    const {error} = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);

    if(error){
      console.error('Error deleting expense:', error);
    }
    else{
      setExpenses(expenses.filter((expense) => expense.id !==id))
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
      {/* We pass the function down as a prop */}
      <ExpenseForm onAddExpense={handleAddExpense} />
      
      {/* We pass the data down as a prop */}
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
}

export default App;
