
"use client"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table, TableProps } from 'antd'
import Item from 'antd/es/list/Item';
import { useRouter } from 'next/navigation';
import React, { useEffect, useReducer, useState } from 'react'

interface DataType {
    key: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    contact: number;
    options: string;
    _id: string;
}

const Mainpage = () => {

    const [state, setState] = useState<Array<any>>([]);
    const router = useRouter()


    const fetchdata = async () => {
        const data = await fetch("http://localhost:8080/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const apiData = await data.json();
        setState([...apiData])

    }
    const fetchDataDelete = async (id: any) => {
        const data = await fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        fetchdata()
    }

    useEffect(() => {
        fetchdata()
    }, [])



    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Contact',
            dataIndex: 'mobileno',
            key: 'contact',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (item,items) =>
                <div className='flex gap-2'>
                    <Button type="primary"> <EditOutlined />Edit</Button>
                    <Button onClick={()=>fetchDataDelete(items._id)} type="primary" danger> <DeleteOutlined />
                        Delete
                    </Button>
                </div>
        },
    ]



    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Employees</h2>
                    <div>
                        <Button
                            type="primary"
                            className="rounded-md px-3 py-2 text-sm text-black "
                            onClick={() => router.push("/add")}
                        >
                            <PlusOutlined /> Add
                        </Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={state} />
            </section>


        </>

    )
}

export default Mainpage
