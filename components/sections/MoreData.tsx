'use client'

import { Card, CardBody, CardHeader, Divider, User, AvatarIcon } from "@nextui-org/react";
import Info from "./Info";
import { getData } from "@/context/data";
import { useEffect, useState } from "react";

interface IProps {

}
const MoreData = ({ }: IProps) => {
    const [Customers, setCustomers] = useState([])
    const [Transactions, setTransactions] = useState([])
    const data = async () => {
        const res = await getData()
        console.log(res)
        setCustomers(res.customers)
        setTransactions(res.transactions)
    }
    useEffect(() => {
        data()
    }, [])

    return <>
        <div>
            <Info title="Customer Transactions Dashboard Application" description="a web application to display customer and transaction data from an API endpoint" />
            <section className="flex flex-col gap-4 md:flex-row items-center justify-between">
                <Card className="w-full  max-h-[400px]  overflow-y-scroll scrollbar-hide " isPressable>
                    <CardHeader className="bg-[#f0f0f0]">Total users : <span className="font-bold ms-3">{Customers.length}</span></CardHeader>
                    <CardBody className=" items-start">
                        {Customers.map((user: any) =>
                            <User
                                key={user.id}
                                name={user.name}
                                className="mb-3"
                            />
                        )}
                    </CardBody>
                </Card>
                <Card className="w-full  max-h-[400px]  overflow-y-scroll scrollbar-hide " isPressable>
                    <CardHeader className="bg-[#f0f0f0]">Total transactions : <span className="font-bold ms-3">{Transactions.length}</span></CardHeader>
                    <CardBody className=" items-start">
                        {Transactions.map((transaction: any) =>
                            <div key={transaction.id} className="p-2 bg-[#f0f0f0] w-full rounded-xl mb-3">
                                <span>{"A transaction of $" + transaction.amount + ` was made on  ${transaction.date}`}</span>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </section>
        </div>
    </>;
};

export default MoreData;