interface Expense {
    id: string;
    description: string;
    amount: number;
}

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps){
    return(
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.description} - ${expense.amount.toFixed(2)}
                    <button 
                        onClick={() => onDelete(expense.id)} 
                        style={{ margin: '10px' }}>
                        Delete</button>
                </li>
            ))}
        </ul>
    );
}