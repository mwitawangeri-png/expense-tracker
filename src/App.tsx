import { useState } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
}
function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
 const handleAddExpense = () => {
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    description: description,
    amount: parseFloat(amount)
  };

  setExpenses([...expenses, newExpense]);

  setDescription('');
  setAmount('');
  
 };
  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Total expenses: {expenses.length}</p>

      <div>
        <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        />
        <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add</button>
      </div>
      
    </div>
  );
}

export default App;