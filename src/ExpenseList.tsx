import { useState } from "react";

interface Expense {
    id: string;
    description: string;
    amount: number;
}

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, description: string, amount: number) => void;
}

export function ExpenseList({ expenses, onDelete, onUpdate }: ExpenseListProps){

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const startEditing = (expense: Expense) => {
        setEditingId(expense.id);
        setEditDescription(expense.description);
        setEditAmount(expense.amount.toString());
    };

    const handleSave = (id: string) => {
        onUpdate(id, editDescription, parseFloat(editAmount));
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };
    return (
        <ul>
          {expenses.map((expense) => {
            const isEditing = editingId === expense.id;
    
            return (
              <li key={expense.id} style={{ marginBottom: '8px' }}>
                {isEditing ? (
                  /* --- EDIT MODE UI --- */
                  <>
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                    <button onClick={() => handleSave(expense.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  /* --- READ MODE UI --- */
                  <>
                    {expense.description} - ${expense.amount.toFixed(2)}
                    <button onClick={() => startEditing(expense)}>Edit</button>
                    <button 
                      onClick={() => onDelete(expense.id)} 
                      style={{ padding: '10px', marginLeft: '5px' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      );
}