'use client'
interface IProps { }

interface Customer {
    id: string;
    name: string;
}

interface Transaction {
    customer_id: string;
    amount: number;
    date: string;
}

import { getData } from "@/context/data";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Tablee = ({ }: IProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [filter, setFilter] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const data = async () => {
        const res = await getData();
        setCustomers(res.customers);
        setTransactions(res.transactions);
        setFilteredCustomers(res.customers);
        setIsLoading(false);
    };

    useEffect(() => {
        data();
    }, []);

    const customerTotals = transactions.reduce((acc: any, transaction: Transaction) => {
        if (!acc[transaction.customer_id]) {
            acc[transaction.customer_id] = {
                amount: 0,
                dates: [],
            };
        }
        acc[transaction.customer_id].amount += transaction.amount;
        acc[transaction.customer_id].dates.push(transaction.date);
        return acc;
    }, {});

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
        if (value === '') {
            setFilteredCustomers(customers);
        } else {
            setFilteredCustomers(
                customers.filter((customer: Customer) =>
                    customer.name.toLowerCase().includes(value.toLowerCase()) ||
                    (customerTotals[customer.id] && customerTotals[customer.id].amount.toString().includes(value))
                )
            );
        }
    };

    const handleCustomerSelect = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const selectedCustomerTransactions = selectedCustomer
        ? transactions.filter((transaction: Transaction) => transaction.customer_id === selectedCustomer.id)
        : [];

    const chartData = {
        labels: selectedCustomerTransactions.map((transaction: Transaction) => transaction.date),
        datasets: [
            {
                label: 'Total Amount',
                data: selectedCustomerTransactions.map((transaction: Transaction) => transaction.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="mt-9"></div>
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl uppercase my-5">
                Customers Table with Their Transaction Data
            </h2>
            <Input
                
                variant="underlined"
                description="just click on any user to show the graph"
                placeholder="Filter by customer name or amount"
                value={filter}
                onChange={handleFilterChange}
                className="mb-5"
            />
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Table selectionMode="single" aria-label="Example collection table">
                        <TableHeader>
                            <TableColumn key="customer">Customer</TableColumn>
                            <TableColumn key="amount">Total Amount</TableColumn>
                            <TableColumn key="date">Dates</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer: Customer) => {
                                const total = customerTotals[customer.id] || { amount: 0, dates: [] };
                                return (
                                    <TableRow key={customer.id} onClick={() => handleCustomerSelect(customer)}>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{total.amount}</TableCell>
                                        <TableCell>{total.dates.join(', ')}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {selectedCustomer && selectedCustomerTransactions.length > 0 && (
                        <>
                            <h3 className="font-bold text-2xl md:text-4xl lg:text-6xl uppercase my-5">
                                {`Transactions for ${selectedCustomer.name}`}
                            </h3>
                            <Bar data={chartData} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Tablee;
