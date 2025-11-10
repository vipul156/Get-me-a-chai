import { updateProfile } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from 'react-toastify';
const DashboardForm = ({ currUser, setCurrUser }) => {

    const handleSubmit = () => {
        updateProfile(currUser?.username, currUser)
        toast('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const handleChange = (e) => {
        setCurrUser({ ...currUser, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">Name
                    <input onChange={handleChange} name="name" value={currUser?.name || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Email
                    <input readOnly name="email" value={currUser?.email || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Username
                    <input readOnly name="username" value={currUser?.username || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Profile Picture
                    <input onChange={handleChange} name="profilePicture" value={currUser?.profilePicture || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Cover Picture
                    <input onChange={handleChange} name="coverPicture" value={currUser?.coverPicture || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Razorpay ID
                    <input onChange={handleChange} name="razorpayId" value={currUser?.razorpayId || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="flex justify-between items-center">Razorpay Secret
                    <input onChange={handleChange} name="razorpaySecret" value={currUser?.razorpaySecret || ""} className="bg-linear-to-b from-[#06b6d4] via-[#2563eb] to-[#6366f1] w-[60%] p-2 rounded-sm" />
                </div>
                <div className="mt-5 flex justify-center bg-linear-to-l from-[#38bdf8] via-[#fb7185] to-[#84cc16] w-30 p-2 m-auto rounded-xl hover:cursor-pointer"><input onClick={handleSubmit} className='hover:cursor-pointer' type="submit" /></div>
            </div >
        </>
    );
};

export default DashboardForm;
