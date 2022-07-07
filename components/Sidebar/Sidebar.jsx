import classes from './Sidebar.module.scss';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className={classes.main}>
            <Link href="/">
                <button>
                    List
                </button>
            </Link>
            <Link href="/add">
                <button>
                    Add
                </button>
            </Link>
        </div>
    )
}

export default Sidebar;