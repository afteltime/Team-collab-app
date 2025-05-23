

export default function CreateTeam() {
    return (
        <div className="p-4">
            <div className='flex flex-col items-center justify-start bg-gray-100 h-screen w-full p-8 '>
                <input className='border-2 rounded-2xl w-60 h-10 mb-4' type="text" placeholder="name" />
                <button className='rounded-2xl h-10 w-22 bg-blue-400'>submit</button>
            </div>
        </div>
    )
}