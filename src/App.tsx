import { useState } from 'react';
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';

interface Expense {
  id: string;
  description: string;
  amount: number;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // This is the "endpoint" we provide to the child component
  const handleAddExpense = (description: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount
    };
    
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      
      {/* We pass the function down as a prop */}
      <ExpenseForm onAddExpense={handleAddExpense} />
      
      {/* We pass the data down as a prop */}
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
