import { EditUserForm } from "../components";
import { useRouter } from 'next/router';

const editPage = ({user}) => {
    const router = useRouter();

    return (
        <>
            <EditUserForm user={user} />
        </>
    )
}

export default editPage;

export async function getServerSideProps(context) {
    const userId = context.query.data;

    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
    const {data} = await res.json();

    return {
        props: {
            user: data,
        }
    }

}