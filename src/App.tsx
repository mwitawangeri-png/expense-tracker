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

  useEffect(() => {
    const channel = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table:'expenses'},
      (payload) => {
        console.log('Realtime event received!', payload);

        const fetchUpdatedData = async () => {
          const {data} = await supabase
          .from('expenses')
          .select('*')
          .order('created_at', {ascending: true});

          if(data) {console.log('new data added'); setExpenses(data)};
        };
        fetchUpdatedData();
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);
    });

    return () => {
      supabase.removeChannel(channel);
    };
      
  },[]);
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

  const handleUpdateExpense = async (id: string, description: string, amount: number) => {
    const {data, error} = await supabase
    .from('expenses')
    .update({ description, amount})
    .eq('id', id)
    .select();

    if(error) {
      console.error('Error updating expenses:', error);
    } else if (data && data.length > 0) {
      // 2. Update local state using .map() to replace only the updated item
      setExpenses(
        expenses.map((expense) => 
          expense.id === id ? data[0] : expense
        )
      );
    } else {
      // 2. Catch the silent RLS failure gracefully
      console.error('Update failed: No data returned. Check RLS policies.');
    }

  };
  return (
    <div>
      <h1>Expense Tracker</h1>
      
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
      {/* We pass the function down as a prop */}
      <ExpenseForm onAddExpense={handleAddExpense} />
      
      {/* We pass the data down as a prop */}
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onUpdate={handleUpdateExpense} />
    </div>
  );
}

export default App;
