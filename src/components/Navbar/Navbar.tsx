"use client"
import Link from 'next/link'
import React from 'react'
import './Navbar.css'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import LocationPopup from '@/popups/location/LocationPopup'



const Navbar = () => {
    const [showLocationPopup, setShowLocationPopup] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<any>(null)
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
    const getuser = async () => {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      
        // Check if it's an admin logout
        const isAdminLogout = event.currentTarget.classList.contains('admin-logout');
      
        // Logout logic
        const logoutEndpoint = isAdminLogout
          ? `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/logout`
          : `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`;
      
        try {
          const response = await fetch(logoutEndpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
      
          const responseData = await response.json();
      
          if (responseData.ok) {
            // Redirect to the appropriate login page
            window.location.href = isAdminLogout
              ? '/adminauth/signin'
              : '/auth/signin';
          }
        } catch (error) {
          console.log(error);
      
          // Redirect to the appropriate login page even if there's an error
          window.location.href = isAdminLogout ? '/adminauth/signin' : '/auth/signin';
        }
      };

    const checkLogin = async () => {
        // let authToken = await getCookie('authToken')
        // let refreshToken = await getCookie('refreshToken')

        // console.log(authToken, refreshToken)
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if(response.ok){
                    setLoggedIn(true)
                }
                else{
                    setLoggedIn(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setLoggedIn(false)
            })
    }

    const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(false);
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'

            });
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);
               
            }
        }
        catch (error) {
            console.error('An error occurred during admin authentication check', error);
            setIsAdminAuthenticated(false);

        }
    }

    React.useEffect(() => {
        checkLogin()
        getuser()
        checkAdminAuthentication();
    }, [])
    return (
        <nav>
            <div className='left'>
                {/* <Image src={logo} alt="logo" width={100} height={100}
                    onClick={() => window.location.href = "/"}
                /> */}
                <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search For a Movie" />
                </div>
              
            </div>
            <div className='right'>
                <p className='dropdown'
                    onClick={() => setShowLocationPopup(true)}
                >
                    {user ? user.city : "Select City"}
                     <RiArrowDropDownFill className="dropicon" /></p>
               {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                     :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>

               }
                <Link href="/profile" className='linkstylenone'>
                    <BiUserCircle className='theme_icon1' />
                </Link>
            </div>
            {
                showLocationPopup &&
                <LocationPopup
                    setShowLocationPopup={setShowLocationPopup}
                />
            }
        </nav>
    )
}

export default Navbar