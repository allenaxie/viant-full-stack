import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import {useState} from 'react';
import classes from './AddUserForm.module.scss';

const AddUserForm = () => {
const [error, setError] = useState('');
    const router = useRouter();
    const onFinish = async (values) => {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                setError('Add user failed. Try again!')
                throw new Error(res.status);
            }

            router.push('/');
        } catch (err) {
            console.log(err);
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={classes.main}>
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            pattern: new RegExp(/^[a-z0-9]+$/i), //alphanumeric characters only
                            message: 'Only letters and numbers allowed'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not a valid email.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                        {
                            pattern: new RegExp(/^[a-z ']+$/i), 
                            message: 'Only letters, space, and single quotations allowed'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                        {
                            pattern: new RegExp(/^[a-z ']+$/i), 
                            message: 'Only letters, space, and single quotations allowed'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please create a password!',
                        },
                        {
                            pattern: new RegExp(/^[a-z0-9]+$/i), //alphanumeric characters only
                            message: 'Only letters and numbers are allowed'
                        },
                        {
                            max: 32,
                            message: 'Maximum 32 characters allowed'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <p className={classes.errorMessage}>&nbsp;{error}</p>
        </div>

    )
}

export default AddUserForm;