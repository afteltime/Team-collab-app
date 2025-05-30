import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='flex justify-between items-center h-20 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 w-full'>
            <Link to='/'>
                <img src='/logo.webp' alt='Logo' className='h-12 hover:scale-105' />
            </Link>

            <nav className='flex gap-6'>
                <Link to='/create' className='text-xl text-white font-medium hover:scale-105'>
                    create-team
                </Link>
                <Link to='/contact' className='text-xl text-white font-medium hover:scale-105'>
                    Contact
                </Link>
                <Link to='/kanban' className='text-xl text-white font-medium hover:scale-105'>
                    Kanban
                </Link>
            </nav>
        </header>
    );
}

export default Header;
