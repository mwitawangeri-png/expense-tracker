interface Expense {
    id: string;
    description: string;
    amount: number;
}

interface ExpenseListProps {
    expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps){
    return(
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.description} - ${expense.amount.toFixed(2)}
                </li>
            ))}
        </ul>
    );
}