import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import classes from './EditUserForm.module.scss';

const EditUserForm = ({user}) => {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
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

    const handleDelete = async () => {
        try {
            const deletedUser = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method:'DELETE',
            })

            router.push('/');
        } catch (err) {
            console.log(err);
        }
    }

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
                initialValues={{ 
                    username: `${user.username}`,
                    email: `${user.email}`,
                    firstName: `${user.firstName}`,
                    lastName: `${user.lastName}`,
                }}

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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="danger" onClick={handleDelete}>Delete</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditUserForm;