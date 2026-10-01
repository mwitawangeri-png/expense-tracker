import { useState } from "react";

interface ExpenseFormProps {
    onAddExpense: (description: String, amount: number) => void;
}

export function ExpenseForm( {onAddExpense}: ExpenseFormProps) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        onAddExpense(description, parseFloat(amount));
        setDescription('');
        setAmount('');
    }

    return(
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
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
};

